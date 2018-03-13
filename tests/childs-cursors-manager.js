"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const chai_1 = require("chai");
const cursor_1 = require("../lib/cursor");
const childs_cursors_manager_1 = require("../lib/childs-cursors-manager");
function test(path) {
    const _path = path ? `${path}.` : path;
    const parent = new cursor_1.Cursor();
    const ccm = new childs_cursors_manager_1.ChildsCursorsManager();
    parent.on('changed', ccm.maintain(path));
    parent.apply({
        type: 'set',
        path: `${path}`,
        value: {
            a: { a: 1 },
            b: { b: 2 },
            c: { c: 3 },
        },
    });
    chai_1.assert.deepEqual(_.get(parent.data, `${_path}a`), ccm.nodes.a.data);
    chai_1.assert.deepEqual(_.get(parent.data, `${_path}b`), ccm.nodes.b.data);
    chai_1.assert.deepEqual(_.get(parent.data, `${_path}c`), ccm.nodes.c.data);
    parent.apply({
        type: 'set',
        path: `${_path}b.b`,
        value: 4,
    });
    chai_1.assert.deepEqual(_.get(parent.data, `${_path}a`), ccm.nodes.a.data);
    chai_1.assert.deepEqual(_.get(parent.data, `${_path}b`), { b: 4 });
    chai_1.assert.deepEqual(_.get(parent.data, `${_path}b`), ccm.nodes.b.data);
    chai_1.assert.deepEqual(_.get(parent.data, `${_path}c`), ccm.nodes.c.data);
    parent.apply({
        type: 'set',
        path: `${_path}d.d`,
        value: 5,
    });
    chai_1.assert.deepEqual(_.get(parent.data, `${_path}a`), ccm.nodes.a.data);
    chai_1.assert.deepEqual(_.get(parent.data, `${_path}b`), ccm.nodes.b.data);
    chai_1.assert.deepEqual(_.get(parent.data, `${_path}c`), ccm.nodes.c.data);
    chai_1.assert.deepEqual(_.get(parent.data, `${_path}d`), { d: 5 });
    chai_1.assert.deepEqual(_.get(parent.data, `${_path}d`), ccm.nodes.d.data);
    parent.apply({
        type: 'unset',
        path: `${_path}d`,
    });
    chai_1.assert.deepEqual(_.get(parent.data, `${_path}a`), ccm.nodes.a.data);
    chai_1.assert.deepEqual(_.get(parent.data, `${_path}b`), ccm.nodes.b.data);
    chai_1.assert.deepEqual(_.get(parent.data, `${_path}c`), ccm.nodes.c.data);
    chai_1.assert.isNotOk(ccm.nodes.d);
}
function default_1() {
    describe('ChildsCursorsManager:', () => {
        it('maintain ""', () => {
            test('');
        });
        it('maintain "x"', () => {
            test('x');
        });
        it('maintain "x.y"', () => {
            test('x.y');
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=childs-cursors-manager.js.map