'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.executers=exports.ApiManager=exports.CursorsManager=exports.BundlesQueue=exports.Cursor=undefined;exports.executeBundle=executeBundle;exports.executeBundleSet=executeBundleSet;exports.executeBundleUnset=executeBundleUnset;exports.executeBundleSplice=executeBundleSplice;var _repl=require('repl');var _repl2=_interopRequireDefault(_repl);var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _events=require('events');var _events2=_interopRequireDefault(_events);var _Cursor=require('./Cursor');var _BundlesQueue=require('./BundlesQueue');var _CursorsManager=require('./CursorsManager');var _ApiManager=require('./ApiManager');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i]}return arr2}else{return Array.from(arr)}}exports.Cursor=_Cursor.Cursor;exports.BundlesQueue=_BundlesQueue.BundlesQueue;exports.CursorsManager=_CursorsManager.CursorsManager;exports.ApiManager=_ApiManager.ApiManager;/**
 * @typedef {Object} Bundle
 * @property {number} cursor - id of cursor on current client
 * @property {string} type - set, unset or splice string
 * @property {string|string[]} path
 * @property {*=} value - if used set type
 * @property {number} start - if used splice type
 * @property {number} deleteCount - if used splice type
 * @property {Array} items - if used splice type
 *//**
 * Attention! If the executers object does not have the correct executer type, an error will be thrown.
 * @param {Bundle} bundle
 * @param {Object} executers
 * @param {parseBundle~parser} executers.* - executers for each possible bundle
 * @param {Cursor} cursor
 * @throws Uncaught TypeError: executers[bundle.type] is not a function
 */function executeBundle(bundle,cursor,executers){executers[bundle.type](bundle,cursor)}/**
 * @param {Bundle} bundle
 * @param {Cursor} cursor
 */function executeBundleSet(bundle,cursor){cursor.set(bundle.path,bundle.value)}/**
 * @param {Bundle} bundle
 * @param {Cursor} cursor
 */function executeBundleUnset(bundle,cursor){cursor.set(bundle.path,undefined)}/**
 * @param {Bundle} bundle
 * @param {Cursor} cursor
 */function executeBundleSplice(bundle,cursor){cursor.splice.apply(cursor,[bundle.path,bundle.start,bundle.deleteCount].concat(_toConsumableArray(bundle.items)))}/**
 * Default executers object.
 */var executers=exports.executers={set:executeBundleSet,unset:executeBundleUnset,splice:executeBundleSplice};
//# sourceMappingURL=index.js.map