import { assert } from 'chai';
import * as _ from 'lodash';

import {
  Cursor,
} from '../lib/cursor';

export default function () {
  describe('Cursor:', () => {
    it('get()', () => {
      const cursor = new Cursor();
      cursor.exec(true, { a: [{ b: { c: 'd' } }] });
      assert.equal(cursor.get('a.0.b.c'), 'd');
    });
    it('apply()', () => {
      const cursor = new Cursor();
      cursor.exec(true, { a: [{ b: { c: 'd' } }] });
      cursor.apply({
        type: 'set',
        path: 'a.0.b',
        value: { d: 'e' },
      });
      assert.equal(cursor.get('a.0.b.d'), 'e');
    });
    it('changed', (done) => {
      const cursor = new Cursor();
      cursor.exec(true, { a: [{ b: { c: 'd' } }] });
      cursor.on('changed', ({
        data, oldValue, newValue, bundlePath, bundle, watch, cursor,
      }) => {
        assert.deepEqual(data, { a: [{ b: { d: 'e' } }] });
        assert.deepEqual(oldValue, { c: 'd' });
        assert.deepEqual(newValue, { d: 'e' });
        done();
      });
      cursor.apply({
        type: 'set',
        path: 'a.0.b',
        value: { d: 'e' },
      });
    });
    it('watch', (done) => {
      const cursor = new Cursor();
      cursor.exec(true, { a: [{ b: { c: 'd' } }] });
      cursor.on('changed', ({ watch }) => {
        let counter = 0;
        watch('', ({ isClone, oldValue, newValue }) => {
          assert.isFalse(isClone);
          assert.deepEqual(oldValue, { a: [{ d: { e: 'f' } }] });
          assert.deepEqual(newValue, { a: [{ d: { e: 'f' } }] });
          counter++;
        });
        watch('a', ({ isClone, oldValue, newValue }) => {
          assert.isFalse(isClone);
          assert.deepEqual(oldValue, [{ d: { e: 'f' } }]);
          assert.deepEqual(newValue, [{ d: { e: 'f' } }]);
          counter++;
        });
        watch('a.0', ({ isClone, oldValue, newValue }) => {
          assert.isTrue(isClone);
          assert.deepEqual(oldValue, { b: { c: 'd' } });
          assert.deepEqual(newValue, { d: { e: 'f' } });
          counter++;
        });
        watch(['a', {}, 'b'], ({ isClone, oldValue, newValue }) => {
          assert.isTrue(isClone);
          assert.deepEqual(oldValue, { c: 'd' });
          assert.deepEqual(newValue, undefined);
          counter++;
        });
        watch('a.0.b', ({ isClone, oldValue, newValue }) => {
          assert.isTrue(isClone);
          assert.deepEqual(oldValue, { c: 'd' });
          assert.deepEqual(newValue, undefined);
          counter++;
        });
        watch('a.0.b.c', ({ isClone, oldValue, newValue }) => {
          assert.isTrue(isClone);
          assert.deepEqual(oldValue, 'd');
          assert.deepEqual(newValue, undefined);
          counter++;
        });
        watch('a.0.d', ({ isClone, oldValue, newValue }) => {
          assert.isTrue(isClone);
          assert.deepEqual(oldValue, undefined);
          assert.deepEqual(newValue, { e: 'f' });
          counter++;
        });
        watch('a.0.d.e', ({ isClone, oldValue, newValue }) => {
          assert.isTrue(isClone);
          assert.deepEqual(oldValue, undefined);
          assert.deepEqual(newValue, 'f');
          counter++;
        });
        watch('x.y.z', ({ isClone, oldValue, newValue }) => {
          throw new Error('"x.y.z" path is not changed, wrong watch calling');
        });
        watch('a.1', ({ isClone, oldValue, newValue }) => {
          throw new Error('"a.1" path is not changed, wrong watch calling');
        });
        watch('b', ({ isClone, oldValue, newValue }) => {
          throw new Error('"b" path is not changed, wrong watch calling');
        });
        assert.equal(counter, 8);
        done();
      });
      cursor.apply({
        type: 'set',
        path: 'a.0',
        value: { d: { e: 'f' } },
      });
    });
  });
}
