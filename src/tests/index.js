require('source-map-support').install();

import { assert } from 'chai';
import {
  Cursor,
  BundleQueuesManager,
  generateAdapterForBundleQueuesManager,
  CursorsManager,
  ApiManager,
} from '../lib';
import reactTest from './react';

import lodash from 'lodash';
import mingo from 'mingo';

/*
```js
var bqm = new ExtendedBundleQueuesManager({
  getCursor(cursorId) {}, // If not founded, 
  // Adapters for custom bundles storage.
  addBundle(cursorId, bundleId, bundle) {},
  removeBundle(cursorId, bundleId, bundle) {},
  // Adapters for custom nextBundleId storage.
  getQueueState(cursorId) {}, // { cursorId, handling: Boolean, nextBundleId: Number  }
  setQueueState(cursorId, handling, nextBundleId) {},
});

// Add bundle to personal cursor queue.
// If bundleId equal to last cursor nextBundleId, then execute bundle.
bqm.useBundle(cursorId, bundleId, bundle);
```

class BundlesQueue extends BundlesQueueProto {
  _handler(id, task, done) {
    task();
    done();
  }
}
*/

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
  describe('BundleQueuesManager', () => {
    it('set', (done) => {
      var cm = new CursorsManager(Cursor);
      var bqm = new BundleQueuesManager(...generateAdapterForBundleQueuesManager(cm).adapters);
      var c = cm.new('any',{'some':'thing'});
      
      bqm.useBundle({
        id: 5, cursor: c.id, type: 'set',
        path: 'some', value: 'nothing',
      }, () => {
        bqm.useBundle({
          id: 1, cursor: c.id, type: 'set',
          path: 'some', value: 'result',
        }, () => {
          bqm.useBundle({
            id: 0, cursor: c.id, type: 'set',
            path: 'some', value: 'other',
          }, () => {
            assert.deepEqual(c.get('some'), 'result');
            done();
          });
        });
      });
    });
    it('unset', (done) => {
      var cm = new CursorsManager(Cursor);
      var bqm = new BundleQueuesManager(...generateAdapterForBundleQueuesManager(cm).adapters);
      var c = cm.new('any',{'some':'thing'});
      
      bqm.useBundle({
        id: 5, cursor: c.id, type: 'set',
        path: 'some', value: 'nothing',
      }, () => {
        bqm.useBundle({
          id: 1, cursor: c.id, type: 'unset',
          path: 'some',
        }, () => {
          bqm.useBundle({
            id: 0, cursor: c.id, type: 'set',
            path: 'some', value: 'other',
          }, () => {
            assert.deepEqual(c.get('some'), undefined);
            done();
          });
        });
      });
    });
    it('splice', (done) => {
      var cm = new CursorsManager(Cursor);
      var bqm = new BundleQueuesManager(...generateAdapterForBundleQueuesManager(cm).adapters);
      var c = cm.new('any',{'some':['things','and','others']});
      
      bqm.useBundle({
        id: 1, cursor: c.id, type: 'splice',
        path: 'some',
        start: 3, deleteCount: 1, items: ['nothing'],
      }, () => {
        bqm.useBundle({
          id: 0, cursor: c.id, type: 'splice',
          path: 'some',
          start: 2, deleteCount: 0, items: ['some'],
        }, () => {
          assert.deepEqual(c.get('some'), ['things','and','some','nothing']);
          done();
        });
      });
    });
  });
  describe('ApiManager', () => {
    it('api instance must receive queries and send bundles', (done) => {
      var counter = 1;
      var interval;
      var disconnected = false;
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
              assert.equal(disconnected, true);
              done();
            },
            channelDisconnected(channelId, sendBundles) {
              assert.equal(disconnected, false)
              disconnected = true;
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
  describe('concepts', () => {
    it('fake primitive server-channel with one api provider', () => {
      var server = (() => {
        var cursor = new Cursor(undefined, { a: { b: [{ c: 'd' }, { e: 'f' }] } });
        var channelCursors = {};
        
        cursor.on(null, (old, current, stop) => {
          var bundles = {};
          for (var c in channelCursors) {
            let currentPerCursor = lodash.get(current, channelCursors[c].query);
            if (!lodash.isEqual(channelCursors[c].old, currentPerCursor)) {
              channelCursors[c].old = currentPerCursor;
              bundles[c] = {
                id: channelCursors[c].bundlesCounter, 
                type: 'set', cursor: c,
                path: '', value: currentPerCursor,
              };
              channelCursors[c].bundlesCounter++;
            }
          }
          channel.changes(bundles);
        });
        
        var server = {
          api: {
            cursor,
            channelCursors,
          },
          request: (channelCursorId, query) => {
            var result = lodash.cloneDeep(cursor.get(query));
            if (!channelCursors[channelCursorId]) {
              channelCursors[channelCursorId] = {
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
      
      var channel = (() => {
        var cm = new CursorsManager(Cursor);
        var bqm = new BundleQueuesManager(...generateAdapterForBundleQueuesManager(cm).adapters);
        
        return {
          api: {
            cm,
            needData: (query) => {
              var cursor = cm.new(query);
              var data = server.request(cursor.id, query);
              cursor.set(null, data);
              return cursor;
            },
          },
          changes: (bundles) => {
            for (var b in bundles) {
              if (cm.cursors[bundles[b].cursor]) {
                bqm.useBundle(bundles[b]);
              }
            }
          }
        };
      })();
      
      var cursor1 = channel.api.needData('a');
      var cursor2 = channel.api.needData('a.b[0]');
      
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