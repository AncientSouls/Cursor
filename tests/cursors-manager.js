"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const _ = require("lodash");
const cursor_1 = require("../lib/cursor");
const cursors_manager_1 = require("../lib/cursors-manager");
function default_1() {
    describe('CursorsManager:', () => {
        it('changed', (done) => {
            const cursorsManager = new cursors_manager_1.CursorsManager();
            const cursor = new cursorsManager.Node();
            cursorsManager.add(cursor);
            cursor.exec(true, { a: [{ b: { c: 'd' } }] });
            cursorsManager.list.on('changed', ({ data, oldValue, newValue, bundlePath, bundle, watch, cursor, manager, }) => {
                chai_1.assert.deepEqual(data, { a: [{ b: { d: 'e' } }] });
                chai_1.assert.deepEqual(oldValue, { c: 'd' });
                chai_1.assert.deepEqual(newValue, { d: 'e' });
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
                }
                else {
                    stored = { queryId, query, data };
                    storageCursors[id] = stored;
                }
            };
            const storageManagers = {};
            const saveManager = (manager) => {
                const { id, queryId, query, data } = manager;
                manager.on('added', ({ node }) => storageManagers[manager.id] = node.id);
                manager.on('removed', ({ node }) => delete storageManagers[manager.id]);
            };
            const loadManager = (manager) => {
                const { id, nodes } = manager;
                _.each(nodes, (node) => {
                    storageManagers[manager.id] = node.id;
                });
            };
            class StoredCursor extends cursor_1.Cursor {
                constructor(...args) {
                    super(...args);
                    loadCursor(this);
                    saveCursor(this);
                }
            }
            class StoredCursorsManager extends cursors_manager_1.CursorsManager {
                constructor(...args) {
                    super(...args);
                    this.Node = StoredCursor;
                    loadManager(this);
                    saveManager(this);
                }
            }
            let manager;
            let cursor;
            manager = new StoredCursorsManager('cursors');
            cursor = new manager.Node('a');
            manager.add(cursor);
            cursor.apply({ type: 'set', path: '', value: { x: 123 } });
            manager = undefined;
            cursor = undefined;
            manager = new StoredCursorsManager('cursors');
            cursor = new manager.Node('a');
            manager.add(cursor);
            chai_1.assert.deepEqual(cursor.data, { x: 123 });
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=cursors-manager.js.map