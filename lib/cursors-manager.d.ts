import { TClass } from 'ancient-mixins/lib/mixins';
import { IBundle } from './bundle';
import { Manager, IManager, IManagerEventsList } from 'ancient-mixins/lib/manager';
import { Cursor, ICursorEventChangedData, ICursorEventExecData, TCursor } from './cursor';
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
    added: ICursorsManagerEventData;
    removed: ICursorsManagerEventData;
}
interface ICursorsManager<IN extends TCursor, IEventsList extends ICursorsManagerEventsList> extends IManager<IN, IEventsList> {
}
declare class CursorsManager extends Manager implements TClass<TCursorsManager> {
    Node: typeof Cursor;
}
export { CursorsManager, ICursorsManager, ICursorBundle, ICursorsManagerChangedEventData, ICursorsManagerExecEventData, ICursorsManagerEventData, ICursorsManagerEventsList, TCursorsManager };
