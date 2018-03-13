"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const cursor_1 = require("./cursor");
function mixin(superClass) {
    return class StackableCursor extends superClass {
        constructor() {
            super(...arguments);
            this.nextBundleIndex = 0;
            this.bundlesStack = {};
        }
        apply(bundle) {
            if (_.isNumber(bundle.indexInStack)) {
                if (bundle.indexInStack >= this.nextBundleIndex &&
                    !this.bundlesStack[bundle.indexInStack]) {
                    if (bundle.indexInStack === this.nextBundleIndex) {
                        super.apply(bundle);
                        this.nextBundleIndex++;
                        if (this.bundlesStack[this.nextBundleIndex]) {
                            const nextBundle = this.bundlesStack[this.nextBundleIndex];
                            delete this.bundlesStack[this.nextBundleIndex];
                            this.apply(nextBundle);
                        }
                    }
                    else {
                        this.bundlesStack[bundle.indexInStack] = bundle;
                    }
                }
            }
            else if (this.nextBundleIndex === 0) {
                super.apply(bundle);
            }
            return this;
        }
    };
}
exports.default = mixin;
exports.mixin = mixin;
const MixedStackableCursor = mixin(cursor_1.Cursor);
exports.MixedStackableCursor = MixedStackableCursor;
class StackableCursor extends MixedStackableCursor {
}
exports.StackableCursor = StackableCursor;
//# sourceMappingURL=stackable-cursor.js.map