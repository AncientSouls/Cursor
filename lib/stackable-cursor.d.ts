import { TClass, IInstance } from 'ancient-mixins/lib/mixins';
import { ICursor, ICursorEventsList } from './cursor';
import { IBundle } from './bundle';
export interface IStackableBundle extends IBundle {
    indexInStack?: number;
}
export interface IStackableCursor<IEventsList extends ICursorEventsList> extends ICursor<IEventsList> {
    nextBundleIndex: number;
    bundlesStack: {
        [index: number]: IStackableBundle;
    };
    exec(query: any, data?: any): this;
    apply(bundle: IStackableBundle): this;
}
export declare function mixin<T extends TClass<IInstance>>(superClass: T): any;
export declare const MixedStackableCursor: TClass<IStackableCursor<ICursorEventsList>>;
export declare class StackableCursor extends MixedStackableCursor {
}
