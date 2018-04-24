"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const _ = require("lodash");
const stackable_cursor_1 = require("../lib/stackable-cursor");
function default_1() {
    describe('StackableCursor:', () => {
        it('wrong order', () => {
            const cursor = new stackable_cursor_1.StackableCursor();
            cursor.exec(undefined, { a: [{ b: { c: 123 } }] });
            cursor.apply({ indexInStack: 1, type: 'set', path: 'a.0.b.c', value: 345 });
            chai_1.assert.equal(_.size(cursor.bundlesStack), 1);
            chai_1.assert.equal(cursor.nextBundleIndex, 0);
            chai_1.assert.equal(cursor.get('a.0.b.c'), 123);
            cursor.apply({ indexInStack: 2, type: 'set', path: 'a.0.b.c', value: 456 });
            chai_1.assert.equal(_.size(cursor.bundlesStack), 2);
            chai_1.assert.equal(cursor.nextBundleIndex, 0);
            chai_1.assert.equal(cursor.get('a.0.b.c'), 123);
            cursor.apply({ indexInStack: 0, type: 'set', path: 'a.0.b.c', value: 234 });
            chai_1.assert.equal(_.size(cursor.bundlesStack), 0);
            chai_1.assert.equal(cursor.nextBundleIndex, 3);
            chai_1.assert.equal(cursor.get('a.0.b.c'), 456);
        });
        it('duplicate index', () => {
            const cursor = new stackable_cursor_1.StackableCursor();
            cursor.exec(undefined, { a: [{ b: { c: 123 } }] });
            cursor.apply({ indexInStack: 1, type: 'set', path: 'a.0.b.c', value: 345 });
            chai_1.assert.equal(_.size(cursor.bundlesStack), 1);
            chai_1.assert.equal(cursor.nextBundleIndex, 0);
            chai_1.assert.equal(cursor.get('a.0.b.c'), 123);
            cursor.apply({ indexInStack: 1, type: 'set', path: 'a.0.b.c', value: 456 });
            chai_1.assert.equal(_.size(cursor.bundlesStack), 1);
            chai_1.assert.equal(cursor.nextBundleIndex, 0);
            chai_1.assert.equal(cursor.get('a.0.b.c'), 123);
            cursor.apply({ indexInStack: 0, type: 'set', path: 'a.0.b.c', value: 234 });
            chai_1.assert.equal(_.size(cursor.bundlesStack), 0);
            chai_1.assert.equal(cursor.nextBundleIndex, 2);
            chai_1.assert.equal(cursor.get('a.0.b.c'), 345);
        });
        it('optional indexation', () => {
            const cursor = new stackable_cursor_1.StackableCursor();
            cursor.exec(undefined, { a: [{ b: { c: 123 } }] });
            cursor.apply({ type: 'set', path: 'a.0.b.c', value: 123 });
            chai_1.assert.equal(_.size(cursor.bundlesStack), 0);
            chai_1.assert.equal(cursor.nextBundleIndex, 0);
            chai_1.assert.equal(cursor.get('a.0.b.c'), 123);
            cursor.apply({ type: 'set', path: 'a.0.b.c', value: 234 });
            chai_1.assert.equal(_.size(cursor.bundlesStack), 0);
            chai_1.assert.equal(cursor.nextBundleIndex, 0);
            chai_1.assert.equal(cursor.get('a.0.b.c'), 234);
            cursor.apply({ type: 'set', path: 'a.0.b.c', value: 345 });
            chai_1.assert.equal(_.size(cursor.bundlesStack), 0);
            chai_1.assert.equal(cursor.nextBundleIndex, 0);
            chai_1.assert.equal(cursor.get('a.0.b.c'), 345);
        });
        it('Reset after exec()', () => {
            const cursor = new stackable_cursor_1.StackableCursor();
            cursor.exec(undefined, { a: [{ b: { c: 123 } }] });
            cursor.apply({ indexInStack: 2, type: 'set', path: 'a.0.b.c', value: 345 });
            chai_1.assert.equal(_.size(cursor.bundlesStack), 1);
            chai_1.assert.equal(cursor.nextBundleIndex, 0);
            chai_1.assert.equal(cursor.get('a.0.b.c'), 123);
            cursor.apply({ indexInStack: 0, type: 'set', path: 'a.0.b.c', value: 456 });
            chai_1.assert.equal(_.size(cursor.bundlesStack), 1);
            chai_1.assert.equal(cursor.nextBundleIndex, 1);
            chai_1.assert.equal(cursor.get('a.0.b.c'), 456);
            cursor.exec(undefined, { a: [{ b: { c: 123 } }] });
            cursor.apply({ indexInStack: 0, type: 'set', path: 'a.0.b.c', value: 234 });
            chai_1.assert.equal(_.size(cursor.bundlesStack), 0);
            chai_1.assert.equal(cursor.nextBundleIndex, 1);
            chai_1.assert.equal(cursor.get('a.0.b.c'), 234);
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=stackable-cursor.js.map