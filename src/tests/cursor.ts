import { assert } from 'chai';
import * as _ from 'lodash';

import {
  Cursor,
  watch,
} from '../lib/cursor';

export default function () {
  describe('Cursor:', () => {
    it('get()', () => {
      const cursor = new Cursor();
      cursor.exec(true, { a: [{ b: { c: 'd' } }] });
      assert.equal(cursor.get('a.0.b.c'), 'd');
    });
    it('apply()', () => {
      const cursor = new Cursor();
      cursor.exec(true, { a: [{ b: { c: 'd' } }] });
      cursor.apply({
        type: 'set',
        path: 'a.0.b',
        value: { d: 'e' },
      });
      assert.equal(cursor.get('a.0.b.d'), 'e');
    });
    it('changed', (done) => {
      const cursor = new Cursor();
      cursor.exec(true, { a: [{ b: { c: 'd' } }] });
      cursor.on('changed', ({
        data, newValue, bundlePath, bundle, bundleChanges, cursor,
      }) => {
        assert.deepEqual(data, { a: [{ b: { d: 'e' } }] });
        assert.deepEqual(newValue, { d: 'e' });
        done();
      });
      cursor.apply({
        type: 'set',
        path: 'a.0.b',
        value: { d: 'e' },
      });
    });
    it('watch', (done) => {
      const cursor = new Cursor();
      cursor.exec(true, { a: [{ b: { c: 'd' } }] });
      cursor.on('changed', ({ bundleChanges }) => {
        let counter = 0;
        watch(bundleChanges, '', ({ newValue }) => {
          assert.deepEqual(newValue, { a: [{ d: { e: 'f' } }] });
          counter++;
        });
        watch(bundleChanges, 'a', ({ newValue }) => {
          assert.deepEqual(newValue, [{ d: { e: 'f' } }]);
          counter++;
        });
        watch(bundleChanges, 'a.0', ({ newValue }) => {
          assert.deepEqual(newValue, { d: { e: 'f' } });
          counter++;
        });
        watch(bundleChanges, ['a', {}, 'b'], ({ newValue }) => {
          assert.deepEqual(newValue, undefined);
          counter++;
        });
        watch(bundleChanges, 'a.0.b', ({ newValue }) => {
          assert.deepEqual(newValue, undefined);
          counter++;
        });
        watch(bundleChanges, 'a.0.b.c', ({ newValue }) => {
          assert.deepEqual(newValue, undefined);
          counter++;
        });
        watch(bundleChanges, 'a.0.d', ({ newValue }) => {
          assert.deepEqual(newValue, { e: 'f' });
          counter++;
        });
        watch(bundleChanges, 'a.0.d.e', ({ newValue }) => {
          assert.deepEqual(newValue, 'f');
          counter++;
        });
        watch(bundleChanges, 'x.y.z', ({ newValue }) => {
          throw new Error('"x.y.z" path is not changed, wrong watch calling');
        });
        watch(bundleChanges, 'a.1', ({ newValue }) => {
          throw new Error('"a.1" path is not changed, wrong watch calling');
        });
        watch(bundleChanges, 'b', ({ newValue }) => {
          throw new Error('"b" path is not changed, wrong watch calling');
        });
        assert.equal(counter, 8);
        done();
      });
      cursor.apply({
        type: 'set',
        path: 'a.0',
        value: { d: { e: 'f' } },
      });
    });
    it('storaged', () => {
      const storageCursors = {};
      const saveCursor = (cursor) => {
        const { id, queryId, query, data } = cursor;
        const stored = storageCursors[id];
        cursor.on('changed', ({ cursor }) => stored.data = cursor.data);
        cursor.on('exec', ({ cursor: { queryId, query } }) => {
          stored.queryId = queryId;
          stored.query = query;
        });
        cursor.on('destroyed', ({ node }) => delete storageCursors[id]);
      };
      const loadCursor = (cursor) => {
        const { id, queryId, query, data } = cursor;
        let stored;
        if (storageCursors[id]) {
          stored = storageCursors[id];
          cursor.queryId = stored.queryId;
          cursor.query = stored.query;
          cursor.data = stored.data;
        } else {
          stored = { queryId, query, data };
          storageCursors[id] = stored;
        }
      };

      class StoredCursor extends Cursor {
        constructor(...args) {
          super(...args);
          loadCursor(this);
          saveCursor(this);
        }
      }

      let cursor;

      cursor = new StoredCursor('a');
      cursor.apply({ type: 'set', path: '', value: { x: 123 } });

      cursor = undefined;
      
      cursor = new StoredCursor('a');
      assert.deepEqual(cursor.data, { x: 123 });
    });
  });
}
