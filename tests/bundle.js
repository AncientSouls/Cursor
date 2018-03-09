"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var bundle_1 = require("../lib/bundle");
function default_1() {
    describe('Bundle:', function () {
        it('set', function () {
            var container = { data: { a: [{ b: { c: 123 } }] } };
            bundle_1.bundleParsers.set(container, {
                type: 'set',
                path: 'a.0.b.c',
                value: 234
            });
            chai_1.assert.deepEqual(container.data, { a: [{ b: { c: 234 } }] });
        });
        it('extend', function () {
            var container = { data: { a: [{ b: { c: 123 } }] } };
            bundle_1.bundleParsers.extend(container, {
                type: 'extend',
                path: 'a.0.b',
                extend: { d: 234 }
            });
            chai_1.assert.deepEqual(container.data, { a: [{ b: { c: 123, d: 234 } }] });
        });
        it('unset', function () {
            var container = { data: { a: [{ b: { c: 123 } }] } };
            bundle_1.bundleParsers.unset(container, {
                type: 'unset',
                path: 'a.0.b.c'
            });
            chai_1.assert.deepEqual(container.data, { a: [{ b: {} }] });
        });
        it('arraySplice', function () {
            var container = { data: { a: [{ b: { c: 123 } }, { b: { c: 456 } }] } };
            bundle_1.bundleParsers.arraySplice(container, {
                type: 'arraySplice',
                path: 'a',
                start: 1,
                deleteCount: 0,
                values: [
                    { b: { c: 234 } },
                    { b: { c: 345 } },
                ]
            });
            chai_1.assert.deepEqual(container.data, { a: [
                    { b: { c: 123 } },
                    { b: { c: 234 } },
                    { b: { c: 345 } },
                    { b: { c: 456 } },
                ] });
        });
        it('arrayRemove', function () {
            var container = { data: { a: [{ b: { c: 123 } }, { b: { c: 456 } }] } };
            bundle_1.bundleParsers.arrayRemove(container, {
                type: 'arrayRemove',
                path: 'a',
                selector: { b: { c: 123 } }
            });
            chai_1.assert.deepEqual(container.data, { a: [
                    { b: { c: 456 } },
                ] });
        });
        it('arrayFilterAndExtend', function () {
            var container = { data: { a: [{ b: { c: 123 } }, { b: { c: 456 } }] } };
            bundle_1.bundleParsers.arrayFilterAndExtend(container, {
                type: 'arrayFilterAndExtend',
                path: 'a',
                selector: { b: {} },
                extend: { d: 234 }
            });
            chai_1.assert.deepEqual(container.data, { a: [
                    { b: { c: 123 }, d: 234 },
                    { b: { c: 456 }, d: 234 },
                ] });
        });
        it('arrayFindAndExtend', function () {
            var container = { data: { a: [{ b: { c: 123 } }, { b: { c: 456 } }] } };
            bundle_1.bundleParsers.arrayFindAndExtend(container, {
                type: 'arrayFindAndExtend',
                path: 'a',
                selector: { b: {} },
                extend: { d: 234 }
            });
            chai_1.assert.deepEqual(container.data, { a: [
                    { b: { c: 123 }, d: 234 },
                    { b: { c: 456 } },
                ] });
        });
    });
}
exports["default"] = default_1;
//# sourceMappingURL=bundle.js.map