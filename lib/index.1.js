'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}var repl=require('repl');var lodash=require('lodash');var EventEmitter=require('events');/**
 * One query capsule.
 */var Cursor=function(){/**
   * @constructs Cursor
   * @param query - Query resolves current cursor.
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
   */},{key:'get',value:function get(){var _this=this;var path=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;var handler=arguments[1];if(typeof handler=='function'){var listener=function listener(before,after){var beforeValue=lodash.isNull(path)?before:lodash.get(before,path);var afterValue=lodash.isNull(path)?after:lodash.get(after,path);if(!lodash.isEqual(beforeValue,afterValue)){handler(beforeValue,afterValue,stop,_this)}};var stop=function stop(){return _this.emitter.removeListener('changed',listener)};this.emitter.on('changed',listener)}return lodash.isNull(path)?this.data:lodash.get(this.data,path)}}]);return Cursor}();/**
 * @callback Cursor~handler
 * @param before
 * @param after
 * @param {Function} stop
 * @param {Cursor} cursor
 */var BundlesQueue=function(){function BundlesQueue(){_classCallCheck(this,BundlesQueue);this.nextId=0;this.handling=false;this.queue={}}_createClass(BundlesQueue,[{key:'addBundle',value:function addBundle(id,task){this.queue[id]=task;this.handleNext()}},{key:'handleNext',value:function handleNext(){var _this2=this;/**
     * @todo May be need protect from call stack, as timeout 0 or some think as...
     */if(this.handling)return;if(this.queue[this.nextId]){this.handling=true;this._handler(this.nextId,this.queue[this.nextId],function(){_this2.handling=false;delete _this2.queue[_this2.nextId];_this2.nextId++;_this2.handleNext()})}}},{key:'_handler',value:function _handler(id,task,done){throw new Error('Method _handler must be overrided.')}}]);return BundlesQueue}();var CursorsManager=function(){function CursorsManager(){var Cursor=arguments.length>0&&arguments[0]!==undefined?arguments[0]:Cursor;_classCallCheck(this,CursorsManager);this.Cursor=Cursor;this.cursors={};this.nextId=0}_createClass(CursorsManager,[{key:'new',value:function _new(query,data){var cursor=new this.Cursor(query,data,this,this.nextId);this.cursors[this.nextId]=cursor;this.nextId++;return cursor}}]);return CursorsManager}();exports.Cursor=Cursor;exports.BundlesQueue=BundlesQueue;exports.CursorsManager=CursorsManager;
//# sourceMappingURL=index.1.js.map