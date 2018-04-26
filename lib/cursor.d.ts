import { TClass, IInstance } from 'ancient-mixins/lib/mixins';
import { INode, INodeEventsList } from 'ancient-mixins/lib/node';
import { TManager } from 'ancient-mixins/lib/manager';
import { IBundle, IBundleChanges, TBundlePaths } from './bundle';
declare type TCursor = ICursor<ICursorEventsList>;
interface ICursorEventChangedData {
    data: any;
    newValue: any;
    bundlePath: string[];
    bundle: IBundle;
    bundleChanges: IBundleChanges;
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
    newValue: any;
    bundlePath: string[];
    watchPath: string[];
    localBundlePath: string[];
    localWatchPath: string[];
    bundle: IBundle;
}
interface ICursorWatch {
    (path: TBundlePaths, listener: (data: ICursorWatchData) => void): void;
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
    get(paths: TBundlePaths): any;
}
declare function watch({newValue, bundlePath, data, bundle}: IBundleChanges, paths: TBundlePaths, listener: (data: ICursorWatchData) => void): void;
declare function apply(cursor: any, bundle: any): void;
declare function mixin<T extends TClass<IInstance>>(superClass: T): any;
declare const MixedCursor: TClass<ICursor<ICursorEventsList>>;
declare class Cursor extends MixedCursor {
}
declare function spray(path: TBundlePaths, manager: TManager, cursor?: TClass<TCursor>): ((data: ICursorEventChangedData) => void);
export { mixin as default, mixin, MixedCursor, Cursor, ICursor, ICursorEventChangedData, ICursorEventExecData, ICursorWatchData, ICursorWatch, ICursorEventListener, ICursorEventsList, apply, watch, spray, TCursor };
