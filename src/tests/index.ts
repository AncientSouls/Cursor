require('source-map-support').install();

import bundle from './bundle';
import bundleDoc from './bundle-doc';
import cursor from './cursor';
import cursorDoc from './cursor-doc';
import stackableCursor from './stackable-cursor';
import cursorsManager from './cursors-manager';
import childsCursorsManager from './childs-cursors-manager';

describe('AncientSouls/Cursor:', () => {
  bundle();
  bundleDoc();
  cursor();
  cursorDoc();
  stackableCursor();
  cursorsManager();
  childsCursorsManager();
});
