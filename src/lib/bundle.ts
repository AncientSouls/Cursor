import * as lodash from 'lodash';

interface IBundle {
  type: string;
  path: string;
  [key: string]: any;
}

interface IBundleChanges {
  oldValue: any;
  newValue: any;
  bundlePath: string[];
  data: any;
  bundle: IBundle;
}

interface IBundleParser {
  (container: { data: any }, bundle: IBundle): IBundleChanges;
}

interface IBundleParsers {
  [name: string]: IBundleParser;
}

interface IBundleSet extends IBundle {
  value: any;
}

interface IBundleUnset extends IBundle {}

interface IBundleArraySplice extends IBundle {
  start: number;
  deleteCount: number;
  values: any[];
}

function get(data: any, path: any): any {
  const arrayPath = lodash.toPath(path);
  return path.length ? lodash.get(data, path) : data;
}

function prepare(container, bundle): {
  bundlePath: string[],
  oldValue: any,
} {
  const bundlePath = lodash.toPath(bundle.path);
  const oldValue = get(container.data, bundlePath);
  
  return { oldValue, bundlePath };
}

const bundleParsers: IBundleParsers = {
  set(container, bundle: IBundleSet) {
    const { oldValue, bundlePath } = prepare(container, bundle);
    
    if (!bundlePath.length) container.data = bundle.value;
    else container.data = lodash.set(
      container.data || {},
      bundlePath,
      bundle.value,
    );
    
    const newValue = get(container.data, bundlePath);
    
    return { oldValue, newValue, bundlePath, bundle, data: container.data };
  },
  unset(container, bundle: IBundleUnset) {
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
  arraySplice(container, bundle: IBundleArraySplice) {
    const { oldValue, bundlePath } = prepare(container, bundle);
    const value = get(container.data, bundlePath);
    
    if (!lodash.isArray(value)) {
      throw new Error(`Data by path "${bundle.path}" is not an array but ${typeof(value)}.`);
    }
    
    value.splice(bundle.start, bundle.deleteCount, ...bundle.values);
    
    const newValue = value;
    
    return { oldValue, newValue, bundlePath, bundle, data: container.data };
  },
};

export {
  IBundleParser,
  IBundleParsers,
  IBundleChanges,
  IBundle,
  IBundleSet,
  IBundleArraySplice,
  bundleParsers,
  get,
  prepare,
};
