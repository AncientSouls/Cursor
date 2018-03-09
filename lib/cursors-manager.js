"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var manager_1 = require("ancient-mixins/lib/manager");
var cursor_1 = require("./cursor");
function mixin(superClass) {
    return (function (_super) {
        __extends(CursorsManager, _super);
        function CursorsManager() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.Node = cursor_1.Cursor;
            return _this;
        }
        return CursorsManager;
    }(superClass));
}
exports["default"] = mixin;
exports.mixin = mixin;
var MixedCursorsManager = mixin(manager_1.Manager);
exports.MixedCursorsManager = MixedCursorsManager;
var CursorsManager = (function (_super) {
    __extends(CursorsManager, _super);
    function CursorsManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CursorsManager;
}(MixedCursorsManager));
exports.CursorsManager = CursorsManager;
//# sourceMappingURL=cursors-manager.js.map