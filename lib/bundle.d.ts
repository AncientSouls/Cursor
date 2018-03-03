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
    (container: {
        data: any;
    }, bundle: IBundle): IBundleChanges;
}
interface IBundleParsers {
    [name: string]: IBundleParser;
}
interface IBundleSet extends IBundle {
    value: any;
}
interface IBundleArraySplice extends IBundle {
    start: number;
    deleteCount: number;
    values: any[];
}
declare function get(data: any, path: any): any;
declare function prepare(container: any, bundle: any): {
    bundlePath: string[];
    oldValue: any;
};
declare const bundleParsers: IBundleParsers;
export { IBundleParser, IBundleParsers, IBundleChanges, IBundle, IBundleSet, IBundleArraySplice, bundleParsers, get, prepare };
