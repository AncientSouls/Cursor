import { TClass, IInstance } from 'ancient-mixins/lib/mixins';
import { INode, INodeEventsList } from 'ancient-mixins/lib/node';
import { TManager } from 'ancient-mixins/lib/manager';
import { IBundle, IBundleChanges, TBundlePaths } from './bundle';
export declare type TCursor = ICursor<ICursorEventsList>;
export interface ICursorEventChangedData {
    data: any;
    newValue: any;
    bundlePath: string[];
    bundle: IBundle;
    bundleChanges: IBundleChanges;
    cursor: TCursor;
}
export interface ICursorEventExecData {
    cursor: TCursor;
    oldQuery: any;
    oldData: any;
    oldQueryId: string;
}
export interface ICursorWatchData {
    data: any;
    newValue: any;
    bundlePath: string[];
    watchPath: string[];
    localBundlePath: string[];
    localWatchPath: string[];
    bundle: IBundle;
}
export interface ICursorWatch {
    (path: TBundlePaths, listener: (data: ICursorWatchData) => void): void;
}
export interface ICursorEventListener {
    (data: ICursorEventChangedData): void;
}
export interface ICursorEventsList extends INodeEventsList {
    changed: ICursorEventChangedData;
    exec: ICursorEventExecData;
}
export interface ICursor<IEventsList extends ICursorEventsList> extends INode<IEventsList> {
    queryId: string;
    query: any;
    data: any;
    exec(query: any, data?: any): this;
    apply(bundle: IBundle): this;
    parse(bundle: IBundle): IBundleChanges;
    get(paths: TBundlePaths): any;
}
export declare function watch({newValue, bundlePath, data, bundle}: IBundleChanges, paths: TBundlePaths, listener: (data: ICursorWatchData) => void): void;
export declare function apply(cursor: any, bundle: any): void;
export declare function mixin<T extends TClass<IInstance>>(superClass: T): any;
export declare const MixedCursor: TClass<ICursor<ICursorEventsList>>;
export declare class Cursor extends MixedCursor {
}
export declare function spray(path: TBundlePaths, manager: TManager, cursor?: TClass<TCursor>): ((data: ICursorEventChangedData) => void);
