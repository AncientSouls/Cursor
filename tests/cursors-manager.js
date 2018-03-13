"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const cursors_manager_1 = require("../lib/cursors-manager");
function default_1() {
    describe('CursorsManager:', () => {
        it('changed', (done) => {
            const cursorsManager = new cursors_manager_1.CursorsManager();
            const cursor = cursorsManager.create();
            cursor.exec(true, { a: [{ b: { c: 'd' } }] });
            cursorsManager.on('changed', ({ data, oldValue, newValue, bundlePath, bundle, watch, cursor, manager, }) => {
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
    });
}
exports.default = default_1;
//# sourceMappingURL=cursors-manager.js.map