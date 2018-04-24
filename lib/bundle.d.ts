interface IBundle {
    type: string;
    path: TBundlePaths;
    [key: string]: any;
}
interface IBundleChanges {
    newValue: any;
    bundlePath: string[];
    data: any;
    bundle: IBundle;
}
interface IBundleParser {
    (container: {
        data: any;
    }, bundle: IBundle): IBundleChanges;
}
interface IBundleParsers {
    [name: string]: IBundleParser;
}
interface IBundleValue extends IBundle {
    value: any;
}
declare type TBundlePath = string;
declare type TBundleSelector = any;
declare type TBundlePathsStep = TBundlePath | TBundleSelector;
declare type TBundlePaths = string | TBundlePathsStep[];
declare function toPath(data: any, paths: TBundlePaths): TBundlePath;
declare function get(data: any, paths: TBundlePaths): any;
declare function getByPath(data: any, path: any): any;
declare function prepare(container: any, bundle: any): {
    bundlePath: string[];
};
declare const bundleParsers: IBundleParsers;
export { IBundleParser, IBundleParsers, IBundleChanges, IBundle, IBundleValue, TBundlePath, TBundleSelector, TBundlePathsStep, TBundlePaths, bundleParsers, get, getByPath, toPath, prepare };
