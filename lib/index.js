'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();exports.executeBundle=executeBundle;exports.executeBundleSet=executeBundleSet;exports.executeBundleUnset=executeBundleUnset;exports.executeBundleSplice=executeBundleSplice;function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i]}return arr2}else{return Array.from(arr)}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}var repl=require('repl');var lodash=require('lodash');var EventEmitter=require('events');/**
 * One query capsule.
 */var Cursor=exports.Cursor=function(){/**
   * @constructs Cursor
   * @param query - Query resolves current cursor .We keep it just in case. Suddenly, to work with data, you need to compare them with the query?
   * @param data - Any data by resolved query.
   */function Cursor(query,data,manager,id){_classCallCheck(this,Cursor);this.query=query;this.data=data;this.manager=manager;this.id=id;this.emitter=new EventEmitter}/**
   * Way to change data changes in specified path.
   * @param {string} path
   * @param after
   */_createClass(Cursor,[{key:'set',value:function set(path,after){/**
     * @todo Find better, economically then cloneDeep.
     */var before=lodash.cloneDeep(this.data);if(!path)this.data=after;else this.data=lodash.set(this.data||{},path,after);this.emitter.emit('changed',before,this.data)}/**
   * Way to change array data in specified path. Unlike the standard splice, all arguments are required, except items.
   * @param {string} path
   * @param {number} start
   * @param {number} deleteCount
   * @param {...*} [items]
   */},{key:'splice',value:function splice(path,start,deleteCount){var data=lodash.clone(this.get(path));if(!lodash.isArray(data))throw new Error('Data by path is not an array.');for(var _len=arguments.length,items=Array(_len>3?_len-3:0),_key=3;_key<_len;_key++){items[_key-3]=arguments[_key]}data.splice.apply(data,[start,deleteCount].concat(items));this.set(path,data)}/**
   * Getter from data. Handler can observe changes by current path in data.
   * @param {string} path
   * @param {Cursor~handler} [handler] - Notify you about changes in data by path.
   * @return data - Returns someting from data by spcefied path.
   */},{key:'get',value:function get(){var path=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;var handler=arguments[1];this.on(path,handler);return lodash.isNull(path)?this.data:lodash.get(this.data,path)}/**
   * Handle event changed, as get handler argument, but returns stop method.
   * @param {string} path
   * @param {Cursor~handler} [handler] - Notify you about changes in data by path.
   * @return {Function} stop
   */},{key:'on',value:function on(){var _this=this;var path=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;var handler=arguments[1];if(typeof handler=='function'){var listener=function listener(before,after){var beforeValue=!path?before:lodash.get(before,path);var afterValue=!path?after:lodash.get(after,path);if(!lodash.isEqual(beforeValue,afterValue)){handler(beforeValue,afterValue,stop,_this)}};var stop=function stop(){return _this.emitter.removeListener('changed',listener)};this.emitter.on('changed',listener);return stop}}}]);return Cursor}();/**
 * @callback Cursor~handler
 * @param before
 * @param after
 * @param {Function} stop
 * @param {Cursor} cursor
 *//**
 * Queue of bundles execution.
 * You must override _handler, for parse bandles for your cursors.
 */var BundlesQueue=exports.BundlesQueue=function(){/**
   * @constructs BundlesQueue
   */function BundlesQueue(){_classCallCheck(this,BundlesQueue);this.nextId=0;this.handling=false;this.queue={}}/**
   * Add received bundles into queue.
   * @param {number} id
   * @param task - Any data for your _handler.
   */_createClass(BundlesQueue,[{key:'addBundle',value:function addBundle(id,task){this.queue[id]=task;this.handleNext()}/**
   * Handle next possible bundle from queue.
   * Do not do anything if there is no next mandatory bundle in queue.
   * It is called automatically after each {@link BundlesQueue#addBundle}
   */},{key:'handleNext',value:function handleNext(){var _this2=this;/**
     * @todo May be need protect from call stack, as timeout 0 or some think as...
     */if(this.handling)return;if(this.queue[this.nextId]){this.handling=true;this._handler(this.nextId,this.queue[this.nextId],function(){_this2.handling=false;delete _this2.queue[_this2.nextId];_this2.nextId++;_this2.handleNext()})}}/**
   * You must overrided this method, which would somehow handle each bandle.
   */},{key:'_handler',value:function _handler(id,task,done){throw new Error('Method _handler must be overrided.')}}]);return BundlesQueue}();/**
 * A small registrar of cursors. Sends into Cursor constructor unique id and link to current manager.
 */var CursorsManager=exports.CursorsManager=function(){function CursorsManager(){var Cursor=arguments.length>0&&arguments[0]!==undefined?arguments[0]:Cursor;_classCallCheck(this,CursorsManager);this.Cursor=Cursor;this.cursors={};this.nextId=0}/**
   * Constructs new {@link CursorsManager#Cursor}.
   * @param query
   * @param data
   */_createClass(CursorsManager,[{key:'new',value:function _new(query,data){var cursor=new this.Cursor(query,data,this,this.nextId);this.cursors[this.nextId]=cursor;this.nextId++;return cursor}}]);return CursorsManager}();/**
 * Attention! If the executers object does not have the correct executer type, an error will be thrown.
 * @param {Object} bundle
 * @param {number} bundle.cursor - id of cursor on current client
 * @param {string} bundle.type - set, unset or splice string
 * @param {Object} executers
 * @param {parseBundle~parser} executers.* - executers for each possible bundle
 * @param {Cursor} cursor
 * @throws Uncaught TypeError: executers[bundle.type] is not a function
 */function executeBundle(bundle,cursor,executers){executers[bundle.type](bundle,cursor)}/**
 * @param {Object} bundle
 * @param {string} bundle.path
 * @param bundle.value
 * @param {Cursor} cursor
 */function executeBundleSet(bundle,cursor){cursor.set(bundle.path,bundle.value)}/**
 * @param {Object} bundle
 * @param {string} bundle.path
 * @param {Cursor} cursor
 */function executeBundleUnset(bundle,cursor){cursor.set(bundle.path,undefined)}/**
 * @param {Object} bundle
 * @param {string} bundle.path
 * @param {number} bundle.start
 * @param {number} bundle.deleteCount
 * @param {Array} bundle.items
 * @param {Cursor} cursor
 */function executeBundleSplice(bundle,cursor){cursor.splice.apply(cursor,[bundle.path,bundle.start,bundle.deleteCount].concat(_toConsumableArray(bundle.items)))}/**
 * Default executers object.
 */var executers=exports.executers={set:executeBundleSet,unset:executeBundleUnset,splice:executeBundleSplice};
//# sourceMappingURL=index.js.map