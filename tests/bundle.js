"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const bundle_1 = require("../lib/bundle");
function default_1() {
    describe('Bundle:', () => {
        describe('paths', () => {
            it('path', () => {
                chai_1.assert.equal(bundle_1.get({ a: [{ b: [{ c: 'd' }] }] }, 'a.0.b.0.c'), 'd');
            });
            it('(path[]|find)[]', () => {
                chai_1.assert.equal(bundle_1.get({
                    a: [
                        { x: 5, b: [
                                { y: 3, c: 9 },
                                { y: 2, c: 4 },
                            ] },
                        { x: 7, b: [
                                { y: 6, c: 3 },
                                { y: 8, c: 1 },
                            ] },
                    ],
                }, ['a', { x: 7 }, 'b', ['y', 6], 'c']), 3);
            });
        });
        describe('types', () => {
            it('set', () => {
                const container = { data: { a: [{ b: { c: 123 } }] } };
                bundle_1.bundleParsers.set(container, {
                    type: 'set',
                    path: 'a.0.b.c',
                    value: 234,
                });
                chai_1.assert.deepEqual(container.data, { a: [{ b: { c: 234 } }] });
            });
            it('extend', () => {
                const container = { data: { a: [{ b: { c: 123 } }] } };
                bundle_1.bundleParsers.extend(container, {
                    type: 'extend',
                    path: 'a.0.b',
                    value: { d: 234 },
                });
                chai_1.assert.deepEqual(container.data, { a: [{ b: { c: 123, d: 234 } }] });
            });
            it('unset', () => {
                const container = { data: { a: [{ b: { c: 123 } }] } };
                bundle_1.bundleParsers.unset(container, {
                    type: 'unset',
                    path: 'a.0.b.c',
                });
                chai_1.assert.deepEqual(container.data, { a: [{ b: {} }] });
            });
            it('splice', () => {
                const container = { data: { a: [{ b: { c: 123 } }, { b: { c: 456 } }] } };
                bundle_1.bundleParsers.splice(container, {
                    type: 'splice',
                    path: 'a',
                    start: 1,
                    deleteCount: 0,
                    values: [
                        { b: { c: 234 } },
                        { b: { c: 345 } },
                    ],
                });
                chai_1.assert.deepEqual(container.data, { a: [
                        { b: { c: 123 } },
                        { b: { c: 234 } },
                        { b: { c: 345 } },
                        { b: { c: 456 } },
                    ] });
            });
            it('remove', () => {
                const container = { data: { x: [
                            { y: 1, a: [{ b: { c: 123 } }, { b: { c: 456 } }] },
                            { y: 2, a: [{ b: { c: 123 } }, { b: { c: 456 } }] },
                        ] } };
                bundle_1.bundleParsers.remove(container, {
                    type: 'remove',
                    path: ['x', ['y', 2], 'a'],
                    selector: { b: { c: 123 } },
                });
                chai_1.assert.deepEqual(container.data, { x: [
                        { y: 1, a: [{ b: { c: 123 } }, { b: { c: 456 } }] },
                        { y: 2, a: [{ b: { c: 456 } }] },
                    ] });
            });
            it('push', () => {
                const container = { data: { x: [
                            { y: 1, a: [{ b: { c: 123 } }, { b: { c: 456 } }] },
                            { y: 2, a: [{ b: { c: 123 } }, { b: { c: 456 } }] },
                        ] } };
                bundle_1.bundleParsers.push(container, {
                    type: 'push',
                    path: ['x', ['y', 2], 'a'],
                    value: [{ d: 567 }],
                });
                chai_1.assert.deepEqual(container.data, { x: [
                        { y: 1, a: [{ b: { c: 123 } }, { b: { c: 456 } }] },
                        { y: 2, a: [{ b: { c: 123 } }, { b: { c: 456 } }, { d: 567 }] },
                    ] });
            });
            it('move', () => {
                const container = { data: { x: [0, 1, 2, 3, 4, 5, 6] } };
                bundle_1.bundleParsers.move(container, {
                    type: 'move',
                    path: ['x'],
                    from: 3,
                    to: 5,
                });
                chai_1.assert.deepEqual(container.data, { x: [0, 1, 2, 4, 5, 3, 6] });
            });
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=bundle.js.map