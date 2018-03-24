"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
function toPath(data, paths) {
    if (typeof (paths) === 'string')
        return paths;
    if (!_.isArray(paths))
        throw new Error('Path must be array TBundlePaths.');
    let pointer = data;
    let result = '';
    _.each(paths, (p) => {
        let path;
        if (_.isString(p) || _.isNumber(p)) {
            path = p;
        }
        else {
            path = '' + _.findIndex(pointer, p);
            if (path === '-1')
                throw new Error(`Not founded by selector in path ${paths}.`);
        }
        pointer = getByPath(pointer, path);
        result += result ? '.' + path : path;
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
    const bundlePath = _.toPath(toPath(container.data, bundle.path));
    const oldValue = _.clone(get(container.data, bundlePath));
    return { oldValue, bundlePath };
}
exports.prepare = prepare;
const bundleParsers = {
    set(container, bundle) {
        const { oldValue, bundlePath } = prepare(container, bundle);
        if (!bundlePath.length) {
            container.data = bundle.value;
        }
        else {
            container.data = _.set(container.data || {}, bundlePath, bundle.value);
        }
        const newValue = get(container.data, bundlePath);
        return { oldValue, newValue, bundlePath, bundle, data: container.data };
    },
    extend(container, bundle) {
        const { oldValue, bundlePath } = prepare(container, bundle);
        if (!bundlePath.length) {
            _.extend(container.data, bundle.value);
        }
        else {
            _.extend(get(container.data, bundlePath), bundle.value);
        }
        const newValue = get(container.data, bundlePath);
        return { oldValue, newValue, bundlePath, bundle, data: container.data };
    },
    unset(container, bundle) {
        const { oldValue, bundlePath } = prepare(container, bundle);
        if (!bundlePath.length) {
            container.data = undefined;
        }
        else {
            const parent = get(container.data, bundlePath.slice(0, bundlePath.length - 1));
            delete parent[bundlePath[bundlePath.length - 1]];
        }
        const newValue = get(container.data, bundlePath);
        return { oldValue, newValue, bundlePath, bundle, data: container.data };
    },
    splice(container, bundle) {
        const { oldValue, bundlePath } = prepare(container, bundle);
        const value = get(container.data, bundlePath);
        if (!_.isArray(value)) {
            throw new Error(`Data by path "${bundle.path}" is not an array but ${typeof (value)}.`);
        }
        value.splice(bundle.start, bundle.deleteCount, ...bundle.values);
        const newValue = value;
        return { oldValue, newValue, bundlePath, bundle, data: container.data };
    },
    remove(container, bundle) {
        const { oldValue, bundlePath } = prepare(container, bundle);
        const value = get(container.data, bundlePath);
        if (!_.isArray(value)) {
            throw new Error(`Data by path "${bundle.path}" is not an array but ${typeof (value)}.`);
        }
        _.remove(value, _.matches(bundle.selector));
        const newValue = value;
        return { oldValue, newValue, bundlePath, bundle, data: container.data };
    },
    push(container, bundle) {
        const { oldValue, bundlePath } = prepare(container, bundle);
        const value = get(container.data, bundlePath);
        if (!_.isArray(value)) {
            throw new Error(`Data by path "${bundle.path}" is not an array but ${typeof (value)}.`);
        }
        value.push(...bundle.value);
        const newValue = value;
        return { oldValue, newValue, bundlePath, bundle, data: container.data };
    },
    move(container, bundle) {
        const { oldValue, bundlePath } = prepare(container, bundle);
        const value = get(container.data, bundlePath);
        if (!_.isArray(value)) {
            throw new Error(`Data by path "${bundle.path}" is not an array but ${typeof (value)}.`);
        }
        value.splice(bundle.to, 0, value.splice(bundle.from, 1)[0]);
        const newValue = value;
        return { oldValue, newValue, bundlePath, bundle, data: container.data };
    },
};
exports.bundleParsers = bundleParsers;
//# sourceMappingURL=bundle.js.map