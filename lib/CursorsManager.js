'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}/**
 * A small registrar of cursors. Sends into Cursor constructor unique id and link to current manager.
 * @class
 * @memberof module:ancient-cursor
 */var CursorsManager=exports.CursorsManager=function(){function CursorsManager(){var Cursor=arguments.length>0&&arguments[0]!==undefined?arguments[0]:Cursor;var adapterCursorDestroyed=arguments[1];var adapterCustorConstructed=arguments[2];_classCallCheck(this,CursorsManager);this.Cursor=Cursor;this.cursors={};this.nextId=0;this.adapterCursorDestroyed=adapterCursorDestroyed;this.adapterCustorConstructed=adapterCustorConstructed}/**
   * Constructs new {@link CursorsManager#Cursor} with unique id within current manager. Set constructed cursor into `this.cursors`. Call `this.adapterCustorConstructed` method.
   * @param query
   * @param data
   */_createClass(CursorsManager,[{key:'new',value:function _new(query,data){var cursor=new this.Cursor(query,data,this,this.nextId);this.cursors[this.nextId]=cursor;this.nextId++;if(typeof this.adapterCustorConstructed=='function'){this.adapterCustorConstructed(cursor)}return cursor}/**
   * Resume destroyed cursor into `this.cursors`. Define new id for cursor. You can reset query and default data. Call `this.adapterCustorConstructed` method.
   * @param {Cursor} cursor
   * @param [query]
   * @param [data]
   * @throws Cursor must be destroyed.
   * @description
   * > If cursor not destroyed, throw error.
   */},{key:'renew',value:function renew(cursor,query,data){if(!cursor.hasOwnProperty('id')){cursor.id=this.nextId++;this.cursors[cursor.id]=cursor;if(query)cursor.query=query;if(arguments.length==3)cursor.set('',data);if(typeof this.adapterCustorConstructed=='function'){this.adapterCustorConstructed(cursor)}return cursor}else{throw new Error('Cursor must be destroyed.')}}/**
   * Calls if used `cursor.destroy` method. Call `this.adapterCursorDestroyed` method. Remove cursor from `this.cursors` hash.
   * @param {Cursor} cursor 
   */},{key:'cursorDestroyed',value:function cursorDestroyed(cursor){delete this.cursors[cursor.id];delete cursor.id;if(typeof this.adapterCursorDestroyed=='function'){this.adapterCursorDestroyed(cursor)}}}]);return CursorsManager}();/**
 * @callback CursorManager~adapterCursorDestroyed
 * @memberof module:ancient-cursor
 * @param {Cursor} cursor
 * @description
 * Can be sended into `ApiManager` into constructor. Used for handle cursor destroyed event. For example you can send it information to some api within `ApiManager`.
 *//**
 * @callback CursorManager~adapterCustorConstructed
 * @memberof module:ancient-cursor
 * @param {Cursor} cursor
 * @description
 * Can be sended into `ApiManager` into constructor. Used for handle cursor constructed event. For example you can send it information to some api within `ApiManager`.
 */
//# sourceMappingURL=CursorsManager.js.map