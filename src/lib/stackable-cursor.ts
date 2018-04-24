import * as _ from 'lodash';

import {
  TClass,
  IInstance,
} from 'ancient-mixins/lib/mixins';

import {
  Node,
  INode,
  INodeEventsList,
} from 'ancient-mixins/lib/node';

import {
  Cursor,
  ICursor,
  ICursorEventsList,
} from './cursor';

import {
  IBundle,
} from './bundle';

interface IStackableBundle extends IBundle {
  /*
   * Extend bundle logic with queue functionality. 
   */
  indexInStack?: number;
}

interface IStackableCursor<IEventsList extends ICursorEventsList> extends ICursor<IEventsList> {
  nextBundleIndex: number;
  bundlesStack: { [index: number]: IStackableBundle };
  apply(bundle: IStackableBundle): this;
}

function mixin<T extends TClass<IInstance>>(
  superClass: T,
): any {
  return class StackableCursor extends superClass
  {
    nextBundleIndex = 0;
    
    bundlesStack = {};

    exec(query, data) {
      this.nextBundleIndex = 0;
      this.bundlesStack = {};
      super.exec(query, data);
      return this;
    }
    
    apply(bundle) {
      if (_.isNumber(bundle.indexInStack)) {
        if (
          bundle.indexInStack >= this.nextBundleIndex && 
          !this.bundlesStack[bundle.indexInStack]
        ) {
          if (bundle.indexInStack === this.nextBundleIndex) {
            super.apply(bundle);
            this.nextBundleIndex++;
            if (this.bundlesStack[this.nextBundleIndex]) {
              const nextBundle = this.bundlesStack[this.nextBundleIndex];
              delete this.bundlesStack[this.nextBundleIndex];
              this.apply(nextBundle);
            }
          } else {
            this.bundlesStack[bundle.indexInStack] = bundle;
          }
        }
      } else if (this.nextBundleIndex === 0) {
        super.apply(bundle);
      }
      
      return this;
    }
  };
}

const MixedStackableCursor: TClass<IStackableCursor<ICursorEventsList>> = mixin(Cursor);
class StackableCursor extends MixedStackableCursor {}

export {
  mixin as default,
  mixin,
  MixedStackableCursor,
  StackableCursor,
  IStackableCursor,
  IStackableBundle,
};
