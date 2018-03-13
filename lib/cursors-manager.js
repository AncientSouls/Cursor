"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const manager_1 = require("ancient-mixins/lib/manager");
const cursor_1 = require("./cursor");
function mixin(superClass) {
    return class CursorsManager extends superClass {
        constructor() {
            super(...arguments);
            this.Node = cursor_1.Cursor;
        }
    };
}
exports.default = mixin;
exports.mixin = mixin;
const MixedCursorsManager = mixin(manager_1.Manager);
exports.MixedCursorsManager = MixedCursorsManager;
class CursorsManager extends MixedCursorsManager {
}
exports.CursorsManager = CursorsManager;
//# sourceMappingURL=cursors-manager.js.map