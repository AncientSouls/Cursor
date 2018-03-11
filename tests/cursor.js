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
            cursor.on('changed', ({ data, oldValue, newValue, bundlePath, bundle, watch, cursor, }) => {
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
        it('watch', (done) => {
            const cursor = new cursor_1.Cursor();
            cursor.exec(true, { a: [{ b: { c: 'd' } }] });
            cursor.on('changed', ({ watch }) => {
                let counter = 0;
                watch('', ({ isClone, oldValue, newValue }) => {
                    chai_1.assert.isFalse(isClone);
                    chai_1.assert.deepEqual(oldValue, { a: [{ d: { e: 'f' } }] });
                    chai_1.assert.deepEqual(newValue, { a: [{ d: { e: 'f' } }] });
                    counter++;
                });
                watch('a', ({ isClone, oldValue, newValue }) => {
                    chai_1.assert.isFalse(isClone);
                    chai_1.assert.deepEqual(oldValue, [{ d: { e: 'f' } }]);
                    chai_1.assert.deepEqual(newValue, [{ d: { e: 'f' } }]);
                    counter++;
                });
                watch('a.0', ({ isClone, oldValue, newValue }) => {
                    chai_1.assert.isTrue(isClone);
                    chai_1.assert.deepEqual(oldValue, { b: { c: 'd' } });
                    chai_1.assert.deepEqual(newValue, { d: { e: 'f' } });
                    counter++;
                });
                watch(['a', {}, 'b'], ({ isClone, oldValue, newValue }) => {
                    chai_1.assert.isTrue(isClone);
                    chai_1.assert.deepEqual(oldValue, { c: 'd' });
                    chai_1.assert.deepEqual(newValue, undefined);
                    counter++;
                });
                watch('a.0.b', ({ isClone, oldValue, newValue }) => {
                    chai_1.assert.isTrue(isClone);
                    chai_1.assert.deepEqual(oldValue, { c: 'd' });
                    chai_1.assert.deepEqual(newValue, undefined);
                    counter++;
                });
                watch('a.0.b.c', ({ isClone, oldValue, newValue }) => {
                    chai_1.assert.isTrue(isClone);
                    chai_1.assert.deepEqual(oldValue, 'd');
                    chai_1.assert.deepEqual(newValue, undefined);
                    counter++;
                });
                watch('a.0.d', ({ isClone, oldValue, newValue }) => {
                    chai_1.assert.isTrue(isClone);
                    chai_1.assert.deepEqual(oldValue, undefined);
                    chai_1.assert.deepEqual(newValue, { e: 'f' });
                    counter++;
                });
                watch('a.0.d.e', ({ isClone, oldValue, newValue }) => {
                    chai_1.assert.isTrue(isClone);
                    chai_1.assert.deepEqual(oldValue, undefined);
                    chai_1.assert.deepEqual(newValue, 'f');
                    counter++;
                });
                watch('x.y.z', ({ isClone, oldValue, newValue }) => {
                    throw new Error('"x.y.z" path is not changed, wrong watch calling');
                });
                watch('a.1', ({ isClone, oldValue, newValue }) => {
                    throw new Error('"a.1" path is not changed, wrong watch calling');
                });
                watch('b', ({ isClone, oldValue, newValue }) => {
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
    });
}
exports.default = default_1;
//# sourceMappingURL=cursor.js.map