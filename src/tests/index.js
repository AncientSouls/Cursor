require('source-map-support').install();

import { assert } from 'chai';
import {
  Cursor,
  BundlesQueue as BundlesQueueProto,
  CursorsManager,
  ApiManager,
  executeBundle,
  executers,
} from '../lib';
import reactTest from './react';

import lodash from 'lodash';
import mingo from 'mingo';

class BundlesQueue extends BundlesQueueProto {
  _handler(id, task, done) {
    task();
    done();
  }
}

describe('AncientSouls/Cursor', () => {
  describe('Cursor', () => {
    it('get by path', () => {
      var document = { any: [{ custom: { many: 'data' } }] };
      var cursor = new Cursor(true, document);
      assert.equal(cursor.get('any.0.custom.many'), 'data');
    });
    it('get handle path current set changes', (done) => {
      var document = { any: [{ custom: { many: 'a' } }] };
      var cursor = new Cursor(true, document);
      var changesPattern = {
        old: { many: 'a' },
        path: ['any','0','custom'],
        action: 'set',
        arguments: ['any.0.custom', { many: 'b' }],
      };
      cursor.on('any.0.custom.many', (old, current, stop, changes, isClone) => {
        assert.equal(old, 'a');
        assert.equal(current, 'b');
        assert.deepEqual(changes, changesPattern);
        assert.isTrue(isClone);
      });
      cursor.on('any.0.custom', function(old, current, stop, changes, isClone) {
        assert.deepEqual(old, { many: 'a' });
        assert.deepEqual(current, { many: 'b' });
        assert.deepEqual(changes, changesPattern);
        assert.isTrue(isClone);
      });
      cursor.on('any.0', function(old, current, stop, changes, isClone) {
        assert.deepEqual(old, { custom: { many: 'b' } });
        assert.deepEqual(current, { custom: { many: 'b' } });
        assert.deepEqual(changes, changesPattern);
        assert.isFalse(isClone);
        done();
      });
      cursor.set('any.0.custom', { many: 'b' });
    });
    it('set', () => {
      var cursor = new Cursor(true, { a: [{ b: 'x' }, { c: 'y' }, { d: 'z' }] });
      cursor.set('a.0.b', 'z');
      assert.deepEqual(cursor.get('a.0'), { b: 'z' });
      cursor.set('', { x: 'y' });
      assert.deepEqual(cursor.get(), { x: 'y' });
    });
    it('splice', (done) => {
      var cursor = new Cursor(true, { a: [{ b: 'x' }, { c: 'y' }, { d: 'z' }], e: 'f' });
      cursor.on('a.1', function(old, current, stop, changes, isClone) {
        assert.deepEqual(old, { c: 'y' });
        assert.deepEqual(current, { e: 'q' });
        assert.isTrue(isClone);
        setTimeout(done, 100);
      });
      cursor.on('a.0', function(old, current, stop, changes, isClone) {
        assert.deepEqual(old, current);
        assert.isTrue(isClone);
      });
      cursor.on('e', function(old, current, stop, changes, isClone) {
        throw new Error('It should not be');
      });
      cursor.splice('a', 1, 1, { e: 'q' });
      assert.equal(cursor.get('a.1.e'), 'q');
    });
    it('destroy', () => {
      var cursor = new Cursor(true, { a: [{ b: 'x' }, { c: 'y' }, { d: 'z' }], e: 'f' });
      cursor.destroy();
    });
    it('destroy', () => {
      var cursor = new Cursor(true, { a: [{ b: 'x' }, { c: 'y' }, { d: 'z' }], e: 'f' });
      cursor.destroy();
    });
  });
  describe('BundlesQueue', () => {
    it('only nextId bundle can be handled', () => {
      var testString = '';
      var queue = new BundlesQueue();
      queue.addBundle(2, () => testString += 'c');
      queue.addBundle(1, () => testString += 'b');
      queue.addBundle(0, () => testString += 'a');
      queue.addBundle(3, () => testString += 'd');
      assert.equal(testString, 'abcd');
    });
  });
  describe('ApiManager', () => {
    it('api instance must receive queries and send bundles', (done) => {
      var counter = 1;
      var interval;
      var manager = new ApiManager(
        function adapterFindApi(apiQuery) {
          assert.equal(apiQuery, 'a');
          function sendBundles(channelId, bundles) {
            manager.adapterSend(channelId, bundles);
          };
          return new Promise((resolve) => resolve({
            receiveQuery(channelId, query, cursorId, sendBundles) {
              assert.equal(channelId, 2);
              assert.equal(query, null);
              assert.equal(cursorId, 3);
              interval = setInterval(() => {
                sendBundles(channelId, ++counter);
              }, 100);
            },
            cursorDestroyed(channelId, cursorId, sendBundles) {
              assert.equal(channelId, 2);
              assert.equal(cursorId, 3);
              clearInterval(interval);
              done();
            },
          }));
        },
        function adapterSend(channelId, bundles) {
          assert.equal(channelId, 2);
          assert.equal(bundles, counter);
          if (counter > 3) {
            manager.channelDisconnected(channelId);
          }
        },
      );
      manager.receiveQuery(2, 'a', null, 3);
    });
  });
  describe('CursorsManager', () => {
    it('just should works', () => {
      var manager = new CursorsManager(Cursor);
      var cursor = manager.new('any','thing');
      var id0 = cursor.id;
      assert.equal(manager.cursors[cursor.id], cursor);
      cursor.destroy();
      assert.notProperty(manager.cursors, cursor.id);
      manager.renew(cursor, 'other', 'something');
      var id1 = cursor.id;
      assert.notEqual(id0, id1);
      assert.equal(cursor.query, 'other');
      assert.equal(cursor.data, 'something');
    });
  });
  describe('bundles', () => {
    it('set', () => {
      var manager = new CursorsManager(Cursor);
      var cursor = manager.new('any',{'some':'thing'});
      executeBundle({
        cursor: cursor.id, type: 'set',
        path: 'some',
        value: 'other',
      }, cursor, executers);
      assert.deepEqual(cursor.get('some'), 'other');
    });
    it('unset', () => {
      var manager = new CursorsManager(Cursor);
      var cursor = manager.new('any',{'some':'thing'});
      executeBundle({
        cursor: cursor.id, type: 'unset',
        path: 'some',
      }, cursor, executers);
      assert.deepEqual(cursor.get('some'), undefined);
    });
    it('splice', () => {
      var manager = new CursorsManager(Cursor);
      var cursor = manager.new('any',{'some':['things','and','others']});
      executeBundle({
        cursor: cursor.id, type: 'splice',
        path: 'some',
        start: 2, deleteCount: 0, items: ['some'],
      }, cursor, executers);
      assert.deepEqual(cursor.get('some'), ['things','and','some','others']);
    });
  });
  describe('concepts', () => {
    it('fake primitive server-client with one api provider', () => {
      var server = (() => {
        var cursor = new Cursor(undefined, { a: { b: [{ c: 'd' }, { e: 'f' }] } });
        var clientCursors = {};
        
        cursor.on(null, (old, current, stop) => {
          var bundles = {};
          for (var c in clientCursors) {
            let currentPerCursor = lodash.get(current, clientCursors[c].query);
            if (!lodash.isEqual(clientCursors[c].old, currentPerCursor)) {
              clientCursors[c].old = currentPerCursor;
              bundles[c] = {
                id: clientCursors[c].bundlesCounter, 
                type: 'set', cursor: c,
                path: '', value: currentPerCursor,
              };
              clientCursors[c].bundlesCounter++;
            }
          }
          client.changes(bundles);
        });
        
        var server = {
          api: {
            cursor,
            clientCursors,
          },
          request: (clientCursorId, query) => {
            var result = lodash.cloneDeep(cursor.get(query));
            if (!clientCursors[clientCursorId]) {
              clientCursors[clientCursorId] = {
                bundlesCounter: 0,
                query: query,
                old: result,
              };
            }
            return lodash.cloneDeep(result);
          },
        };
        
        return server;
      })();
      
      var client = (() => {
        class ClientBundlesQueue extends BundlesQueueProto {
          constructor(cursor) {
            super();
            this.cursor = cursor;
          }
          _handler(id, task, done) {
            executeBundle(task, this.cursor, executers);
            done();
          }
        }
        
        var manager = new CursorsManager(class extends Cursor {
          constructor() {
            super(...arguments);
            this.bundlesQueue = new ClientBundlesQueue(this);
          }
        });
        
        return {
          api: {
            manager,
            needData: (query) => {
              var cursor = manager.new(query);
              var data = server.request(cursor.id, query);
              cursor.set(null, data);
              return cursor;
            },
          },
          changes: (bundles) => {
            for (var b in bundles) {
              if (manager.cursors[bundles[b].cursor]) {
                manager.cursors[bundles[b].cursor].bundlesQueue.addBundle(bundles[b].id, bundles[b]);
              }
            }
          }
        };
      })();
      
      var cursor1 = client.api.needData('a');
      var cursor2 = client.api.needData('a.b[0]');
      
      assert.deepEqual(cursor1.get(), server.api.cursor.get('a'));
      assert.deepEqual(cursor2.get('c'), server.api.cursor.get('a.b[0].c'));
      
      server.api.cursor.set('a.b[0].c', 'j');
      
      assert.deepEqual(cursor1.get(), server.api.cursor.get('a'));
      assert.deepEqual(cursor2.get('c'), server.api.cursor.get('a.b[0].c'));
      
      server.api.cursor.splice('a.b', 0, 1, 'abrvalk');
      
      assert.deepEqual(cursor1.get(), server.api.cursor.get('a'));
      assert.deepEqual(cursor2.get(), server.api.cursor.get('a.b[0]'));
    });
    reactTest();
  });
});