"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const cursor_1 = require("../lib/cursor");
const manager_1 = require("ancient-mixins/lib/manager");
function test(path) {
    const _path = path ? `${path}.` : path;
    const parent = new cursor_1.Cursor();
    const sprayed = new manager_1.Manager();
    parent.on('changed', cursor_1.spray(path, sprayed));
    parent.apply({
        type: 'set',
        path: `${path}`,
        value: {
            a: { a: 1 },
            b: { b: 2 },
            c: { c: 3 },
        },
    });
    chai_1.assert.deepEqual(parent.get(`${_path}a`), sprayed.list.nodes.a.data);
    chai_1.assert.deepEqual(parent.get(`${_path}b`), sprayed.list.nodes.b.data);
    chai_1.assert.deepEqual(parent.get(`${_path}c`), sprayed.list.nodes.c.data);
    parent.apply({
        type: 'set',
        path: `${_path}b.b`,
        value: 4,
    });
    chai_1.assert.deepEqual(parent.get(`${_path}a`), sprayed.list.nodes.a.data);
    chai_1.assert.deepEqual(parent.get(`${_path}b`), { b: 4 });
    chai_1.assert.deepEqual(parent.get(`${_path}b`), sprayed.list.nodes.b.data);
    chai_1.assert.deepEqual(parent.get(`${_path}c`), sprayed.list.nodes.c.data);
    parent.apply({
        type: 'set',
        path: `${_path}d.d`,
        value: 5,
    });
    chai_1.assert.deepEqual(parent.get(`${_path}a`), sprayed.list.nodes.a.data);
    chai_1.assert.deepEqual(parent.get(`${_path}b`), sprayed.list.nodes.b.data);
    chai_1.assert.deepEqual(parent.get(`${_path}c`), sprayed.list.nodes.c.data);
    chai_1.assert.deepEqual(parent.get(`${_path}d`), { d: 5 });
    chai_1.assert.deepEqual(parent.get(`${_path}d`), sprayed.list.nodes.d.data);
    parent.apply({
        type: 'unset',
        path: `${_path}d`,
    });
    chai_1.assert.deepEqual(parent.get(`${_path}a`), sprayed.list.nodes.a.data);
    chai_1.assert.deepEqual(parent.get(`${_path}b`), sprayed.list.nodes.b.data);
    chai_1.assert.deepEqual(parent.get(`${_path}c`), sprayed.list.nodes.c.data);
    chai_1.assert.isNotOk(sprayed.list.nodes.d);
}
function default_1() {
    describe('spray():', () => {
        it('spray ""', () => {
            test('');
        });
        it('spray "x"', () => {
            test('x');
        });
        it('spray "x.y"', () => {
            test('x.y');
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=spray.js.map