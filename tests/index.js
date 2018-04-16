"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('source-map-support').install();
const bundle_1 = require("./bundle");
const bundleDoc_1 = require("./bundleDoc");
const cursor_1 = require("./cursor");
const stackable_cursor_1 = require("./stackable-cursor");
const cursors_manager_1 = require("./cursors-manager");
const childs_cursors_manager_1 = require("./childs-cursors-manager");
describe('AncientSouls/Cursor:', () => {
    bundle_1.default();
    bundleDoc_1.default();
    cursor_1.default();
    stackable_cursor_1.default();
    cursors_manager_1.default();
    childs_cursors_manager_1.default();
});
//# sourceMappingURL=index.js.map