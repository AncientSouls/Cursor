import { assert } from 'chai';
import * as _ from 'lodash';

import {
  Cursor,
} from '../lib/cursor';

import {
  CursorsManager,
} from '../lib/cursors-manager';

export default function () {
  describe('CursorsManager:', () => {
    it('changed', (done) => {
      const cursorsManager = new CursorsManager();
      const cursor = cursorsManager.create();
      cursor.exec(true, { a: [{ b: { c: 'd' } }] });
      cursorsManager.on('changed', ({
        data, oldValue, newValue, bundlePath, bundle, watch, cursor, manager,
      }) => {
        assert.deepEqual(data, { a: [{ b: { d: 'e' } }] });
        assert.deepEqual(oldValue, { c: 'd' });
        assert.deepEqual(newValue, { d: 'e' });
        done();
      });
      cursor.apply({
        type: 'set',
        path: 'a.0.b',
        value: { d: 'e' },
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
      const storageManagers = {};
      const saveManager = (manager) => {
        const { id, queryId, query, data } = manager;
        manager.on('add', ({ node }) => storageManagers[manager.id] = node.id);
        manager.on('removed', ({ node }) => delete storageManagers[manager.id]);
      };
      const loadManager = (manager) => {
        const { id, nodes } = manager;
        _.each(nodes, (node) => {
          storageManagers[manager.id] = node.id;
        });
      };

      class StoredCursor extends Cursor {
        constructor(...args) {
          super(...args);
          loadCursor(this);
          saveCursor(this);
        }
      }

      class StoredCursorsManager extends CursorsManager {
        Node = StoredCursor;
        constructor(...args) {
          super(...args);
          loadManager(this);
          saveManager(this);
        }
      }

      let manager;
      let cursor;

      manager = new StoredCursorsManager('cursors');
      cursor = manager.create('a');
      cursor.apply({ type: 'set', path: '', value: { x: 123 } });
      
      manager = undefined;
      cursor = undefined;

      manager = new StoredCursorsManager('cursors');
      cursor = manager.create('a');
      assert.deepEqual(cursor.data, { x: 123 });
    });
  });
}
