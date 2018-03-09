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
var _ = require("lodash");
var bundle_1 = require("./bundle");
var cursors_manager_1 = require("./cursors-manager");
function mixin(superClass) {
    return (function (_super) {
        __extends(ChildsCursorsManager, _super);
        function ChildsCursorsManager() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ChildsCursorsManager.prototype.maintain = function (path) {
            var _this = this;
            return function (_a) {
                var watch = _a.watch, bundlePath = _a.bundlePath;
                watch(path, function (_a) {
                    var isClone = _a.isClone, oldValue = _a.oldValue, newValue = _a.newValue, bundlePath = _a.bundlePath, watchPath = _a.watchPath, localBundlePath = _a.localBundlePath, localWatchPath = _a.localWatchPath;
                    if (localBundlePath.length) {
                        var id = localBundlePath[0];
                        var childData = bundle_1.get(newValue, id);
                        if (childData) {
                            if (!_this.nodes[id])
                                _this.create(id);
                            _this.nodes[id].exec(null, childData);
                        }
                        else {
                            if (_this.nodes[id])
                                _this.nodes[id].destroy();
                        }
                    }
                    else {
                        _.each(_this.nodes, function (childCursor, id) {
                            var childData = bundle_1.get(newValue, id);
                            if (!childData)
                                childCursor.destroy();
                            else
                                childCursor.exec(null, childData);
                        });
                        _.each(newValue, function (childData, id) {
                            if (!_this.nodes[id])
                                _this.create(id);
                            _this.nodes[id].exec(null, bundle_1.get(newValue, id));
                        });
                    }
                });
            };
        };
        return ChildsCursorsManager;
    }(superClass));
}
exports["default"] = mixin;
exports.mixin = mixin;
var MixedChildsCursorsManager = mixin(cursors_manager_1.CursorsManager);
exports.MixedChildsCursorsManager = MixedChildsCursorsManager;
var ChildsCursorsManager = (function (_super) {
    __extends(ChildsCursorsManager, _super);
    function ChildsCursorsManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ChildsCursorsManager;
}(MixedChildsCursorsManager));
exports.ChildsCursorsManager = ChildsCursorsManager;
//# sourceMappingURL=childs-cursors-manager.js.map