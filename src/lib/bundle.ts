import * as _ from 'lodash';

interface IBundle {
  type: string;
  path: TBundlePaths;
  [key: string]: any;
}

interface IBundleChanges {
  /**
  * Old value stored by bundlePath.
  */ 
  oldValue: any;

  /**
  * New value stored by bundlePath.
  */ 
  newValue: any;

  /**
  * Transformed to string[] path, which is located in Bundle.
  */ 
  bundlePath: string[];

  /**
  * Data, changed by bundle.
  */ 
  data: any;

  /**
  * Bundle, which changed data.
  */ 
  bundle: IBundle;
}

interface IBundleParser {
  (container: { data: any }, bundle: IBundle): IBundleChanges;
}

interface IBundleParsers {
  [name: string]: IBundleParser;
}

interface IBundleValue extends IBundle {
  value: any;
}

interface IBundleSelector extends IBundle {
  selector: TBundleSelector;
}

interface IBundleSplice extends IBundle {
  start: number;
  deleteCount: number;
  values: any[];
}

interface IBundleMove extends IBundle {
  from: number;
  to: number;
}

type TBundlePath = string;
type TBundleSelector = any;
type TBundlePathsStep = TBundlePath|TBundleSelector;
type TBundlePaths = string|TBundlePathsStep[];

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
function toPath(data: any, paths: TBundlePaths): TBundlePath {
  if (typeof(paths) === 'string') return paths;
  if (!_.isArray(paths)) throw new Error('Path must be array TBundlePaths.');
  let pointer = data;
  let result = '';
  _.each(paths, (p) => {
    let path;
    if (_.isString(p) || _.isNumber(p)) {
      path = p;
    } else {
      path = '' + _.findIndex(pointer, p);
      if (path === '-1') throw new Error(`Not founded by selector in path ${paths}.`);
    }
    pointer = getByPath(pointer, path);
    result += result ? '.' + path : path;
  });
  return result;
}

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
function get(data: any, paths: TBundlePaths): any {
  return getByPath(data, toPath(data, paths));
}

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
function getByPath(data: any, path: any): any {
  return path.length ? _.get(data, path) : data;
}

/**
 * Get object with old value in current path.
 * @example
 * ```typescript
 * 
 * import { prepare, TBundlePaths, IBundleValue, } from 'ancient-cursor/lib/bundle';
 * 
 * const path:TBundlePaths = 'a.1.c';
 * const bundle:IBundleValue = {
 *   path,
 *   value: 0,
 *   type: 'SomeType',
 * };
 * const container = { data: { a:[{ b:3, c:4 }, { b:2, c:5 }] } };
 * 
 * console.log (prepare (container, bundle));
 * // { oldValue: 5, bundlePath: ['a', '1', 'c']}
 * ```
 */
function prepare(container, bundle): {
  bundlePath: string[],
  oldValue: any,
} {
  const bundlePath = _.toPath(toPath(container.data, bundle.path));
  const oldValue = _.clone(get(container.data, bundlePath));
  return { oldValue, bundlePath };
}

