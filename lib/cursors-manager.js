"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const manager_1 = require("ancient-mixins/lib/manager");
const cursor_1 = require("./cursor");
class CursorsManager extends manager_1.Manager {
    constructor() {
        super(...arguments);
        this.Node = cursor_1.Cursor;
    }
}
exports.CursorsManager = CursorsManager;
//# sourceMappingURL=cursors-manager.js.map