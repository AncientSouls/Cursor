"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const bundle_1 = require("./bundle");
const cursors_manager_1 = require("./cursors-manager");
function mixin(superClass) {
    return class ChildsCursorsManager extends superClass {
        maintain(path) {
            return ({ watch, bundlePath }) => {
                watch(path, ({ isClone, oldValue, newValue, bundlePath, watchPath, localBundlePath, localWatchPath, }) => {
                    if (localBundlePath.length) {
                        const id = localBundlePath[0];
                        const childData = bundle_1.get(newValue, id);
                        if (childData) {
                            if (!this.nodes[id])
                                this.create(id);
                            this.nodes[id].exec(null, childData);
                        }
                        else {
                            if (this.nodes[id])
                                this.nodes[id].destroy();
                        }
                    }
                    else {
                        _.each(this.nodes, (childCursor, id) => {
                            const childData = bundle_1.get(newValue, id);
                            if (!childData)
                                childCursor.destroy();
                            else
                                childCursor.exec(null, childData);
                        });
                        _.each(newValue, (childData, id) => {
                            if (!this.nodes[id])
                                this.create(id);
                            this.nodes[id].exec(null, bundle_1.get(newValue, id));
                        });
                    }
                });
            };
        }
    };
}
exports.default = mixin;
exports.mixin = mixin;
const MixedChildsCursorsManager = mixin(cursors_manager_1.CursorsManager);
exports.MixedChildsCursorsManager = MixedChildsCursorsManager;
class ChildsCursorsManager extends MixedChildsCursorsManager {
}
exports.ChildsCursorsManager = ChildsCursorsManager;
//# sourceMappingURL=childs-cursors-manager.js.map