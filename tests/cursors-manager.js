"use strict";
exports.__esModule = true;
require("mocha");
var chai_1 = require("chai");
var cursors_manager_1 = require("../lib/cursors-manager");
function default_1() {
    describe('CursorsManager:', function () {
        it('changed', function (done) {
            var cursorsManager = new cursors_manager_1.CursorsManager();
            var cursor = cursorsManager.create();
            cursor.exec(true, { a: [{ b: { c: 'd' } }] });
            cursorsManager.on('changed', function (_a) {
                var data = _a.data, oldValue = _a.oldValue, newValue = _a.newValue, bundlePath = _a.bundlePath, bundle = _a.bundle, watch = _a.watch, cursor = _a.cursor, manager = _a.manager;
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
    });
}
exports["default"] = default_1;
//# sourceMappingURL=cursors-manager.js.map