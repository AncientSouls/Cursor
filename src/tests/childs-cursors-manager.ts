import * as _ from 'lodash';
import { assert } from 'chai';

import {
  Cursor,
} from '../lib/cursor';

import {
  ChildsCursorsManager,
} from '../lib/childs-cursors-manager';

function test(path) {
  const _path = path ? `${path}.` : path;
  const parent = new Cursor();
  const ccm = new ChildsCursorsManager();
  
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
  
  assert.deepEqual(_.get(parent.data, `${_path}a`), ccm.list.nodes.a.data);
  assert.deepEqual(_.get(parent.data, `${_path}b`), ccm.list.nodes.b.data);
  assert.deepEqual(_.get(parent.data, `${_path}c`), ccm.list.nodes.c.data);
  
  parent.apply({
    type: 'set',
    path: `${_path}b.b`,
    value: 4,
  });
  
  assert.deepEqual(_.get(parent.data, `${_path}a`), ccm.list.nodes.a.data);
  assert.deepEqual(_.get(parent.data, `${_path}b`), { b: 4 });
  assert.deepEqual(_.get(parent.data, `${_path}b`), ccm.list.nodes.b.data);
  assert.deepEqual(_.get(parent.data, `${_path}c`), ccm.list.nodes.c.data);
  
  parent.apply({
    type: 'set',
    path: `${_path}d.d`,
    value: 5,
  });
  
  assert.deepEqual(_.get(parent.data, `${_path}a`), ccm.list.nodes.a.data);
  assert.deepEqual(_.get(parent.data, `${_path}b`), ccm.list.nodes.b.data);
  assert.deepEqual(_.get(parent.data, `${_path}c`), ccm.list.nodes.c.data);
  assert.deepEqual(_.get(parent.data, `${_path}d`), { d: 5 });
  assert.deepEqual(_.get(parent.data, `${_path}d`), ccm.list.nodes.d.data);
  
  parent.apply({
    type: 'unset',
    path: `${_path}d`,
  });
  
  assert.deepEqual(_.get(parent.data, `${_path}a`), ccm.list.nodes.a.data);
  assert.deepEqual(_.get(parent.data, `${_path}b`), ccm.list.nodes.b.data);
  assert.deepEqual(_.get(parent.data, `${_path}c`), ccm.list.nodes.c.data);
  assert.isNotOk(ccm.list.nodes.d);
}

export default function () {
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
