"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const cursor_1 = require("../lib/cursor");
function default_1() {
    describe('Cursor:', () => {
        it('get()', () => {
            const cursor = new cursor_1.Cursor();
            cursor.exec(true, { a: [{ b: { c: 'd' } }] });
            chai_1.assert.equal(cursor.get('a.0.b.c'), 'd');
        });
        it('apply()', () => {
            const cursor = new cursor_1.Cursor();
            cursor.exec(true, { a: [{ b: { c: 'd' } }] });
            cursor.apply({
                type: 'set',
                path: 'a.0.b',
                value: { d: 'e' },
            });
            chai_1.assert.equal(cursor.get('a.0.b.d'), 'e');
        });
        it('changed', (done) => {
            const cursor = new cursor_1.Cursor();
            cursor.exec(true, { a: [{ b: { c: 'd' } }] });
            cursor.on('changed', ({ data, newValue, bundlePath, bundle, bundleChanges, cursor, }) => {
                chai_1.assert.deepEqual(data, { a: [{ b: { d: 'e' } }] });
                chai_1.assert.deepEqual(newValue, { d: 'e' });
                done();
            });
            cursor.apply({
                type: 'set',
                path: 'a.0.b',
                value: { d: 'e' },
            });
        });
        it('watch', (done) => {
            const cursor = new cursor_1.Cursor();
            cursor.exec(true, { a: [{ b: { c: 'd' } }] });
            cursor.on('changed', ({ bundleChanges }) => {
                let counter = 0;
                cursor_1.watch(bundleChanges, '', ({ newValue }) => {
                    chai_1.assert.deepEqual(newValue, { a: [{ d: { e: 'f' } }] });
                    counter++;
                });
                cursor_1.watch(bundleChanges, 'a', ({ newValue }) => {
                    chai_1.assert.deepEqual(newValue, [{ d: { e: 'f' } }]);
                    counter++;
                });
                cursor_1.watch(bundleChanges, 'a.0', ({ newValue }) => {
                    chai_1.assert.deepEqual(newValue, { d: { e: 'f' } });
                    counter++;
                });
                cursor_1.watch(bundleChanges, ['a', {}, 'b'], ({ newValue }) => {
                    chai_1.assert.deepEqual(newValue, undefined);
                    counter++;
                });
                cursor_1.watch(bundleChanges, 'a.0.b', ({ newValue }) => {
                    chai_1.assert.deepEqual(newValue, undefined);
                    counter++;
                });
                cursor_1.watch(bundleChanges, 'a.0.b.c', ({ newValue }) => {
                    chai_1.assert.deepEqual(newValue, undefined);
                    counter++;
                });
                cursor_1.watch(bundleChanges, 'a.0.d', ({ newValue }) => {
                    chai_1.assert.deepEqual(newValue, { e: 'f' });
                    counter++;
                });
                cursor_1.watch(bundleChanges, 'a.0.d.e', ({ newValue }) => {
                    chai_1.assert.deepEqual(newValue, 'f');
                    counter++;
                });
                cursor_1.watch(bundleChanges, 'x.y.z', ({ newValue }) => {
                    throw new Error('"x.y.z" path is not changed, wrong watch calling');
                });
                cursor_1.watch(bundleChanges, 'a.1', ({ newValue }) => {
                    throw new Error('"a.1" path is not changed, wrong watch calling');
                });
                cursor_1.watch(bundleChanges, 'b', ({ newValue }) => {
                    throw new Error('"b" path is not changed, wrong watch calling');
                });
                chai_1.assert.equal(counter, 8);
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
                }
                else {
                    stored = { queryId, query, data };
                    storageCursors[id] = stored;
                }
            };
            class StoredCursor extends cursor_1.Cursor {
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
            chai_1.assert.deepEqual(cursor.data, { x: 123 });
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=cursor.js.map