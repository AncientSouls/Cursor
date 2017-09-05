import repl from 'repl';
import lodash from 'lodash';
import EventEmitter from 'events';

import { Cursor } from './Cursor';
import { BundlesQueue } from './BundlesQueue';
import { CursorsManager } from './CursorsManager';
import { ApiManager } from './ApiManager';

export {
  Cursor,
  BundlesQueue,
  CursorsManager,
  ApiManager,
};

/**
 * @typedef {Object} Bundle
 * @property {number} cursor - id of cursor on current client
 * @property {string} type - set, unset or splice string
 * @property {string|string[]} path
 * @property {*=} value - if used set type
 * @property {number} start - if used splice type
 * @property {number} deleteCount - if used splice type
 * @property {Array} items - if used splice type
 */

/**
 * Attention! If the executers object does not have the correct executer type, an error will be thrown.
 * @param {Bundle} bundle
 * @param {Object} executers
 * @param {parseBundle~parser} executers.* - executers for each possible bundle
 * @param {Cursor} cursor
 * @throws Uncaught TypeError: executers[bundle.type] is not a function
 */
export function executeBundle(bundle, cursor, executers) {
  executers[bundle.type](bundle, cursor);
}

/**
 * @param {Bundle} bundle
 * @param {Cursor} cursor
 */
export function executeBundleSet(bundle, cursor) {
  cursor.set(bundle.path, bundle.value);
}

/**
 * @param {Bundle} bundle
 * @param {Cursor} cursor
 */
export function executeBundleUnset(bundle, cursor) {
  cursor.set(bundle.path, undefined);
}

/**
 * @param {Bundle} bundle
 * @param {Cursor} cursor
 */
export function executeBundleSplice(bundle, cursor) {
  cursor.splice(bundle.path, bundle.start, bundle.deleteCount, ...bundle.items);
}

/**
 * Default executers object.
 */
export var executers = {
  set: executeBundleSet,
  unset: executeBundleUnset,
  splice: executeBundleSplice,
};