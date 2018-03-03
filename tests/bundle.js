"use strict";
exports.__esModule = true;
require("mocha");
var chai_1 = require("chai");
var bundle_1 = require("../lib/bundle");
function default_1() {
    describe('Bundle:', function () {
        it('set', function () {
            var container = { data: { a: [{ b: { c: 123 } }] } };
            bundle_1.bundleParsers.set(container, {
                type: 'set()',
                path: 'a.0.b.c',
                value: 234
            });
            chai_1.assert.deepEqual(container.data, { a: [{ b: { c: 234 } }] });
        });
        it('unset', function () {
            var container = { data: { a: [{ b: { c: 123 } }] } };
            bundle_1.bundleParsers.unset(container, {
                type: 'unset()',
                path: 'a.0.b.c'
            });
            chai_1.assert.deepEqual(container.data, { a: [{ b: {} }] });
        });
        it('arraySplice', function () {
            var container = { data: { a: [{ b: { c: 123 } }, { b: { c: 456 } }] } };
            bundle_1.bundleParsers.arraySplice(container, {
                type: 'arraySplice()',
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
    });
}
exports["default"] = default_1;
//# sourceMappingURL=bundle.js.map