const bundleParsers: IBundleParsers = {
  /**
  * Set value by path.
  * @example
  * ```typescript
  * 
  * import { bundleParsers, get, TBundlePaths, IBundleValue, } from 'ancient-cursor/lib/bundle';
  * 
  * const path:TBundlePaths = 'a.0.b.c';
  * const bundle:IBundleValue = { type: 'set', path, value: 234, };
  * const container = { data: { a: [{ b: { c: 123 } }] } };
  * 
  * bundleParsers.set (container, bundle);
  * 
  * console.log (get (container, path));
  * // 234
  * ```
  */
  set(container, bundle: IBundleValue) {
    const { oldValue, bundlePath } = prepare(container, bundle);
    
    if (!bundlePath.length) {
      container.data = bundle.value;
    } else {
      container.data = _.set(
        container.data || {},
        bundlePath,
        bundle.value,
      );
    }
    
    const newValue = get(container.data, bundlePath);
    
    return { oldValue, newValue, bundlePath, bundle, data: container.data };
  },
  
  /**
  * Extend data with object by path.
  * @example
  * ```typescript
  * 
  * import { bundleParsers, get, TBundlePaths, IBundleValue, } from 'ancient-cursor/lib/bundle';
  * 
  * const path:TBundlePaths = 'a.0.b';
  * const bundle:IBundleValue = { type: 'extend', path, value: { d: 234 };
  * const container = { data: { a: [{ b: { c: 123 } }] } };
  * 
  * bundleParsers.extend (container, bundle, });
  * 
  * console.log (get (container, path));
  * // { c: 123, d: 234 }
  * ```
  */
  extend(container, bundle: IBundleValue) {
    const { oldValue, bundlePath } = prepare(container, bundle);

    if (!bundlePath.length) {
      _.extend(container.data, bundle.value);
    } else {
      _.extend(get(container.data, bundlePath), bundle.value);
    }
    
    const newValue = get(container.data, bundlePath);
    
    return { oldValue, newValue, bundlePath, bundle, data: container.data };
  },

  /**
  * Unset data by path.
  * @example
  * ```typescript
  * 
  * import { bundleParsers, get, TBundlePaths, IBundleValue, } from 'ancient-cursor/lib/bundle';
  * 
  * const path:TBundlePaths = 'a.0.b.c';
  * const bundle:IBundleValue = { type: 'unset', path, };
  * const container = { data: { a: [{ b: { c: 123 } }] } };
  * 
  * bundleParsers.unset (container, bundle);
  * 
  * console.log (get (container, 'a.0.b'));
  * // { }
  * ```
  */
  unset(container, bundle: IBundle) {
    const { oldValue, bundlePath } = prepare(container, bundle);
    
    if (!bundlePath.length) {
      container.data = undefined;
    } else {
      const parent = get(
        container.data,
        bundlePath.slice(0, bundlePath.length - 1),
      );
      
      delete parent[bundlePath[bundlePath.length - 1]];
    }
    
    const newValue = get(container.data, bundlePath);
    
    return { oldValue, newValue, bundlePath, bundle, data: container.data };
  },

  /**
  * Incapsulate array of something into array by path in data.
  * @example
  * ```typescript
  * 
  * import { bundleParsers, get, TBundlePaths, IBundleValue, } from 'ancient-cursor/lib/bundle';
  * 
  * const path:TBundlePaths = 'a';
  * const bundle:IBundleValue = {
  *   type: 'splice',
  *   path,
  *   start: 1,
  *   deleteCount: 0,
  *   values: [
  *     { b: { c: 234 } },
  *     { b: { c: 345 } },
  *   ],
  * };
  * const container = { data: { a: [{ b: { c: 123 } }] } };
  * 
  * bundleParsers.splice(container, bundle);
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
  splice(container, bundle: IBundleSplice) {
    const { oldValue, bundlePath } = prepare(container, bundle);
    const value = get(container.data, bundlePath);
    
    if (!_.isArray(value)) {
      throw new Error(`Data by path "${bundle.path}" is not an array but ${typeof(value)}.`);
    }
    
    value.splice(bundle.start, bundle.deleteCount, ...bundle.values);
    
    const newValue = value;
    
    return { oldValue, newValue, bundlePath, bundle, data: container.data };
  },

  /**
  * Remove all elements chosen by selector from array by path in data.
  * @example
  * ```typescript
  * 
  * import { bundleParsers, get, TBundlePaths, IBundleValue, } from 'ancient-cursor/lib/bundle';
  * 
  * const path:TBundlePaths = ['x', ['y',2], 'a'];
  * const bundle:IBundleValue = {
  *   type: 'remove',
  *   path,
  *   selector: { b: { c: 123 } },
  * };
  * const container = { data: { x: [
  *   { y: 1, a: [{ b: { c: 123 } }, { b: { c: 456 } }] },
  *   { y: 2, a: [{ b: { c: 123 } }, { b: { c: 456 } }] },
  * ] } };
  * 
  * bundleParsers.remove(container, bundle);
  * 
  * console.log (get (container, path));
  * // { y: 2, a: [{ b: { c: 456 } }] }
  * ```
  */
  remove(container, bundle: IBundle) {
    const { oldValue, bundlePath } = prepare(container, bundle);
    const value = get(container.data, bundlePath);
    
    if (!_.isArray(value)) {
      throw new Error(`Data by path "${bundle.path}" is not an array but ${typeof(value)}.`);
    }
    
    _.remove(value, _.matches(bundle.selector));
    
    const newValue = value;
    
    return { oldValue, newValue, bundlePath, bundle, data: container.data };
  },

  /**
  * Push new element to array by path in data.
  * @example
  * ```typescript
  * 
  * import { bundleParsers, get, TBundlePaths, IBundleValue, } from 'ancient-cursor/lib/bundle';
  * 
  * const path:TBundlePaths = ['x', ['y',2], 'a'];
  * const bundle:IBundleValue = {
  *   type: 'push',
  *   path,
  *   value: [{ d: 567 }],
  * };
  * const container = { data: { x: [
  *   { y: 1, a: [{ b: { c: 123 } }, { b: { c: 456 } }] },
  *   { y: 2, a: [{ b: { c: 123 } }, { b: { c: 456 } }] },
  * ] } };
  * 
  * bundleParsers.push(container, bundle);
  * 
  * console.log (get (container, path));
  * // { y: 2, a: [{ b: { c: 123 } }, { b: { c: 456 } }, { d: 567 }] },
  * ```
  */
  push(container, bundle: IBundleValue) {
    const { oldValue, bundlePath } = prepare(container, bundle);
    const value = get(container.data, bundlePath);
    
    if (!_.isArray(value)) {
      throw new Error(`Data by path "${bundle.path}" is not an array but ${typeof(value)}.`);
    }
    
    value.push(...bundle.value);
    
    const newValue = value;
    
    return { oldValue, newValue, bundlePath, bundle, data: container.data };
  },
  
  /**
  * Move array element from start to end point by path in data.
  * @example
  * ```typescript
  * 
  * import { bundleParsers, get, TBundlePaths, IBundleValue, } from 'ancient-cursor/lib/bundle';
  * 
  * const path:TBundlePaths = ['x'];
  * const bundle:IBundleValue = {
  *   type: 'move',
  *   path,
  *   from: 3,
  *   to: 5,
  * }
  * const container = { data: { x: [0,1,2,3,4,5,6] } };
  * 
  * bundleParsers.push(container, bundle);
  * 
  * console.log (get (container, path));
  * // [0,1,2,4,5,3,6] 
  * ```
  */
  move(container, bundle: IBundleMove) {
    const { oldValue, bundlePath } = prepare(container, bundle);
    const value = get(container.data, bundlePath);
    
    if (!_.isArray(value)) {
      throw new Error(`Data by path "${bundle.path}" is not an array but ${typeof(value)}.`);
    }
    
    value.splice(bundle.to, 0, value.splice(bundle.from, 1)[0]);
    
    const newValue = value;
    
    return { oldValue, newValue, bundlePath, bundle, data: container.data };
  },
};

export {
  IBundleParser,
  IBundleParsers,
  IBundleChanges,
  IBundle,
  IBundleValue,
  TBundlePath,
  TBundleSelector,
  TBundlePathsStep,
  TBundlePaths,
  bundleParsers,
  get,
  getByPath,
  toPath,
  prepare,
};
