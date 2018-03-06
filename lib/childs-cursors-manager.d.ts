import { TClass, IInstance } from 'ancient-mixins/lib/mixins';
import { ICursorsManager, ICursorsManagerEventsList } from './cursors-manager';
import { TCursor, ICursorEventListener } from './cursor';
declare type TChildsCursorsManager = IChildsCursorsManager<TCursor, ICursorsManagerEventsList>;
interface IChildsCursorsManager<IN extends TCursor, IEventsList extends ICursorsManagerEventsList> extends ICursorsManager<IN, IEventsList> {
    maintain(path: string): ICursorEventListener;
}
declare function mixin<T extends TClass<IInstance>>(superClass: T): any;
declare const MixedChildsCursorsManager: TClass<TChildsCursorsManager>;
declare class ChildsCursorsManager extends MixedChildsCursorsManager {
}
export { mixin as default, mixin, MixedChildsCursorsManager, ChildsCursorsManager, IChildsCursorsManager, TChildsCursorsManager };
