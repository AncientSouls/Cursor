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
  IBundle,
  bundleParsers,
  IBundleChanges,
  TBundlePaths,
  toPath,
  get,
} from './bundle';

type TCursor = ICursor<ICursorEventsList>;

interface ICursorEventChangedData {
  /**
   * Data of cursor.
   */
  data: any;
  /**
   * Value before changes by bundlePath.
   */
  oldValue: any;
  /**
   * Value after changes by bundlePath.
   */
  newValue: any;
  /**
   * Path to changes.
   */
  bundlePath: string[];
  /**
   * Bundle, applied by cursor.
   */
  bundle: IBundle;
  /**
   * Function returns void.
   */
  watch: ICursorWatch;
  /**
   * Cursor, triggered event.
   */
  cursor: TCursor;
}

interface ICursorEventExecData {
  /**
   * Cursor, triggered event.
   */
  cursor: TCursor;

  /**
   * `Query` before exec.
   */
  oldQuery: any;

  /**
   * `Data` before exec.
   */
  oldData: any;

  /**
   * `QueryId` before exec.
   */
  oldQueryId: string;
}

interface ICursorWatchData {
  /**
   * Actual state of all data from this cursor.
   */
  data: any;

  /**
   * `oldValue` from bundleChanges
   */
  oldValue: any;
  
  /**
   * `newValue` from bundleChanges
   */
  newValue: any;
  
  /**
   * Depricated
   */
  isClone: boolean;
  
  /**
   * Path in data for changing 
   */
  bundlePath: string[];
  
  /**
   * Path in data for checking
   */
  watchPath: string[];
  
  /**
   * Endpoint of `bundlePath`.
   */
  localBundlePath: string[];
  
  /**
   * Endpoint of `watchPath`.
   */
  localWatchPath: string[];
  
  /**
   * Bundle, applied to data.
   */
  bundle: IBundle;
}

interface ICursorWatch {
  (path: TBundlePaths, listener: (data: ICursorWatchData) => void): void;
}

interface ICursorEventListener {
  (data: ICursorEventChangedData): void;
}

interface ICursorEventsList extends INodeEventsList {
  /**
   * Event, emitting at every `cursor.apply()`. 
   */
  changed: ICursorEventChangedData;

  /**
   * Event, emitting when called `cursor.exec()`. 
   */
  exec: ICursorEventExecData;
}

interface ICursor<IEventsList extends ICursorEventsList> extends INode<IEventsList> {
  /**
   * Unic id, generating in `cursor.exec()`. 
   */
  queryId: string;

  /**
   * Abstract query for some source, which makes the source be able to send bundles to this cursor.
   */
  query: any;
  
  /**
   * Data executed by `cursor.exec()`.
   */
  data: any;
  
  /**
   * Initiate `query` execution for some source and set `data` for this cursor.
   */
  exec(query: any, data?: any): this;
  
  /**
   * Call `cursor.parse(bundle)`and emit 'Changed' event.
   */
  apply(bundle: IBundle): this;
  
  /**
   * Get bundleChanges with `cursor.data` using bundle.
   */
  parse(bundle: IBundle): IBundleChanges;
  
  /**
   * Bundle function to get part of data by path. 
   */
  get(paths: TBundlePaths): any;
}

/**
 * Listen changes in `cursor.data` for current path.
 * @example
 * ```typescript
 * 
 * import { Cursor, watch } from 'ancient-cursor/lib/cursor';
 * import { Node } from 'ancient-mixins/lib/node';
 * import { TClass } from 'ancient-mixins/lib/mixins';
 * 
 * const cursor = new Cursor(); 
 * cursor.exec(true, { a: [{ b: { c: 'd' } }, { e: { f: 'g' } }] });
 * 
 * cursor.on('changed', ({ watch }) => {
 *   watch('a.1', ({ isClone, oldValue, newValue }) => {
 *     console.log('Watch!');
 *   });
 * });
 * 
 * cursor.apply({
 *   type: 'set',
 *   path: 'a.0',
 *   value: { d: 1 },
 * });
 * // Logs nothing
 * 
 * cursor.apply({
 *   type: 'set',
 *   path: 'a.1',
 *   value: { d: 2 },
 * });
 * // Watch!
 * ```
 */
function watch(
  { oldValue, newValue, bundlePath, data, bundle }: IBundleChanges,
  paths: TBundlePaths,
  listener: (data: ICursorWatchData) => void,
) {
  const watchPath = _.toPath(toPath(data, paths));
  const localWatchPath = watchPath.slice(bundlePath.length);
  const localBundlePath = bundlePath.slice(watchPath.length);
  const leastPathLength = Math.min(watchPath.length, bundlePath.length);
  const value = get(data, paths);
  let localOldValue;
  let localNewValue;
  let isClone;
  
  // Verify inclusion watchPath into part of data, changed by bundle.
  if (leastPathLength) {
    if (!_.isEqual(watchPath.slice(0, leastPathLength), bundlePath.slice(0, leastPathLength))) {
      return;
    }
  }
  
  if (bundlePath.length <= watchPath.length) {
    localOldValue = get(oldValue, localWatchPath);
    localNewValue = value;
    isClone = true;
  } else {
    localOldValue = localNewValue = get(data, paths);
    isClone = false;
  }
  
  listener({
    bundlePath, watchPath, localBundlePath, localWatchPath, data, bundle,
    isClone,
    oldValue: localOldValue,
    newValue: localNewValue,
  });
}

/**
 * Apply bundle to cursor and emit 'changed' event.
 * @example
 * ```typescript
 * 
 * import { Cursor } from 'ancient-cursor/lib/cursor';
 * import { Node } from 'ancient-mixins/lib/node';
 * import { TClass } from 'ancient-mixins/lib/mixins';
 * 
 * const cursor = new Cursor(); 
 * cursor.exec(true, { a: [{ b: { c: 'd' } }] });
 * 
 * cursor.apply({
 *   type: 'set',
 *   path: 'a.0',
 *   value: { d: { e: 'f' } },
 * });
 * 
 * console.log(cursor.get (['a', '0']));
 * // { d: { e: 'f' } }
 * ```
 */
function apply(cursor, bundle) {
  const bundleChanges = cursor.parse(bundle);
  const { oldValue, newValue, bundlePath, data } = bundleChanges;
  
  const eventData: ICursorEventChangedData = {
    data,
    oldValue,
    newValue,
    bundlePath,
    bundle,
    cursor,
    watch: (path: TBundlePaths, listener: (data: ICursorWatchData) => void) => {
      watch(bundleChanges, path, listener);
    },
  };
  
  cursor.emit('changed', eventData);
}

/**
 * Mixin your class with Cursor functionality.
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
function mixin<T extends TClass<IInstance>>(
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

const MixedCursor: TClass<ICursor<ICursorEventsList>> = mixin(Node);
/**
 * Already mixed class. Plug and play.
 */
class Cursor extends MixedCursor {}

export {
  mixin as default,
  mixin,
  MixedCursor,
  Cursor,
  ICursor,
  ICursorEventChangedData,
  ICursorEventExecData,
  ICursorWatchData,
  ICursorWatch,
  ICursorEventListener,
  ICursorEventsList,
  watch,
  TCursor,
};
