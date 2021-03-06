import * as _ from 'lodash';

import {
  TClass,
  IInstance,
} from 'ancient-mixins/lib/mixins';

import {
  Node,
  INode,
  INodeEventsList,
} from 'ancient-mixins/lib/node';

import {
  TManager,
} from 'ancient-mixins/lib/manager';

import {
  IBundle,
  bundleParsers,
  IBundleChanges,
  TBundlePaths,
  toPath,
  get,
} from './bundle';

export type TCursor = ICursor<ICursorEventsList>;

export interface ICursorEventChangedData {
  /**
   * Data of cursor.
   */
  data: any;
  /**
   * Value in data after changes by `bundlePath`.
   */
  newValue: any;
  /**
   * Path to data, changed by bundle in `cursor.data`.
   */
  bundlePath: string[];
  /**
   * Bundle, applied to cursor.
   */
  bundle: IBundle;

  bundleChanges: IBundleChanges;
  /**
   * Current cursor.
   */
  cursor: TCursor;
}

export interface ICursorEventExecData {
  /**
   * Current cursor.
   */
  cursor: TCursor;

  /**
   * `cursor.query` before exec.
   */
  oldQuery: any;

  /**
   * `cursor.data` before exec.
   */
  oldData: any;

  /**
   * `cursor.queryId` before exec.
   */
  oldQueryId: string;
}

export interface ICursorWatchData {
  /**
   * Actual state of all data from this cursor.
   */
  data: any;
  
  /**
   * `newValue` from bundleChanges
   */
  newValue: any;
  
  /**
   * Path to data, changed by bundle in `cursor.data`.
   */
  bundlePath: string[];
  
  /**
   * Path to data, specified in `watch()`.
   */
  watchPath: string[];

  localBundlePath: string[];
  localWatchPath: string[];
  
  /**
   * Bundle, applied to data.
   */
  bundle: IBundle;
}

export interface ICursorWatch {
  (path: TBundlePaths, listener: (data: ICursorWatchData) => void): void;
}

export interface ICursorEventListener {
  (data: ICursorEventChangedData): void;
}

export interface ICursorEventsList extends INodeEventsList {
  /**
   * Event, emitting at every `cursor.apply()`. 
   */
  changed: ICursorEventChangedData;

  /**
   * Event, emitting when called `cursor.exec()`. 
   */
  exec: ICursorEventExecData;
}

export interface ICursor<IEventsList extends ICursorEventsList> extends INode<IEventsList> {
  /**
   * Unic id for every execution of query.
   */
  queryId: string;

  /**
   * Abstract query for some source, which makes the source be able to send bundles to this cursor.
   */
  query: any;
  
  /**
   * Data of cursor, changing at every `cursor.apply()`
   */
  data: any;

  /**
   * Initiate `query` execution for some source and set `data` for this cursor.
   * @example
   * ```typescript
   * 
   * import { Cursor } from 'ancient-cursor/lib/cursor';
   * 
   * const cursor = new Cursor(); 
   * 
   * cursor.exec(true, { a: [{ b: { c: 'd' } }] });
   * 
   * cursor.data; // { a: [{ d: { e: 'f' } }] }
   * cursor.query; // true
   * cursor.queryId; // some generated id
   * ```
   */
  exec(query: any, data?: any): this;
  

  /**
   * Apply bundle to cursor and emit 'changed' event.
   * @example
   * ```typescript
   * 
   * import { Cursor } from 'ancient-cursor/lib/cursor';
   * 
   * const cursor = new Cursor(); 
   * cursor.exec(true, { a: [{ b: { c: 'd' } }] });
   * 
   * cursor.data; // { a: [{ b: { c: 'd' } }] }
   * 
   * cursor.apply({
   *   type: 'set',
   *   path: 'a.0',
   *   value: { d: { e: 'f' } },
   * });
   * 
   * cursor.data; // { a: [{ d: { e: 'f' } }] }
   * ```
   */
  apply(bundle: IBundle): this;
  
  /**
   * Unsafe. Can be used for parsing bundles.
   */
  parse(bundle: IBundle): IBundleChanges;
  
  /**
   * Get data by path from cursor.
   * @example
   * ```typescript
   * import { Cursor } from 'ancient-cursor/lib/cursor';
   * 
   * const cursor = new Cursor();
   * cursor.exec(true, { a: [ { x: 2, b: 123 } ] });
   * 
   * cursor.data; // { a: [ { x: 2, b: 123 } ] }
   * 
   * cursor.get("a.0[b]"); // 123
   * cursor.get(['a',0,'b']); // 123
   * cursor.get(['a',{ x: 2 },'b']); // 123
   * 
   * ```
   */
  get(paths: TBundlePaths): any;
}

/**
 * Listen changes in `cursor.data` for current path.
 * @example
 * ```typescript
 * 
 * import { Cursor, watch } from 'ancient-cursor/lib/cursor';
 * 
 * const cursor = new Cursor(); 
 * cursor.exec(true, { a: [{ b: { c: 'd' } }, { e: { f: 'g' } }] });
 * 
 * cursor.on('changed', ({ bundleChanges }) => {
 *   watch(bundleChanges, 'a.1', ({ newValue }) => {
 *     console.log('Watch!');
 *   });
 * });
 * 
 * cursor.apply({
 *   type: 'set',
 *   path: 'a.0',
 *   value: { d: 1 },
 * }); // Logs nothing
 * 
 * cursor.apply({
 *   type: 'set',
 *   path: 'a.1',
 *   value: { d: 2 },
 * }); // Watch!
 * ```
 */
