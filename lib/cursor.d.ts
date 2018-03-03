import { TClass, IInstance } from 'ancient-mixins/lib/mixins';
import { INode, INodeEventsList } from 'ancient-mixins/lib/node';
import { IBundle, IBundleChanges } from './bundle';
declare type TCursor = ICursor<ICursorEventsList>;
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
declare function watch({oldValue, newValue, bundlePath, data, bundle}: IBundleChanges, path: string, listener: (data: ICursorWatchData) => void): void;
declare function mixin<T extends TClass<IInstance>>(superClass: T): any;
declare const MixedCursor: TClass<ICursor<ICursorEventsList>>;
declare class Cursor extends MixedCursor {
}
export { mixin as default, mixin, MixedCursor, Cursor, ICursor, ICursorEventChangedData, ICursorEventExecData, ICursorWatchData, ICursorWatch, ICursorEventListener, ICursorEventsList, watch, TCursor };
