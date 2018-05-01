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

export interface IStackableBundle extends IBundle {
  /*
   * Priority in queue.
   */
  indexInStack?: number;
}

export interface IStackableCursor<IEventsList extends ICursorEventsList> extends ICursor<IEventsList> {
  /*
   * Priority for next applying. 
   */
  nextBundleIndex: number;

  /*
   * Queue for applying. 
   */
  bundlesStack: { [index: number]: IStackableBundle };

  /*
   * Extend `cursor.exec()` with resetting queue.
   */
  exec(query: any, data?: any): this;

  /*
   * Extend `cursor.apply()` logic with queue functionality. 
   */
  apply(bundle: IStackableBundle): this;
}

/**
 * Mixin your Cursor with StackableCursor functionality.
 * @example
 * ```typescript
 * 
 * import { Cursor, ICursorEventsList } from 'ancient-cursor/lib/cursor';
 * import { IStackableCursor } from 'ancient-cursor/lib/stackable-cursor';
 * import { TClass } from 'ancient-mixins/lib/mixins';
 * 
 * const MixedStackableCursor: TClass<IStackableCursor<ICursorEventsList>> = mixin(Cursor);
 * ```
 */
export function mixin<T extends TClass<IInstance>>(
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

export const MixedStackableCursor: TClass<IStackableCursor<ICursorEventsList>> = mixin(Cursor);
/**
 * Already mixed class. Plug and play.
 */
export class StackableCursor extends MixedStackableCursor {}
