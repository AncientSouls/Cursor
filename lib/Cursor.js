'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _events=require('events');var _events2=_interopRequireDefault(_events);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}/**
 * One query capsule.
 * @class
 * @memberof module:ancient-cursor
 */var Cursor=function(){/**
   * @constructs Cursor
   * @param query - Query resolves current cursor .We keep it just in case. Suddenly, to work with data, you need to compare them with the query?
   * @param data - Any data by resolved query.
   */function Cursor(query,data,manager,id){_classCallCheck(this,Cursor);this.query=query;this.data=data;this.manager=manager;this.id=id;this.emitter=new _events2.default}/**
   * Way to change data changes in specified path.
   * @param {string|string[]} path
   * @param current
   */_createClass(Cursor,[{key:'set',value:function set(path,current){var _path=_lodash2.default.toPath(path);var oldByPath=_lodash2.default.get(this.data,_path);if(!_path.length)this.data=current;else this.data=_lodash2.default.set(this.data||{},_path,current);this.emitter.emit('changed',{old:oldByPath,path:_path,action:'set','arguments':_lodash2.default.toArray(arguments)})}/**
   * Way to change array data in specified path. Unlike the standard splice, all arguments are required, except items.
   * @param {string|string[]} path
   * @param {number} start
   * @param {number} deleteCount
   * @param {...*} [items]
   */},{key:'splice',value:function splice(path,start,deleteCount){for(var _len=arguments.length,items=Array(_len>3?_len-3:0),_key=3;_key<_len;_key++){items[_key-3]=arguments[_key]}var _path=_lodash2.default.toPath(path);var oldByPath=_lodash2.default.clone(_lodash2.default.get(this.data,_path));var data=this.get(_path);if(!_lodash2.default.isArray(data))throw new Error('Data by path is not an array.');data.splice.apply(data,[start,deleteCount].concat(items));this.emitter.emit('changed',{old:oldByPath,path:_path,action:'splice','arguments':_lodash2.default.toArray(arguments)})}/**
   * Getter from data. Handler can observe changes by current path in data.
   * @param {string|string[]} path
   * @param {Cursor~handler} [handler] - Notify you about changes in data by path.
   * @return data - Returns someting from data by spcefied path.
   */},{key:'get',value:function get(){var path=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;var handler=arguments[1];this.on(path,handler);return _lodash2.default.isNull(path)?this.data:_lodash2.default.get(this.data,path)}/**
   * Handle event changed, as get handler argument, but returns stop method.
   * @param {string|string[]} path
   * @param {Cursor~handler} [handler] - Notify you about changes in data by path.
   * @return {Function} stop
   */},{key:'on',value:function on(){var _this=this;var path=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;var handler=arguments[1];var eventPath=_lodash2.default.toPath(path);if(typeof handler=='function'){var listener=function listener(changes){var isClone,oldValue,currentValue;var eventPathLocal=eventPath.slice(changes.path.length);if(changes.path.length<=eventPath.length){if(_lodash2.default.isEqual(changes.path,eventPath.slice(0,changes.path.length))){isClone=true;oldValue=eventPathLocal.length?_lodash2.default.get(changes.old,eventPathLocal):changes.old;currentValue=eventPath.length?_lodash2.default.get(_this.data,eventPath):_this.data}else return}else{if(_lodash2.default.isEqual(eventPath,changes.path.slice(0,eventPath.length))){isClone=false;oldValue=currentValue=eventPath.length?_lodash2.default.get(_this.data,eventPath):_this.data}else return}handler(oldValue,currentValue,stop,changes,isClone,_this)};var stop=function stop(){return _this.emitter.removeListener('changed',listener)};this.emitter.on('changed',listener);return stop}}/**
   * Destroy current cursor.
   * If cursor constructed from CursorsManager, then call `this.manager.cursorDestroyed` method. It remove cursor from `this.manager.cursors` and unset `this.id`.
   * Has no other effects.
   */},{key:'destroy',value:function destroy(){if(this.manager){this.manager.cursorDestroyed(this)}}}]);return Cursor}();/**
 * @callback Cursor~handler
 * @memberof module:ancient-cursor
 * @param old - Link to this data old the change.
 * @param current - Link to this data current the change.
 * @param {Function} stop
 * @param {Object} changes
 * @param changes.old
 * @param {string[]} changes.path
 * @param {string} changes.action
 * @param {Array} changes.arguments
 * @param {boolean} isClone - True if changed path deeper then event path. For details, read attention.
 * @param {Cursor} cursor
 * @description
 * **Attention!** If the path leads to a higher level of data from the changed, the link to the data `old` the change will lead to the same location as link `current` the change. If the path leads to a changed level or deeper, then `old` and `current` will differ.
 */exports.default=Cursor;
//# sourceMappingURL=Cursor.js.map