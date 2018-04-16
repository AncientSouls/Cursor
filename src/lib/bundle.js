"use strict";
var _ = require('lodash');
/**
 * Try to transform paths to `lodash.get` path form.
 * @example
 * ```typescript
 *
 * import { toPath, TBundlePaths, } from 'ancient-cursor/lib/bundle';
 *
 * const paths:TBundlePaths =  ['a', { b:2 }];
 * const data = { a:[{ b:3, c:4 }, { b:2, c:5 }] };
 *
 * console.log (toPath (data, paths));
 * // a.1
 * ```
 */
function toPath(data, paths) {
    if (typeof (paths) === 'string')
        return paths;
    if (!_.isArray(paths))
        throw new Error('Path must be array TBundlePaths.');
    var pointer = data;
    var result = '';
    _.each(paths, function (p) {
        var path;
        if (_.isString(p) || _.isNumber(p)) {
            path = p;
        }
        else {
            path = '' + _.findIndex(pointer, p);
            if (path === '-1')
                throw new Error("Not founded by selector in path " + paths + ".");
        }
        pointer = getByPath(pointer, path);
        result += result ? '.' + path : path;
    });
    return result;
}
exports.toPath = toPath;
/**
 * Get value by paths in data.
 * @example
 * ```typescript
 *
 * import { get, TBundlePaths, } from 'ancient-cursor/lib/bundle';
 *
 * const paths:TBundlePaths = ['a', { b:2 }, 'c'];
 * const path:TBundlePaths = 'a.1.c';
 * const data = { a:[{ b:3, c:4 }, { b:2, c:5 }] };
 *
 * console.log (get (data, paths));
 * // 5
 * console.log (get (data, path));
 * // 5
 * ```
 */
function get(data, paths) {
    return getByPath(data, toPath(data, paths));
}
exports.get = get;
/**
 * Based on `lodash.get` way to get value by current path in data.
 * @example
 * ```typescript
 *
 * import { getByPath, TBundlePaths, } from 'ancient-cursor/lib/bundle';
 *
 * const path:TBundlePaths =  'a.1.c';
 * const data = { a:[{ b:3, c:4 }, { b:2, c:5 }] };
 *
 * console.log (getByPath (data, path));
 * // 5
 * ```
 */
function getByPath(data, path) {
    return path.length ? _.get(data, path) : data;
}
exports.getByPath = getByPath;
/**
 * Get object with old value in current path.
 * @example
 * ```typescript
 *
 * import { prepare, TBundlePaths, } from 'ancient-cursor/lib/bundle';
 *
 * const path:TBundlePaths =  'a.1.c';
 * const bundle
 * const container = { data: { a:[{ b:3, c:4 }, { b:2, c:5 }] } };
 *
 * console.log (prepare (container, bundle));
 * // {5, 'a.1.c'}
 * ```
 */
