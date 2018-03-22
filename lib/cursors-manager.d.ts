import { TClass, IInstance } from 'ancient-mixins/lib/mixins';
import { IBundle } from './bundle';
import { IManager, IManagerEventsList } from 'ancient-mixins/lib/manager';
import { ICursorEventChangedData, ICursorEventExecData, TCursor } from './cursor';
declare type TCursorsManager = ICursorsManager<TCursor, ICursorsManagerEventsList>;
interface ICursorBundle extends IBundle {
    cursorId: string;
}
interface ICursorsManagerChangedEventData extends ICursorEventChangedData {
    manager: TCursorsManager;
}
interface ICursorsManagerExecEventData extends ICursorEventExecData {
    manager: TCursorsManager;
}
interface ICursorsManagerEventData {
    node: TCursor;
    manager: TCursorsManager;
}
interface ICursorsManagerEventsList extends IManagerEventsList {
    changed: ICursorsManagerChangedEventData;
    exec: ICursorsManagerExecEventData;
    added: ICursorsManagerEventData;
    removed: ICursorsManagerEventData;
}
interface ICursorsManager<IN extends TCursor, IEventsList extends ICursorsManagerEventsList> extends IManager<IN, IEventsList> {
}
declare function mixin<T extends TClass<IInstance>>(superClass: T): any;
declare const MixedCursorsManager: TClass<TCursorsManager>;
declare class CursorsManager extends MixedCursorsManager {
}
export { mixin as default, mixin, MixedCursorsManager, CursorsManager, ICursorsManager, ICursorBundle, ICursorsManagerChangedEventData, ICursorsManagerExecEventData, ICursorsManagerEventData, ICursorsManagerEventsList, TCursorsManager };
