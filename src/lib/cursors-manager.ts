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

interface ICursorsManagerEventsList extends IManagerEventsList {
  changed: ICursorsManagerChangedEventData;
  exec: ICursorsManagerExecEventData;
}

interface ICursorsManager<IN extends TCursor, IEventsList extends ICursorsManagerEventsList>
extends IManager<IN, IEventsList> {}

function mixin<T extends TClass<IInstance>>(
  superClass: T,
): any {
  return class CursorsManager extends superClass {
    public Node = Cursor;
  };
}

const MixedCursorsManager: TClass<TCursorsManager> = mixin(Manager);
class CursorsManager extends MixedCursorsManager {}

export {
  mixin as default,
  mixin,
  MixedCursorsManager,
  CursorsManager,
  ICursorsManager,
  ICursorBundle,
  ICursorsManagerChangedEventData,
  ICursorsManagerExecEventData,
  ICursorsManagerEventsList,
  TCursorsManager,
};
