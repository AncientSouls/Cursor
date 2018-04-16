"use strict";
var chai_1 = require('chai');
var bundle_1 = require('../lib/bundle');
function default_1() {
    describe('BundleDoc:', function () {
        describe('paths', function () {
            it('toPath', function () {
                var paths = ['a', { b: 2 }];
                var data = { a: [{ b: 3, c: 4 }, { b: 2, c: 5 }] };
                chai_1.assert.equal(bundle_1.toPath(data, paths), 'a.1');
            });
            it('get', function () {
                var paths = ['a', { b: 2 }, 'c'];
                var path = 'a.1.c';
                var data = { a: [{ b: 3, c: 4 }, { b: 2, c: 5 }] };
                chai_1.assert.equal(bundle_1.get(data, paths), 5);
                chai_1.assert.equal(bundle_1.get(data, path), 5);
            });
            it('getByPath', function () {
                var path = 'a.1.c';
                var data = { a: [{ b: 3, c: 4 }, { b: 2, c: 5 }] };
                chai_1.assert.equal(bundle_1.getByPath(data, path), 5);
            });
            it('prepare', function () {
                var path = 'a.1.c';
                var bundle = {
                    path: 'a.0.b.c',
                    value: 234
                };
                var container = { data: { a: [{ b: 3, c: 4 }, { b: 2, c: 5 }] } };
                chai_1.assert.equal(bundle_1.prepare(container, bundle), { bundlePath: 'a.1.c', oldValue: 5 });
            });
        });
    });
}
exports["default"] = default_1;
