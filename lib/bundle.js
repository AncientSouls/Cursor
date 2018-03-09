"use strict";
exports.__esModule = true;
var _ = require("lodash");
function get(data, path) {
    var arrayPath = _.toPath(path);
    return path.length ? _.get(data, path) : data;
}
exports.get = get;
function prepare(container, bundle) {
    var bundlePath = _.toPath(bundle.path);
    var oldValue = _.clone(get(container.data, bundlePath));
    return { oldValue: oldValue, bundlePath: bundlePath };
}
exports.prepare = prepare;
var bundleParsers = {
    set: function (container, bundle) {
        var _a = prepare(container, bundle), oldValue = _a.oldValue, bundlePath = _a.bundlePath;
        if (!bundlePath.length) {
            container.data = bundle.value;
        }
        else {
            container.data = _.set(container.data || {}, bundlePath, bundle.value);
        }
        var newValue = get(container.data, bundlePath);
        return { oldValue: oldValue, newValue: newValue, bundlePath: bundlePath, bundle: bundle, data: container.data };
    },
    extend: function (container, bundle) {
        var _a = prepare(container, bundle), oldValue = _a.oldValue, bundlePath = _a.bundlePath;
        if (!bundlePath.length) {
            _.extend(container.data, bundle.value);
        }
        else {
            _.extend(get(container.data, bundlePath), bundle.value);
        }
        var newValue = get(container.data, bundlePath);
        return { oldValue: oldValue, newValue: newValue, bundlePath: bundlePath, bundle: bundle, data: container.data };
    },
    unset: function (container, bundle) {
        var _a = prepare(container, bundle), oldValue = _a.oldValue, bundlePath = _a.bundlePath;
        if (!bundlePath.length) {
            container.data = undefined;
        }
        else {
            var parent_1 = get(container.data, bundlePath.slice(0, bundlePath.length - 1));
            delete parent_1[bundlePath[bundlePath.length - 1]];
        }
        var newValue = get(container.data, bundlePath);
        return { oldValue: oldValue, newValue: newValue, bundlePath: bundlePath, bundle: bundle, data: container.data };
    },
    arraySplice: function (container, bundle) {
        var _a = prepare(container, bundle), oldValue = _a.oldValue, bundlePath = _a.bundlePath;
        var value = get(container.data, bundlePath);
        if (!_.isArray(value)) {
            throw new Error("Data by path \"" + bundle.path + "\" is not an array but " + typeof (value) + ".");
        }
        value.splice.apply(value, [bundle.start, bundle.deleteCount].concat(bundle.values));
        var newValue = value;
        return { oldValue: oldValue, newValue: newValue, bundlePath: bundlePath, bundle: bundle, data: container.data };
    },
    arrayRemove: function (container, bundle) {
        var _a = prepare(container, bundle), oldValue = _a.oldValue, bundlePath = _a.bundlePath;
        var value = get(container.data, bundlePath);
        if (!_.isArray(value)) {
            throw new Error("Data by path \"" + bundle.path + "\" is not an array but " + typeof (value) + ".");
        }
        _.remove(value, _.matches(bundle.selector));
        var newValue = value;
        return { oldValue: oldValue, newValue: newValue, bundlePath: bundlePath, bundle: bundle, data: container.data };
    },
    arrayFilterAndExtend: function (container, bundle) {
        var _a = prepare(container, bundle), oldValue = _a.oldValue, bundlePath = _a.bundlePath;
        var value = get(container.data, bundlePath);
        if (!_.isArray(value)) {
            throw new Error("Data by path \"" + bundle.path + "\" is not an array but " + typeof (value) + ".");
        }
        _.each(value, function (v) { return _.matches(bundle.selector) ? _.extend(v, bundle.value) : null; });
        var newValue = value;
        return { oldValue: oldValue, newValue: newValue, bundlePath: bundlePath, bundle: bundle, data: container.data };
    },
    arrayFindAndExtend: function (container, bundle) {
        var _a = prepare(container, bundle), oldValue = _a.oldValue, bundlePath = _a.bundlePath;
        var value = get(container.data, bundlePath);
        if (!_.isArray(value)) {
            throw new Error("Data by path \"" + bundle.path + "\" is not an array but " + typeof (value) + ".");
        }
        _.extend(_.find(value, bundle.selector), bundle.value);
        var newValue = value;
        return { oldValue: oldValue, newValue: newValue, bundlePath: bundlePath, bundle: bundle, data: container.data };
    }
};
exports.bundleParsers = bundleParsers;
//# sourceMappingURL=bundle.js.map