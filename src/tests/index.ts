require('source-map-support').install();

import bundle from './bundle';
import bundleDoc from './bundleDoc';
import cursor from './cursor';
import stackableCursor from './stackable-cursor';
import cursorsManager from './cursors-manager';
import childsCursorsManager from './childs-cursors-manager';

describe('AncientSouls/Cursor:', () => {
  bundle();
  bundleDoc();
  cursor();
  stackableCursor();
  cursorsManager();
  childsCursorsManager();
});
