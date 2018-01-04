'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}var CursorsManager=function(){function CursorsManager(){var Cursor=arguments.length>0&&arguments[0]!==undefined?arguments[0]:Cursor;var adapterCursorDestroyed=arguments[1];var adapterCustorConstructed=arguments[2];_classCallCheck(this,CursorsManager);this.Cursor=Cursor;this.cursors={};this.nextId=0;this.adapterCursorDestroyed=adapterCursorDestroyed;this.adapterCustorConstructed=adapterCustorConstructed}_createClass(CursorsManager,[{key:'new',value:function _new(query,data){var _this=this;var cursor=new this.Cursor(query,data,function(){return _this.cursorDestroyed(cursor)},this.nextId);this.cursors[this.nextId]=cursor;this.nextId++;if(typeof this.adapterCustorConstructed=='function'){this.adapterCustorConstructed(cursor)}return cursor}},{key:'renew',value:function renew(cursor,query,data){if(!cursor.hasOwnProperty('id')){cursor.id=this.nextId++;this.cursors[cursor.id]=cursor;if(query)cursor.query=query;if(arguments.length==3)cursor.set('',data);if(typeof this.adapterCustorConstructed=='function'){this.adapterCustorConstructed(cursor)}return cursor}else{throw new Error('Cursor must be destroyed.')}}},{key:'cursorDestroyed',value:function cursorDestroyed(cursor){delete this.cursors[cursor.id];delete cursor.id;if(typeof this.adapterCursorDestroyed=='function'){this.adapterCursorDestroyed(cursor)}}}]);return CursorsManager}();exports.default=CursorsManager;
//# sourceMappingURL=CursorsManager.js.map