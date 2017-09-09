/**
 * @module ancient-cursor
 */

import repl from 'repl';
import lodash from 'lodash';
import EventEmitter from 'events';

import Cursor from './Cursor';
import {
  BundleQueuesManager,
  generateAdapterForBundleQueuesManager,
} from './BundleQueuesManager';
import CursorsManager from './CursorsManager';
import ApiManager from './ApiManager';

export {
  Cursor,
  BundleQueuesManager,
  generateAdapterForBundleQueuesManager,
  CursorsManager,
  ApiManager,
};

/**
 * @typedef {Object} Bundle
 * @property {number} id - id of bundle in personal cursor bundle queue
 * @property {number} cursor - id of cursor on current client
 * @property {string} type - set, unset or splice string
 * @property {string|string[]} path
 * @property {*=} value - if used set type
 * @property {number} start - if used splice type
 * @property {number} deleteCount - if used splice type
 * @property {Array} items - if used splice type
 */