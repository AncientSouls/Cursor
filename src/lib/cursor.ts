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
  get,
} from './bundle';

type TCursor = ICursor<ICursorEventsList>;

interface ICursorEventChangedData {
  data: any;
  oldValue: any;
  newValue: any;
  bundlePath: string[];
  bundle: IBundle;
  watch: ICursorWatch;
  cursor: TCursor;
}

interface ICursorEventExecData {
  cursor: TCursor;
  oldQuery: any;
  oldData: any;
  oldQueryId: string;
}

interface ICursorWatchData {
  data: any;
  oldValue: any;
  newValue: any;
  isClone: boolean;
  bundlePath: string[];
  watchPath: string[];
  localBundlePath: string[];
  localWatchPath: string[];
  bundle: IBundle;
}

interface ICursorWatch {
  (path: string, listener: (data: ICursorWatchData) => void): void;
}

interface ICursorEventListener {
  (data: ICursorEventChangedData): void;
}

interface ICursorEventsList extends INodeEventsList {
  changed: ICursorEventChangedData;
  exec: ICursorEventExecData;
}

interface ICursor<IEventsList extends ICursorEventsList> extends INode<IEventsList> {
  queryId: string;
  query: any;
  data: any;
  exec(query: any, data?: any): this;
  apply(bundle: IBundle): this;
  parse(bundle: IBundle): IBundleChanges; 
  get(path: string): any;
}

function watch(
  { oldValue, newValue, bundlePath, data, bundle }: IBundleChanges,
  path: string,
  listener: (data: ICursorWatchData) => void,
) {
  const watchPath = _.toPath(path);
  const localWatchPath = watchPath.slice(bundlePath.length);
  const localBundlePath = bundlePath.slice(watchPath.length);
  const leastPathLength = Math.min(watchPath.length, bundlePath.length);
  const value = get(data, path);
  let localOldValue;
  let localNewValue;
  let isClone;
  
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
    localOldValue = localNewValue = get(data, path);
    isClone = false;
  }
  
  listener({
    bundlePath, watchPath, localBundlePath, localWatchPath, data, bundle,
    isClone,
    oldValue: localOldValue,
    newValue: localNewValue,
  });
}

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
    watch: (path: string, listener: (data: ICursorWatchData) => void) => {
      watch(bundleChanges, path, listener);
    },
  };
  
  cursor.emit('changed', eventData);
}

function mixin<T extends TClass<IInstance>>(
  superClass: T,
): any {
  return class Cursor extends Node {
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
      if (!bundleParsers[bundle.type])
        throw new Error(`Parser ${bundle.type} is not founded.`);
        
      return bundleParsers[bundle.type](this, bundle);
    }
    
    get(path) {
      return get(this.data, path);
    }
  };
}

const MixedCursor: TClass<ICursor<ICursorEventsList>> = mixin(Node);
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
