"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const bundle_1 = require("../lib/bundle");
function default_1() {
    describe('BundleDoc:', () => {
        it('toPath', () => {
            const paths = ['a', { b: 2 }];
            const data = { a: [{ b: 3, c: 4 }, { b: 2, c: 5 }] };
            chai_1.assert.equal(bundle_1.toPath(data, paths), 'a.1');
        });
        it('get', () => {
            const paths = ['a', { b: 2 }, 'c'];
            const path = 'a.1.c';
            const data = { a: [{ b: 3, c: 4 }, { b: 2, c: 5 }] };
            chai_1.assert.equal(bundle_1.get(data, paths), 5);
            chai_1.assert.equal(bundle_1.get(data, path), 5);
        });
        it('getByPath', () => {
            const path = 'a.1.c';
            const data = { a: [{ b: 3, c: 4 }, { b: 2, c: 5 }] };
            chai_1.assert.equal(bundle_1.getByPath(data, path), 5);
        });
        it('prepare', () => {
            const path = 'a.1.c';
            const paths = ['a', '1', 'c'];
            const bundle = {
                path,
                value: 0,
                type: 'SomeType',
            };
            const container = { data: { a: [{ b: 3, c: 4 }, { b: 2, c: 5 }] } };
            chai_1.assert.deepEqual(bundle_1.prepare(container, bundle), { bundlePath: paths });
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=bundleDoc.js.map