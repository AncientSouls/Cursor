import * as _ from 'lodash';
import { assert } from 'chai';

import {
  Cursor,
  spray,
} from '../lib/cursor';

import {
  Manager,
} from 'ancient-mixins/lib/manager';

function test(path) {
  const _path = path ? `${path}.` : path;
  const parent = new Cursor();
  const sprayed = new Manager();
  
  parent.on('changed', spray(path, sprayed));
  
  parent.apply({
    type: 'set',
    path: `${path}`,
    value: {
      a: { a: 1 },
      b: { b: 2 },
      c: { c: 3 },
    },
  });
  
  assert.deepEqual(_.get(parent.data, `${_path}a`), sprayed.list.nodes.a.data);
  assert.deepEqual(_.get(parent.data, `${_path}b`), sprayed.list.nodes.b.data);
  assert.deepEqual(_.get(parent.data, `${_path}c`), sprayed.list.nodes.c.data);
  
  parent.apply({
    type: 'set',
    path: `${_path}b.b`,
    value: 4,
  });
  
  assert.deepEqual(_.get(parent.data, `${_path}a`), sprayed.list.nodes.a.data);
  assert.deepEqual(_.get(parent.data, `${_path}b`), { b: 4 });
  assert.deepEqual(_.get(parent.data, `${_path}b`), sprayed.list.nodes.b.data);
  assert.deepEqual(_.get(parent.data, `${_path}c`), sprayed.list.nodes.c.data);
  
  parent.apply({
    type: 'set',
    path: `${_path}d.d`,
    value: 5,
  });
  
  assert.deepEqual(_.get(parent.data, `${_path}a`), sprayed.list.nodes.a.data);
  assert.deepEqual(_.get(parent.data, `${_path}b`), sprayed.list.nodes.b.data);
  assert.deepEqual(_.get(parent.data, `${_path}c`), sprayed.list.nodes.c.data);
  assert.deepEqual(_.get(parent.data, `${_path}d`), { d: 5 });
  assert.deepEqual(_.get(parent.data, `${_path}d`), sprayed.list.nodes.d.data);
  
  parent.apply({
    type: 'unset',
    path: `${_path}d`,
  });
  
  assert.deepEqual(_.get(parent.data, `${_path}a`), sprayed.list.nodes.a.data);
  assert.deepEqual(_.get(parent.data, `${_path}b`), sprayed.list.nodes.b.data);
  assert.deepEqual(_.get(parent.data, `${_path}c`), sprayed.list.nodes.c.data);
  assert.isNotOk(sprayed.list.nodes.d);
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