function prepare(container, bundle) {
    var bundlePath = _.toPath(toPath(container.data, bundle.path));
    var oldValue = _.clone(get(container.data, bundlePath));
    return { oldValue: oldValue, bundlePath: bundlePath };
}
exports.prepare = prepare;
var bundleParsers = {
    /**
    * Set value by path.
    * @example
    * ```typescript
    *
    * import { bundleParsers, get, TBundlePaths, } from 'ancient-cursor/lib/bundle';
    *
    * const path:TBundlePaths = 'a.0.b.c',
    * const container = { data: { a: [{ b: { c: 123 } }] } };
    *
    * bundleParsers.set (container, { type: 'set', path, value: 234, });
    *
    * console.log (get (container, path));
    * // 234
    * ```
    */
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
    /**
    * Extend data with object by path.
    * @example
    * ```typescript
    *
    * import { bundleParsers, get, TBundlePaths, } from 'ancient-cursor/lib/bundle';
    *
    * const path:TBundlePaths =  'a.0.b';
    * const container = { data: { a: [{ b: { c: 123 } }] } };
    *
    * bundleParsers.extend (container, { type: 'extend', path, value: { d: 234 }, });
    *
    * console.log (get (container, path));
    * // { c: 123, d: 234 }
    * ```
    */
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
    /**
    * Unset data by path.
    * @example
    * ```typescript
    *
    * import { bundleParsers, get, TBundlePaths, } from 'ancient-cursor/lib/bundle';
    *
    * const path:TBundlePaths = 'a.0.b.c';
    * const container = { data: { a: [{ b: { c: 123 } }] } };
    *
    * bundleParsers.unset (container, { type: 'unset', path, });
    *
    * console.log (get (container, 'a.0.b'));
    * // { }
    * ```
    */
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
    /**
    * Incapsulate array of something into array by path in data.
    * @example
    * ```typescript
    *
    * import { bundleParsers, get, TBundlePaths, } from 'ancient-cursor/lib/bundle';
    *
    * const path:TBundlePaths = 'a';
    * const container = { data: { a: [{ b: { c: 123 } }, { b: { c: 456 } }] } };
    *
    * bundleParsers.splice(container, {
    *   type: 'splice',
    *   path,
    *   start: 1,
    *   deleteCount: 0,
    *   values: [
    *     { b: { c: 234 } },
    *     { b: { c: 345 } },
    *   ],
    * });
    *
    * console.log (get (container, path));
    * [
    *   { b: { c: 123 } },
    *   { b: { c: 234 } },
    *   { b: { c: 345 } },
    *   { b: { c: 456 } },
    * ]
    *
    * ```
    */
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
    /**
    * Remove all elements chosen by selector from array by path in data.
    * @example
    * ```typescript
    *
    * import { bundleParsers, get, TBundlePaths, } from 'ancient-cursor/lib/bundle';
    *
    * const path:TBundlePaths = ['x', ['y',2], 'a'];
    * const container = { data: { x: [
    *   { y: 1, a: [{ b: { c: 123 } }, { b: { c: 456 } }] },
    *   { y: 2, a: [{ b: { c: 123 } }, { b: { c: 456 } }] },
    * ] } };
    *
    * bundleParsers.remove(container, {
    *   type: 'remove',
    *   path,
    *   selector: { b: { c: 123 } },
    * });
    *
    * console.log (get (container, path));
    * // { y: 2, a: [{ b: { c: 456 } }] }
    * ```
    */
    remove: function (container, bundle) {
        var _a = prepare(container, bundle), oldValue = _a.oldValue, bundlePath = _a.bundlePath;
        var value = get(container.data, bundlePath);
        if (!_.isArray(value)) {
            throw new Error("Data by path \"" + bundle.path + "\" is not an array but " + typeof (value) + ".");
        }
        _.remove(value, _.matches(bundle.selector));
        var newValue = value;
        return { oldValue: oldValue, newValue: newValue, bundlePath: bundlePath, bundle: bundle, data: container.data };
    },
    /**
    * Push new element to array by path in data.
    * @example
    * ```typescript
    *
    * import { bundleParsers, get, TBundlePaths, } from 'ancient-cursor/lib/bundle';
    *
    * const path:TBundlePaths = ['x', ['y',2], 'a'];
    * const container = { data: { x: [
    *   { y: 1, a: [{ b: { c: 123 } }, { b: { c: 456 } }] },
    *   { y: 2, a: [{ b: { c: 123 } }, { b: { c: 456 } }] },
    * ] } };
    *
    * bundleParsers.push(container, {
    *   type: 'push',
    *   path,
    *   value: [{ d: 567 }],
    * });
    *
    * console.log (get (container, path));
    * // { y: 2, a: [{ b: { c: 123 } }, { b: { c: 456 } }, { d: 567 }] },
    * ```
    */
    push: function (container, bundle) {
        var _a = prepare(container, bundle), oldValue = _a.oldValue, bundlePath = _a.bundlePath;
        var value = get(container.data, bundlePath);
        if (!_.isArray(value)) {
            throw new Error("Data by path \"" + bundle.path + "\" is not an array but " + typeof (value) + ".");
        }
        value.push.apply(value, bundle.value);
        var newValue = value;
        return { oldValue: oldValue, newValue: newValue, bundlePath: bundlePath, bundle: bundle, data: container.data };
    },
    /**
    * Move array element from start to end point by path in data.
    * @example
    * ```typescript
    *
    * import { bundleParsers, get, TBundlePaths, } from 'ancient-cursor/lib/bundle';
    *
    * const path:TBundlePaths = ['x'];
    * const container = { data: { x: [0,1,2,3,4,5,6] } };
    *
    * bundleParsers.push(container, {
    *   type: 'push',
    *   path,
    *   from: 3,
    *   to: 5,
    * });
    *
    * console.log (get (container, path));
    * // [0,1,2,4,5,3,6]
    * ```
    */
    move: function (container, bundle) {
        var _a = prepare(container, bundle), oldValue = _a.oldValue, bundlePath = _a.bundlePath;
        var value = get(container.data, bundlePath);
        if (!_.isArray(value)) {
            throw new Error("Data by path \"" + bundle.path + "\" is not an array but " + typeof (value) + ".");
        }
        value.splice(bundle.to, 0, value.splice(bundle.from, 1)[0]);
        var newValue = value;
        return { oldValue: oldValue, newValue: newValue, bundlePath: bundlePath, bundle: bundle, data: container.data };
    }
};
exports.bundleParsers = bundleParsers;
