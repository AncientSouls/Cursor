"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const node_1 = require("ancient-mixins/lib/node");
const bundle_1 = require("./bundle");
function watch({ oldValue, newValue, bundlePath, data, bundle }, paths, listener) {
    const watchPath = _.toPath(bundle_1.toPath(data, paths));
    const localWatchPath = watchPath.slice(bundlePath.length);
    const localBundlePath = bundlePath.slice(watchPath.length);
    const leastPathLength = Math.min(watchPath.length, bundlePath.length);
    const value = bundle_1.get(data, paths);
    let localOldValue;
    let localNewValue;
    let isClone;
    if (leastPathLength) {
        if (!_.isEqual(watchPath.slice(0, leastPathLength), bundlePath.slice(0, leastPathLength))) {
            return;
        }
    }
    if (bundlePath.length <= watchPath.length) {
        localOldValue = bundle_1.get(oldValue, localWatchPath);
        localNewValue = value;
        isClone = true;
    }
    else {
        localOldValue = localNewValue = bundle_1.get(data, paths);
        isClone = false;
    }
    listener({
        bundlePath, watchPath, localBundlePath, localWatchPath, data, bundle,
        isClone,
        oldValue: localOldValue,
        newValue: localNewValue,
    });
}
exports.watch = watch;
function apply(cursor, bundle) {
    const bundleChanges = cursor.parse(bundle);
    const { oldValue, newValue, bundlePath, data } = bundleChanges;
    const eventData = {
        data,
        oldValue,
        newValue,
        bundlePath,
        bundle,
        cursor,
        watch: (path, listener) => {
            watch(bundleChanges, path, listener);
        },
    };
    cursor.emit('changed', eventData);
}
function mixin(superClass) {
    return class Cursor extends superClass {
        exec(query, data) {
            const oldQuery = this.query;
            const oldData = this.data;
            const oldQueryId = this.queryId;
            this.query = query;
            if (data)
                apply(this, { type: 'set', path: '', value: data });
            this.queryId = this.generateId();
            this.emit('exec', { oldQuery, oldData, oldQueryId, cursor: this });
            return this;
        }
        apply(bundle) {
            apply(this, bundle);
            return this;
        }
        parse(bundle) {
            if (!bundle_1.bundleParsers[bundle.type]) {
                throw new Error(`Parser ${bundle.type} is not founded.`);
            }
            return bundle_1.bundleParsers[bundle.type](this, bundle);
        }
        get(paths) {
            return bundle_1.get(this.data, paths);
        }
    };
}
exports.default = mixin;
exports.mixin = mixin;
const MixedCursor = mixin(node_1.Node);
exports.MixedCursor = MixedCursor;
class Cursor extends MixedCursor {
}
exports.Cursor = Cursor;
//# sourceMappingURL=cursor.js.map