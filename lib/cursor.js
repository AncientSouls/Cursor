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
var node_1 = require("ancient-mixins/lib/node");
var bundle_1 = require("./bundle");
function watch(_a, path, listener) {
    var oldValue = _a.oldValue, newValue = _a.newValue, bundlePath = _a.bundlePath, data = _a.data, bundle = _a.bundle;
    var watchPath = _.toPath(path);
    var localWatchPath = watchPath.slice(bundlePath.length);
    var localBundlePath = bundlePath.slice(watchPath.length);
    var leastPathLength = Math.min(watchPath.length, bundlePath.length);
    var value = bundle_1.get(data, path);
    var localOldValue;
    var localNewValue;
    var isClone;
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
        localOldValue = localNewValue = bundle_1.get(data, path);
        isClone = false;
    }
    listener({
        bundlePath: bundlePath, watchPath: watchPath, localBundlePath: localBundlePath, localWatchPath: localWatchPath, data: data, bundle: bundle,
        isClone: isClone,
        oldValue: localOldValue,
        newValue: localNewValue
    });
}
exports.watch = watch;
function apply(cursor, bundle) {
    var bundleChanges = cursor.parse(bundle);
    var oldValue = bundleChanges.oldValue, newValue = bundleChanges.newValue, bundlePath = bundleChanges.bundlePath, data = bundleChanges.data;
    var eventData = {
        data: data,
        oldValue: oldValue,
        newValue: newValue,
        bundlePath: bundlePath,
        bundle: bundle,
        cursor: cursor,
        watch: function (path, listener) {
            watch(bundleChanges, path, listener);
        }
    };
    cursor.emit('changed', eventData);
}
function mixin(superClass) {
    return /** @class */ (function (_super) {
        __extends(Cursor, _super);
        function Cursor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Cursor.prototype.exec = function (query, data) {
            var oldQuery = this.query;
            var oldData = this.data;
            var oldQueryId = this.queryId;
            this.query = query;
            if (data)
                apply(this, { type: 'set', path: '', value: data });
            this.queryId = this.generateId();
            this.emit('exec', { oldQuery: oldQuery, oldData: oldData, oldQueryId: oldQueryId, cursor: this });
            return this;
        };
        Cursor.prototype.apply = function (bundle) {
            apply(this, bundle);
            return this;
        };
        Cursor.prototype.parse = function (bundle) {
            if (!bundle_1.bundleParsers[bundle.type])
                throw new Error("Parser " + bundle.type + " is not founded.");
            return bundle_1.bundleParsers[bundle.type](this, bundle);
        };
        Cursor.prototype.get = function (path) {
            return bundle_1.get(this.data, path);
        };
        return Cursor;
    }(node_1.Node));
}
exports["default"] = mixin;
exports.mixin = mixin;
var MixedCursor = mixin(node_1.Node);
exports.MixedCursor = MixedCursor;
var Cursor = /** @class */ (function (_super) {
    __extends(Cursor, _super);
    function Cursor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Cursor;
}(MixedCursor));
exports.Cursor = Cursor;
//# sourceMappingURL=cursor.js.map