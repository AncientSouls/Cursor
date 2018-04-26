import { TClass, IInstance } from 'ancient-mixins/lib/mixins';
import { ICursor, ICursorEventsList } from './cursor';
import { IBundle } from './bundle';
interface IStackableBundle extends IBundle {
    indexInStack?: number;
}
interface IStackableCursor<IEventsList extends ICursorEventsList> extends ICursor<IEventsList> {
    nextBundleIndex: number;
    bundlesStack: {
        [index: number]: IStackableBundle;
    };
    exec(query: any, data?: any): this;
    apply(bundle: IStackableBundle): this;
}
declare function mixin<T extends TClass<IInstance>>(superClass: T): any;
declare const MixedStackableCursor: TClass<IStackableCursor<ICursorEventsList>>;
declare class StackableCursor extends MixedStackableCursor {
}
export { mixin as default, mixin, MixedStackableCursor, StackableCursor, IStackableCursor, IStackableBundle };
