import 'mocha';
import { assert } from 'chai';

import {
  CursorsManager,
} from '../lib/cursors-manager';

export default function () {
  describe('CursorsManager:', () => {
    it('changed', (done) => {
      const cursorsManager = new CursorsManager();
      const cursor = cursorsManager.create();
      cursor.exec(true, { a: [{ b: { c: 'd' } }] });
      cursorsManager.on('changed', ({
        data, oldValue, newValue, bundlePath, bundle, watch, cursor, manager,
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
  });
}
