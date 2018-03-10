import { assert } from 'chai';
import {
  bundleParsers,
  get,
} from '../lib/bundle';

export default function () {
  describe('Bundle:', () => {
    describe('paths', () => {
      it('path', () => {
        assert.equal(
          get({ a:[{ b:[{ c: 'd' }] }] }, 'a.0.b.0.c'),
          'd',
        );
      });
      it('(path[]|find)[]', () => {
        assert.equal(
          get(
            {
              a: [
                { x: 5, b: [
                  { y: 3, c: 9 },
                  { y: 2, c: 4 },
                ] },
                { x: 7, b: [
                  { y: 6, c: 3 },
                  { y: 8, c: 1 },
                ]  },
              ],
            },
            ['a', { x: 7 }, 'b', ['y', 6], 'c'],
          ),
          3,
        );
      });
    });
    describe('types', () => {
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
          value: { d: 234 },
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
      it('splice', () => {
        const container = { data: { a: [{ b: { c: 123 } }, { b: { c: 456 } }] } };
        bundleParsers.splice(container, {
          type: 'splice',
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
      it('remove', () => {
        const container = { data: { x: [
          { y: 1, a: [{ b: { c: 123 } }, { b: { c: 456 } }] },
          { y: 2, a: [{ b: { c: 123 } }, { b: { c: 456 } }] },
        ] } };
        bundleParsers.remove(container, {
          type: 'remove',
          path: ['x', ['y',2], 'a'],
          selector: { b: { c: 123 } },
        });
        assert.deepEqual(
          container.data,
          { x: [
            { y: 1, a: [{ b: { c: 123 } }, { b: { c: 456 } }] },
            { y: 2, a: [{ b: { c: 456 } }] },
          ] },
        );
      });
    });
  });
}
