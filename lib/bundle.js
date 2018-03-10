"use strict";
exports.__esModule = true;
var _ = require("lodash");
function toPath(data, paths) {
    if (_.isString(paths))
        return paths;
    if (!_.isArray(paths))
        throw new Error('Path must be array TBundlePaths.');
    var pointer = data;
    var result = '';
    _.each(paths, function (p) {
        var path;
        if (_.isString(p)) {
            path = p;
        }
        else {
            path = '' + _.findIndex(pointer, p);
            if (path === '-1')
                throw new Error("Not founded by selector in path " + paths + ".");
        }
        pointer = getByPath(pointer, path);
        result += path ? (result ? '.' + path : path) : '';
    });
    return result;
}
exports.toPath = toPath;
function get(data, paths) {
    return getByPath(data, toPath(data, paths));
}
exports.get = get;
function getByPath(data, path) {
    return path.length ? _.get(data, path) : data;
}
exports.getByPath = getByPath;
function prepare(container, bundle) {
    var bundlePath = _.toPath(toPath(container.data, bundle.path));
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
    splice: function (container, bundle) {
        var _a = prepare(container, bundle), oldValue = _a.oldValue, bundlePath = _a.bundlePath;
        var value = get(container.data, bundlePath);
        if (!_.isArray(value)) {
            throw new Error("Data by path \"" + bundle.path + "\" is not an array but " + typeof (value) + ".");
        }
        value.splice.apply(value, [bundle.start, bundle.deleteCount].concat(bundle.values));
        var newValue = value;
        return { oldValue: oldValue, newValue: newValue, bundlePath: bundlePath, bundle: bundle, data: container.data };
    },
    remove: function (container, bundle) {
        var _a = prepare(container, bundle), oldValue = _a.oldValue, bundlePath = _a.bundlePath;
        var value = get(container.data, bundlePath);
        if (!_.isArray(value)) {
            throw new Error("Data by path \"" + bundle.path + "\" is not an array but " + typeof (value) + ".");
        }
        _.remove(value, _.matches(bundle.selector));
        var newValue = value;
        return { oldValue: oldValue, newValue: newValue, bundlePath: bundlePath, bundle: bundle, data: container.data };
    }
};
exports.bundleParsers = bundleParsers;
//# sourceMappingURL=bundle.js.map