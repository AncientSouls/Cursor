import { assert } from 'chai';
import { bundleParsers } from '../lib/bundle';

export default function () {
  describe('Bundle:', () => {
    it('set', () => {
      const container = { data: { a: [{ b: { c: 123 } }] } };
      bundleParsers.set(container, {
        type: 'set',
        path: 'a.0.b.c',
        value: 234,
      });
      assert.deepEqual(
        container.data,
        { a: [{ b: { c: 234 } }] },
      );
    });
    it('extend', () => {
      const container = { data: { a: [{ b: { c: 123 } }] } };
      bundleParsers.extend(container, {
        type: 'extend',
        path: 'a.0.b',
        extend: { d: 234 },
      });
      assert.deepEqual(
        container.data,
        { a: [{ b: { c: 123, d: 234 } }] },
      );
    });
    it('unset', () => {
      const container = { data: { a: [{ b: { c: 123 } }] } };
      bundleParsers.unset(container, {
        type: 'unset',
        path: 'a.0.b.c',
      });
      assert.deepEqual(
        container.data,
        { a: [{ b: { } }] },
      );
    });
    it('arraySplice', () => {
      const container = { data: { a: [{ b: { c: 123 } }, { b: { c: 456 } }] } };
      bundleParsers.arraySplice(container, {
        type: 'arraySplice',
        path: 'a',
        start: 1,
        deleteCount: 0,
        values: [
          { b: { c: 234 } },
          { b: { c: 345 } },
        ],
      });
      assert.deepEqual(
        container.data,
        { a: [
          { b: { c: 123 } },
          { b: { c: 234 } },
          { b: { c: 345 } },
          { b: { c: 456 } },
        ] },
      );
    });
    it('arrayRemove', () => {
      const container = { data: { a: [{ b: { c: 123 } }, { b: { c: 456 } }] } };
      bundleParsers.arrayRemove(container, {
        type: 'arrayRemove',
        path: 'a',
        selector: { b: { c: 123 } },
      });
      assert.deepEqual(
        container.data,
        { a: [
          { b: { c: 456 } },
        ] },
      );
    });
    it('arrayFilterAndExtend', () => {
      const container = { data: { a: [{ b: { c: 123 } }, { b: { c: 456 } }] } };
      bundleParsers.arrayFilterAndExtend(container, {
        type: 'arrayFilterAndExtend',
        path: 'a',
        selector: { b: {} },
        extend: { d: 234 },
      });
      assert.deepEqual(
        container.data,
        { a: [
          { b: { c: 123 }, d: 234 },
          { b: { c: 456 }, d: 234 },
        ] },
      );
    });
    it('arrayFindAndExtend', () => {
      const container = { data: { a: [{ b: { c: 123 } }, { b: { c: 456 } }] } };
      bundleParsers.arrayFindAndExtend(container, {
        type: 'arrayFindAndExtend',
        path: 'a',
        selector: { b: {} },
        extend: { d: 234 },
      });
      assert.deepEqual(
        container.data,
        { a: [
          { b: { c: 123 }, d: 234 },
          { b: { c: 456 } },
        ] },
      );
    });
  });
}