export function watch(
  { newValue, bundlePath, data, bundle }: IBundleChanges,
  paths: TBundlePaths,
  listener: (data: ICursorWatchData) => void,
) {
  const watchPath = _.toPath(toPath(data, paths));
  const localWatchPath = watchPath.slice(bundlePath.length);
  const localBundlePath = bundlePath.slice(watchPath.length);
  const leastPathLength = Math.min(watchPath.length, bundlePath.length);
  const value = get(data, paths);
  let localNewValue;
  
  // Verify inclusion watchPath into part of data, changed by bundle.
  if (leastPathLength) {
    if (!_.isEqual(watchPath.slice(0, leastPathLength), bundlePath.slice(0, leastPathLength))) {
      return;
    }
  }
  
  if (bundlePath.length <= watchPath.length) {
    localNewValue = value;
  } else {
    localNewValue = get(data, paths);
  }
  
  listener({
    bundlePath, watchPath, localBundlePath, localWatchPath, data, bundle,
    newValue: localNewValue,
  });
}

/**
 * Apply bundle to cursor and emit 'changed' event.
 * @example
 * ```typescript
 * 
 * import { Cursor, apply } from 'ancient-cursor/lib/cursor';
 * 
 * const cursor = new Cursor(); 
 * cursor.exec(true, { a: [{ b: { c: 'd' } }] });
 * 
 * cursor.data; // { a: [{ b: { c: 'd' } }] }
 * 
 * apply( cursor, {
 *   type: 'set',
 *   path: 'a.0',
 *   value: { d: { e: 'f' } },
 * });
 * 
 * cursor.data; // { a: [{ d: { e: 'f' } }] }
 * ```
 */
export function apply(cursor, bundle) {
  const bundleChanges = cursor.parse(bundle);
  const { newValue, bundlePath, data } = bundleChanges;
  
  const eventData: ICursorEventChangedData = {
    data,
    newValue,
    bundlePath,
    bundle,
    bundleChanges,
    cursor,
  };
  
  cursor.emit('changed', eventData);
}

/**
 * Mixin your Node with Cursor functionality.
 * @example
 * ```typescript
 * 
 * import { mixin, ICursorEventsList, ICursor } from 'ancient-cursor/lib/cursor';
 * import { Node } from 'ancient-mixins/lib/node';
 * import { TClass } from 'ancient-mixins/lib/mixins';
 * 
 * const MixedCursor: TClass<ICursor<ICursorEventsList>> = mixin(Node);
 * ```
 */
export function mixin<T extends TClass<IInstance>>(
  superClass: T,
): any {
  return class Cursor extends superClass {
    public queryId;
    public query;
    public data;
    
    exec(
      query,
      data,
    ) {
      const oldQuery = this.query;
      const oldData = this.data;
      const oldQueryId = this.queryId;
      this.query = query;
      if (data) apply(this, { type: 'set', path: '', value: data });
      this.queryId = this.generateId();
      this.emit('exec', { oldQuery, oldData, oldQueryId, cursor: this });
      
      return this;
    }
    
    apply(bundle) {
      apply(this, bundle);
      return this;
    }
    
    parse(bundle) {
      if (!bundleParsers[bundle.type]) {
        throw new Error(`Parser ${bundle.type} is not founded.`);
      }
        
      return bundleParsers[bundle.type](this, bundle);
    }
    
    get(paths) {
      return get(this.data, paths);
    }
  };
}

export const MixedCursor: TClass<ICursor<ICursorEventsList>> = mixin(Node);
/**
 * Already mixed class. Plug and play.
 */
export class Cursor extends MixedCursor {}

/**
 * Spray maintining data by path to many cursors in manager`s list.
 * @example
 * ```typescript
 * 
 * import { Cursor, spray } from 'ancient-cursor/lib/cursor';
 * import { Manager } from 'ancient-mixins/lib/manager';
 * 
 * const path = 'x.y';
 * const _path = path ? `${path}.` : path;
 * const parent = new Cursor();
 * const sprayed = new Manager();
 * 
 * parent.on('changed', spray(path, sprayed));
 * 
 * parent.apply({
 *   type: 'set',
 *   path: `${path}`,
 *   value: {
 *     a: { a: 1 },
 *     b: { b: 2 },
 *     c: { c: 3 },
 *   },
 * });
 * 
 * parent.get (`${_path}a`) = sprayed.list.nodes.a.data; // true
 * parent.get (`${_path}b`) = sprayed.list.nodes.b.data; // true
 * parent.get (`${_path}c`) = sprayed.list.nodes.c.data; // true
 *```
 */
export function spray(path: TBundlePaths, manager: TManager, cursor: TClass<TCursor> = Cursor): ((data: ICursorEventChangedData) => void) {
  return (({ bundlePath, bundleChanges }) => {
    watch(bundleChanges, path, ({
      newValue, bundlePath, watchPath, localBundlePath, localWatchPath,
    }) => {
      if (localBundlePath.length) {
        const id = localBundlePath[0];
        const childData = get(newValue, id);
        if (childData) {
          if (!manager.list.nodes[id]) manager.add(new cursor(id));
          manager.list.nodes[id].exec(null, childData);
        } else {
          if (manager.list.nodes[id]) manager.list.nodes[id].destroy();
        }
      } else {
        _.each(manager.list.nodes, (childCursor, id) => {
          const childData = get(newValue, id);
          if (!childData) childCursor.destroy();
          else childCursor.exec(null, childData);
        });
        _.each(newValue, (childData, id) => {
          if (!manager.list.nodes[id]) manager.add(new cursor(id));
          manager.list.nodes[id].exec(null, get(newValue, id));
        });
      }
    });
  });
}
