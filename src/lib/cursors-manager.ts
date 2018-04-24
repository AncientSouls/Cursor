import * as _ from 'lodash';

import {
  TClass,
  IInstance,
} from 'ancient-mixins/lib/mixins';

import {
  IBundle,
} from './bundle';

import {
  Manager,
  IManager,
  IManagerEventsList,
} from 'ancient-mixins/lib/manager';

import {
  Cursor,
  ICursor,
  ICursorEventsList,
  ICursorEventChangedData,
  ICursorEventExecData,
  TCursor,
} from './cursor';

type TCursorsManager = ICursorsManager<TCursor, ICursorsManagerEventsList>;

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

interface ICursorsManager<IN extends TCursor, IEventsList extends ICursorsManagerEventsList>
extends IManager<IN, IEventsList> {}

/*
 * Class `Manager`, contains `[TCursor]` in `list`.
 */
class CursorsManager extends Manager implements TClass<TCursorsManager> {
  public Node = Cursor;
}

export {
  CursorsManager,
  ICursorsManager,
  ICursorBundle,
  ICursorsManagerChangedEventData,
  ICursorsManagerExecEventData,
  ICursorsManagerEventData,
  ICursorsManagerEventsList,
  TCursorsManager,
};
