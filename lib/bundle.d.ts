export interface IBundle {
    type: string;
    path: TBundlePaths;
    [key: string]: any;
}
export interface IBundleChanges {
    newValue: any;
    bundlePath: string[];
    data: any;
    bundle: IBundle;
}
export interface IBundleParser {
    (container: {
        data: any;
    }, bundle: IBundle): IBundleChanges;
}
export interface IBundleParsers {
    [name: string]: IBundleParser;
}
export interface IBundleValue extends IBundle {
    value: any;
}
export interface IBundleSelector extends IBundle {
    selector: TBundleSelector;
}
export interface IBundleSplice extends IBundle {
    start: number;
    deleteCount: number;
    values: any[];
}
export interface IBundleMove extends IBundle {
    from: number;
    to: number;
}
export declare type TBundlePath = string;
export declare type TBundleSelector = any;
export declare type TBundlePathsStep = TBundlePath | TBundleSelector;
export declare type TBundlePaths = string | TBundlePathsStep[];
export declare function toPath(data: any, paths: TBundlePaths): TBundlePath;
export declare function get(data: any, paths: TBundlePaths): any;
export declare function getByPath(data: any, path: any): any;
export declare function prepare(container: any, bundle: any): {
    bundlePath: string[];
};
export declare const bundleParsers: IBundleParsers;
