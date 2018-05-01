import { assert } from 'chai';
import * as _ from 'lodash';

import {
  StackableCursor,
} from '../lib/stackable-cursor';

export default function () {
  describe('StackableCursor:', () => {
    it('wrong order', () => {
      const cursor = new StackableCursor();
      cursor.exec(undefined, { a: [{ b: { c: 123 } }] });
      
      cursor.apply({ indexInStack: 1, type: 'set', path: 'a.0.b.c', value: 345 });
      assert.equal(_.size(cursor.bundlesStack), 1);
      assert.equal(cursor.nextBundleIndex, 0);
      assert.equal(cursor.get('a.0.b.c'), 123);
      
      cursor.apply({ indexInStack: 2, type: 'set', path: 'a.0.b.c', value: 456 });
      assert.equal(_.size(cursor.bundlesStack), 2);
      assert.equal(cursor.nextBundleIndex, 0);
      assert.equal(cursor.get('a.0.b.c'), 123);
      
      cursor.apply({ indexInStack: 0, type: 'set', path: 'a.0.b.c', value: 234 });
      assert.equal(_.size(cursor.bundlesStack), 0);
      assert.equal(cursor.nextBundleIndex, 3);
      assert.equal(cursor.get('a.0.b.c'), 456);
    });
    it('duplicate index', () => {
      const cursor = new StackableCursor();
      cursor.exec(undefined, { a: [{ b: { c: 123 } }] });
      
      cursor.apply({ indexInStack: 1, type: 'set', path: 'a.0.b.c', value: 345 });
      assert.equal(_.size(cursor.bundlesStack), 1);
      assert.equal(cursor.nextBundleIndex, 0);
      assert.equal(cursor.get('a.0.b.c'), 123);
      
      cursor.apply({ indexInStack: 1, type: 'set', path: 'a.0.b.c', value: 456 });
      assert.equal(_.size(cursor.bundlesStack), 1);
      assert.equal(cursor.nextBundleIndex, 0);
      assert.equal(cursor.get('a.0.b.c'), 123);
      
      cursor.apply({ indexInStack: 0, type: 'set', path: 'a.0.b.c', value: 234 });
      assert.equal(_.size(cursor.bundlesStack), 0);
      assert.equal(cursor.nextBundleIndex, 2);
      assert.equal(cursor.get('a.0.b.c'), 345);
    });
    it('optional indexation', () => {
      const cursor = new StackableCursor();
      cursor.exec(undefined, { a: [{ b: { c: 123 } }] });
      
      cursor.apply({ type: 'set', path: 'a.0.b.c', value: 123 });
      assert.equal(_.size(cursor.bundlesStack), 0);
      assert.equal(cursor.nextBundleIndex, 0);
      assert.equal(cursor.get('a.0.b.c'), 123);
      
      cursor.apply({ type: 'set', path: 'a.0.b.c', value: 234 });
      assert.equal(_.size(cursor.bundlesStack), 0);
      assert.equal(cursor.nextBundleIndex, 0);
      assert.equal(cursor.get('a.0.b.c'), 234);
      
      cursor.apply({ type: 'set', path: 'a.0.b.c', value: 345 });
      assert.equal(_.size(cursor.bundlesStack), 0);
      assert.equal(cursor.nextBundleIndex, 0);
      assert.equal(cursor.get('a.0.b.c'), 345);
    });
    it('Reset after exec()', () => {
      const cursor = new StackableCursor();
      cursor.exec(undefined, { a: [{ b: { c: 123 } }] });
      
      cursor.apply({ indexInStack: 2, type: 'set', path: 'a.0.b.c', value: 345 });
      assert.equal(_.size(cursor.bundlesStack), 1);
      assert.equal(cursor.nextBundleIndex, 0);
      assert.equal(cursor.get('a.0.b.c'), 123);

      cursor.apply({ indexInStack: 0, type: 'set', path: 'a.0.b.c', value: 456 });
      assert.equal(_.size(cursor.bundlesStack), 1);
      assert.equal(cursor.nextBundleIndex, 1);
      assert.equal(cursor.get('a.0.b.c'), 456);

      cursor.exec(undefined, { a: [{ b: { c: 123 } }] });

      cursor.apply({ indexInStack: 0, type: 'set', path: 'a.0.b.c', value: 234 });
      assert.equal(_.size(cursor.bundlesStack), 0);
      assert.equal(cursor.nextBundleIndex, 1);
      assert.equal(cursor.get('a.0.b.c'), 234);      
    });
  });
}
