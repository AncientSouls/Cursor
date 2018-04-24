"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const cursor_1 = require("../lib/cursor");
function default_1() {
    describe('Cursor-doc:', () => {
        it('apply()', () => {
            const cursor = new cursor_1.Cursor();
            cursor.exec(true, { a: [{ b: { c: 'd' } }] });
            cursor.apply({
                type: 'set',
                path: 'a.0',
                value: { d: { e: 'f' } },
            });
            chai_1.assert.deepEqual(cursor.data, { a: [{ d: { e: 'f' } }] });
        });
        it('get()', () => {
            const cursor = new cursor_1.Cursor();
            cursor.exec(true, { a: [{ x: 2, b: 123 }] });
            chai_1.assert.equal(cursor.get('a.0[b]'), 123);
            chai_1.assert.equal(cursor.get(['a', 0, 'b']), 123);
            chai_1.assert.equal(cursor.get(['a', { x: 2 }, 'b']), 123);
        });
        it('watch()', () => {
            const cursor = new cursor_1.Cursor();
            let watchStatus = false;
            cursor.exec(true, { a: [{ b: { c: 'd' } }, { e: { f: 'g' } }] });
            cursor.on('changed', ({ bundleChanges }) => {
                cursor_1.watch(bundleChanges, 'a.1', ({ newValue }) => {
                    watchStatus = true;
                });
            });
            chai_1.assert.isFalse(watchStatus);
            cursor.apply({
                type: 'set',
                path: 'a.0',
                value: { d: 1 },
            });
            chai_1.assert.isFalse(watchStatus);
            cursor.apply({
                type: 'set',
                path: 'a.1',
                value: { d: 2 },
            });
            chai_1.assert.isTrue(watchStatus);
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=cursor-doc.js.map