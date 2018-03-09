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
interface IBundleValue extends IBundle {
    value: any;
}
interface IBundleUnset extends IBundle {
}
interface IBundleArraySplice extends IBundle {
    start: number;
    deleteCount: number;
    values: any[];
}
interface IBundleArrayRemove extends IBundle {
    selector: object;
}
interface IBundleArrayExtend extends IBundleValue {
    selector: object;
}
declare function get(data: any, path: any): any;
declare function prepare(container: any, bundle: any): {
    bundlePath: string[];
    oldValue: any;
};
declare const bundleParsers: IBundleParsers;
export { IBundleParser, IBundleParsers, IBundleChanges, IBundle, IBundleValue, IBundleUnset, IBundleArraySplice, IBundleArrayRemove, IBundleArrayExtend, bundleParsers, get, prepare };
