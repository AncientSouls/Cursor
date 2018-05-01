require('source-map-support').install();

import bundle from './bundle';
import bundleDoc from './bundle-doc';
import cursor from './cursor';
import cursorDoc from './cursor-doc';
import stackableCursor from './stackable-cursor';
import spray from './spray';

describe('AncientSouls/Cursor:', () => {
  bundle();
  bundleDoc();
  cursor();
  cursorDoc();
  stackableCursor();
  spray();
});
