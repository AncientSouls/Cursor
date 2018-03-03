"use strict";
exports.__esModule = true;
require("mocha");
var chai_1 = require("chai");
var cursor_1 = require("../lib/cursor");
function default_1() {
    describe('Cursor:', function () {
        it('get()', function () {
            var cursor = new cursor_1.Cursor();
            cursor.exec(true, { a: [{ b: { c: 'd' } }] });
            chai_1.assert.equal(cursor.get('a.0.b.c'), 'd');
        });
        it('apply()', function () {
            var cursor = new cursor_1.Cursor();
            cursor.exec(true, { a: [{ b: { c: 'd' } }] });
            cursor.apply({
                type: 'set',
                path: 'a.0.b',
                value: { d: 'e' }
            });
            chai_1.assert.equal(cursor.get('a.0.b.d'), 'e');
        });
        it('changed', function (done) {
            var cursor = new cursor_1.Cursor();
            cursor.exec(true, { a: [{ b: { c: 'd' } }] });
            cursor.on('changed', function (_a) {
                var data = _a.data, oldValue = _a.oldValue, newValue = _a.newValue, bundlePath = _a.bundlePath, bundle = _a.bundle, watch = _a.watch, cursor = _a.cursor;
                chai_1.assert.deepEqual(data, { a: [{ b: { d: 'e' } }] });
                chai_1.assert.deepEqual(oldValue, { c: 'd' });
                chai_1.assert.deepEqual(newValue, { d: 'e' });
                done();
            });
            cursor.apply({
                type: 'set',
                path: 'a.0.b',
                value: { d: 'e' }
            });
        });
        it('watch', function (done) {
            var cursor = new cursor_1.Cursor();
            cursor.exec(true, { a: [{ b: { c: 'd' } }] });
            cursor.on('changed', function (_a) {
                var watch = _a.watch;
                var counter = 0;
                watch('', function (_a) {
                    var isClone = _a.isClone, oldValue = _a.oldValue, newValue = _a.newValue;
                    chai_1.assert.isFalse(isClone);
                    chai_1.assert.deepEqual(oldValue, { a: [{ d: { e: 'f' } }] });
                    chai_1.assert.deepEqual(newValue, { a: [{ d: { e: 'f' } }] });
                    counter++;
                });
                watch('a', function (_a) {
                    var isClone = _a.isClone, oldValue = _a.oldValue, newValue = _a.newValue;
                    chai_1.assert.isFalse(isClone);
                    chai_1.assert.deepEqual(oldValue, [{ d: { e: 'f' } }]);
                    chai_1.assert.deepEqual(newValue, [{ d: { e: 'f' } }]);
                    counter++;
                });
                watch('a.0', function (_a) {
                    var isClone = _a.isClone, oldValue = _a.oldValue, newValue = _a.newValue;
                    chai_1.assert.isTrue(isClone);
                    chai_1.assert.deepEqual(oldValue, { b: { c: 'd' } });
                    chai_1.assert.deepEqual(newValue, { d: { e: 'f' } });
                    counter++;
                });
                watch('a.0.b', function (_a) {
                    var isClone = _a.isClone, oldValue = _a.oldValue, newValue = _a.newValue;
                    chai_1.assert.isTrue(isClone);
                    chai_1.assert.deepEqual(oldValue, { c: 'd' });
                    chai_1.assert.deepEqual(newValue, undefined);
                    counter++;
                });
                watch('a.0.b.c', function (_a) {
                    var isClone = _a.isClone, oldValue = _a.oldValue, newValue = _a.newValue;
                    chai_1.assert.isTrue(isClone);
                    chai_1.assert.deepEqual(oldValue, 'd');
                    chai_1.assert.deepEqual(newValue, undefined);
                    counter++;
                });
                watch('a.0.d', function (_a) {
                    var isClone = _a.isClone, oldValue = _a.oldValue, newValue = _a.newValue;
                    chai_1.assert.isTrue(isClone);
                    chai_1.assert.deepEqual(oldValue, undefined);
                    chai_1.assert.deepEqual(newValue, { e: 'f' });
                    counter++;
                });
                watch('a.0.d.e', function (_a) {
                    var isClone = _a.isClone, oldValue = _a.oldValue, newValue = _a.newValue;
                    chai_1.assert.isTrue(isClone);
                    chai_1.assert.deepEqual(oldValue, undefined);
                    chai_1.assert.deepEqual(newValue, 'f');
                    counter++;
                });
                watch('x.y.z', function (_a) {
                    var isClone = _a.isClone, oldValue = _a.oldValue, newValue = _a.newValue;
                    throw new Error('"x.y.z" path is not changed, wrong watch calling');
                });
                watch('a.1', function (_a) {
                    var isClone = _a.isClone, oldValue = _a.oldValue, newValue = _a.newValue;
                    throw new Error('"a.1" path is not changed, wrong watch calling');
                });
                watch('b', function (_a) {
                    var isClone = _a.isClone, oldValue = _a.oldValue, newValue = _a.newValue;
                    throw new Error('"b" path is not changed, wrong watch calling');
                });
                chai_1.assert.equal(counter, 7);
                done();
            });
            cursor.apply({
                type: 'set',
                path: 'a.0',
                value: { d: { e: 'f' } }
            });
        });
    });
}
exports["default"] = default_1;
//# sourceMappingURL=cursor.js.map