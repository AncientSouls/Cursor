import * as _ from 'lodash';

import {
  TClass,
  IInstance,
} from 'ancient-mixins/lib/mixins';

import {
  IBundle,
  get,
} from './bundle';

import {
  IManager,
  IManagerEventsList,
} from 'ancient-mixins/lib/manager';

import {
  CursorsManager,
  ICursorsManager,
  ICursorsManagerEventsList,
} from './cursors-manager';

import {
  TCursor,
  ICursorEventListener,
} from './cursor';

type TChildsCursorsManager = IChildsCursorsManager<TCursor, ICursorsManagerEventsList>;

interface IChildsCursorsManager<IN extends TCursor, IEventsList extends ICursorsManagerEventsList>
extends ICursorsManager<IN, IEventsList> {
  maintain(path: string): ICursorEventListener;
}

function mixin<T extends TClass<IInstance>>(
  superClass: T,
): any {
  return class ChildsCursorsManager extends superClass {
    maintain(path) {
      return ({ watch, bundlePath }) => {
        watch(path, ({
          isClone, oldValue, newValue, bundlePath, watchPath, localBundlePath, localWatchPath,
        }) => {
          if (localBundlePath.length) {
            const id = localBundlePath[0];
            const childData = get(newValue, id);
            if (childData) {
              if (!this.nodes[id]) this.create(id);
              this.nodes[id].exec(null, childData);
            } else {
              if (this.nodes[id]) this.nodes[id].destroy();
            }
          } else {
            _.each(this.nodes, (childCursor, id) => {
              const childData = get(newValue, id);
              if (!childData) childCursor.destroy();
              else childCursor.exec(null, childData);
            });
            _.each(newValue, (childData, id) => {
              if (!this.nodes[id]) this.create(id);
              this.nodes[id].exec(null, get(newValue, id));
            });
          }
        });
      };
    }
  };
}

const MixedChildsCursorsManager: TClass<TChildsCursorsManager> = mixin(CursorsManager);
class ChildsCursorsManager extends MixedChildsCursorsManager {}

export {
  mixin as default,
  mixin,
  MixedChildsCursorsManager,
  ChildsCursorsManager,
  IChildsCursorsManager,
  TChildsCursorsManager,
};
