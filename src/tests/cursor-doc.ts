import { assert } from 'chai';
import * as _ from 'lodash';

import {
  Cursor,
  watch,
} from '../lib/cursor';

export default function () {
  describe('Cursor-doc:', () => {
    it('apply()', () => {
      const cursor = new Cursor(); 
      cursor.exec(true, { a: [{ b: { c: 'd' } }] });
      cursor.apply({
        type: 'set',
        path: 'a.0',
        value: { d: { e: 'f' } },
      });
      assert.deepEqual(
        cursor.data, 
        { a: [{ d: { e: 'f' } }] },
      );
    });
    it('get()', () => {
      const cursor = new Cursor(); 
      cursor.exec(true, { a: [{ x: 2, b: 123 }] });
      assert.equal(cursor.get('a.0[b]'), 123);
      assert.equal(cursor.get(['a', 0, 'b']), 123);
      assert.equal(cursor.get(['a', { x: 2 }, 'b']), 123);
    });
    it('watch()', () => {
      const cursor = new Cursor(); 
      let watchStatus = false;
      cursor.exec(true, { a: [{ b: { c: 'd' } }, { e: { f: 'g' } }] });
      cursor.on('changed', ({ bundleChanges }) => {
        watch(bundleChanges, 'a.1', ({ newValue }) => {
          watchStatus = true;
        });
      });
      assert.isFalse(watchStatus);
      cursor.apply({
        type: 'set',
        path: 'a.0',
        value: { d: 1 },
      });
      assert.isFalse(watchStatus);
      cursor.apply({
        type: 'set',
        path: 'a.1',
        value: { d: 2 },
      });
      assert.isTrue(watchStatus);
    });
  });
}
