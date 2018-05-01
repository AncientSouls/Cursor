import { assert } from 'chai';
import {
  bundleParsers,
  TBundlePaths,
  IBundleValue,
  toPath,
  get,
  getByPath,
  prepare,
} from '../lib/bundle';

export default function () {
  describe('Bundle-doc:', () => {
    it('toPath', () => {
      const paths:TBundlePaths =  ['a', { b:2 }];
      const data = { a:[{ b:3, c:4 }, { b:2, c:5 }] };
      assert.equal(
        toPath (data, paths),
        'a.1',
      );
    });
    it('get', () => {
      const paths:TBundlePaths = ['a', { b:2 }, 'c'];
      const path:TBundlePaths = 'a.1.c';
      const data = { a:[{ b:3, c:4 }, { b:2, c:5 }] };
      assert.equal(get (data, paths), 5);
      assert.equal(get (data, path), 5);
    });
    it('getByPath', () => {
      const path:TBundlePaths = 'a.1.c';
      const data = { a:[{ b:3, c:4 }, { b:2, c:5 }] };
      assert.equal(getByPath (data, path), 5);
    });
    it('prepare', () => {
      const path:TBundlePaths = 'a.1.c';
      const paths:string[] = ['a', '1', 'c'];
      const bundle:IBundleValue = {
        path,
        value: 0,
        type: 'SomeType',
      };
      const container = { data: { a:[{ b:3, c:4 }, { b:2, c:5 }] } };
      assert.deepEqual(prepare (container, bundle), { bundlePath: paths });
    });
  });
}
