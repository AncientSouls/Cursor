import * as _ from 'lodash';

interface IBundle {
  type: string;
  path: TBundlePaths;
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

function get(data: any, paths: TBundlePaths): any {
  return getByPath(data, toPath(data, paths));
}

function getByPath(data: any, path: any): any {
  return path.length ? _.get(data, path) : data;
}

function prepare(container, bundle): {
  bundlePath: string[],
  oldValue: any,
} {
  const bundlePath = _.toPath(toPath(container.data, bundle.path));
  const oldValue = _.clone(get(container.data, bundlePath));
  return { oldValue, bundlePath };
}

const bundleParsers: IBundleParsers = {
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
