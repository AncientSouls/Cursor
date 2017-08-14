'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _chai=require('chai');var _lib=require('../lib');var _react=require('./react');var _react2=_interopRequireDefault(_react);var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _mingo=require('mingo');var _mingo2=_interopRequireDefault(_mingo);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')}return call&&(typeof call==='object'||typeof call==='function')?call:self}function _inherits(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}require('source-map-support').install();var BundlesQueue=function(_BundlesQueueProto){_inherits(BundlesQueue,_BundlesQueueProto);function BundlesQueue(){_classCallCheck(this,BundlesQueue);return _possibleConstructorReturn(this,(BundlesQueue.__proto__||Object.getPrototypeOf(BundlesQueue)).apply(this,arguments))}_createClass(BundlesQueue,[{key:'_handler',value:function _handler(id,task,done){task();done()}}]);return BundlesQueue}(_lib.BundlesQueue);describe('AncientSouls/Graph',function(){describe('Cursor',function(){it('get by path',function(){var document={any:[{custom:{many:'data'}}]};var cursor=new _lib.Cursor(true,document);_chai.assert.equal(cursor.get('any.0.custom.many'),'data')});it('get handle path after set changes',function(done){var document={any:[{custom:{many:'a'}}]};var cursor=new _lib.Cursor(true,document);var changesPattern={before:{many:'a'},path:['any','0','custom'],action:'set',arguments:['any.0.custom',{many:'b'}]};cursor.on('any.0.custom.many',function(before,after,stop,changes,isClone){_chai.assert.equal(before,'a');_chai.assert.equal(after,'b');_chai.assert.deepEqual(changes,changesPattern);_chai.assert.isTrue(isClone)});cursor.on('any.0.custom',function(before,after,stop,changes,isClone){_chai.assert.deepEqual(before,{many:'a'});_chai.assert.deepEqual(after,{many:'b'});_chai.assert.deepEqual(changes,changesPattern);_chai.assert.isTrue(isClone)});cursor.on('any.0',function(before,after,stop,changes,isClone){_chai.assert.deepEqual(before,{custom:{many:'b'}});_chai.assert.deepEqual(after,{custom:{many:'b'}});_chai.assert.deepEqual(changes,changesPattern);_chai.assert.isFalse(isClone);done()});cursor.set('any.0.custom',{many:'b'})});it('set',function(){var cursor=new _lib.Cursor(true,{a:[{b:'x'},{c:'y'},{d:'z'}]});cursor.set('a.0.b','z');_chai.assert.deepEqual(cursor.get('a.0'),{b:'z'});cursor.set('',{x:'y'});_chai.assert.deepEqual(cursor.get(),{x:'y'})});it('splice',function(done){var cursor=new _lib.Cursor(true,{a:[{b:'x'},{c:'y'},{d:'z'}],e:'f'});cursor.on('a.1',function(before,after,stop,changes,isClone){_chai.assert.deepEqual(before,{c:'y'});_chai.assert.deepEqual(after,{e:'q'});_chai.assert.isTrue(isClone);setTimeout(done,100)});cursor.on('a.0',function(before,after,stop,changes,isClone){_chai.assert.deepEqual(before,after);_chai.assert.isTrue(isClone)});cursor.on('e',function(before,after,stop,changes,isClone){throw new Error('It should not be')});cursor.splice('a',1,1,{e:'q'});_chai.assert.equal(cursor.get('a.1.e'),'q')})});describe('BundlesQueue',function(){it('only nextId bundle can be handled',function(){var testString='';var queue=new BundlesQueue;queue.addBundle(2,function(){return testString+='c'});queue.addBundle(1,function(){return testString+='b'});queue.addBundle(0,function(){return testString+='a'});queue.addBundle(3,function(){return testString+='d'});_chai.assert.equal(testString,'abcd')})});describe('CursorsManager',function(){it('just should works',function(){var manager=new _lib.CursorsManager(_lib.Cursor);var cursor=manager.new('any','thing');_chai.assert.equal(manager.cursors[cursor.id],cursor)})});describe('bundles',function(){it('set',function(){var manager=new _lib.CursorsManager(_lib.Cursor);var cursor=manager.new('any',{'some':'thing'});(0,_lib.executeBundle)({cursor:cursor.id,type:'set',path:'some',value:'other'},cursor,_lib.executers);_chai.assert.deepEqual(cursor.get('some'),'other')});it('unset',function(){var manager=new _lib.CursorsManager(_lib.Cursor);var cursor=manager.new('any',{'some':'thing'});(0,_lib.executeBundle)({cursor:cursor.id,type:'unset',path:'some'},cursor,_lib.executers);_chai.assert.deepEqual(cursor.get('some'),undefined)});it('splice',function(){var manager=new _lib.CursorsManager(_lib.Cursor);var cursor=manager.new('any',{'some':['things','and','others']});(0,_lib.executeBundle)({cursor:cursor.id,type:'splice',path:'some',start:2,deleteCount:0,items:['some']},cursor,_lib.executers);_chai.assert.deepEqual(cursor.get('some'),['things','and','some','others'])})});describe('concepts',function(){it('fake primitive server-client',function(){var server=function(){var cursor=new _lib.Cursor(undefined,{a:{b:[{c:'d'},{e:'f'}]}});var clientCursors={};cursor.on(null,function(before,after,stop){var bundles={};for(var c in clientCursors){var afterPerCursor=_lodash2.default.get(after,clientCursors[c].query);if(!_lodash2.default.isEqual(clientCursors[c].before,afterPerCursor)){clientCursors[c].before=afterPerCursor;bundles[c]={id:clientCursors[c].bundlesCounter,type:'set',cursor:c,path:'',value:afterPerCursor};clientCursors[c].bundlesCounter++}}client.changes(bundles)});var server={api:{cursor:cursor,clientCursors:clientCursors},request:function request(clientCursorId,query){var result=_lodash2.default.cloneDeep(cursor.get(query));if(!clientCursors[clientCursorId]){clientCursors[clientCursorId]={bundlesCounter:0,query:query,before:result}}return _lodash2.default.cloneDeep(result)}};return server}();var client=function(){var ClientBundlesQueue=function(_BundlesQueueProto2){_inherits(ClientBundlesQueue,_BundlesQueueProto2);function ClientBundlesQueue(cursor){_classCallCheck(this,ClientBundlesQueue);var _this2=_possibleConstructorReturn(this,(ClientBundlesQueue.__proto__||Object.getPrototypeOf(ClientBundlesQueue)).call(this));_this2.cursor=cursor;return _this2}_createClass(ClientBundlesQueue,[{key:'_handler',value:function _handler(id,task,done){(0,_lib.executeBundle)(task,this.cursor,_lib.executers);done()}}]);return ClientBundlesQueue}(_lib.BundlesQueue);var manager=new _lib.CursorsManager(function(_Cursor){_inherits(_class,_Cursor);function _class(){_classCallCheck(this,_class);var _this3=_possibleConstructorReturn(this,(_class.__proto__||Object.getPrototypeOf(_class)).apply(this,arguments));_this3.bundlesQueue=new ClientBundlesQueue(_this3);return _this3}return _class}(_lib.Cursor));return{api:{manager:manager,needData:function needData(query){var cursor=manager.new(query);var data=server.request(cursor.id,query);cursor.set(null,data);return cursor}},changes:function changes(bundles){for(var b in bundles){if(manager.cursors[bundles[b].cursor]){manager.cursors[bundles[b].cursor].bundlesQueue.addBundle(bundles[b].id,bundles[b])}}}}}();var cursor1=client.api.needData('a');var cursor2=client.api.needData('a.b[0]');_chai.assert.deepEqual(cursor1.get(),server.api.cursor.get('a'));_chai.assert.deepEqual(cursor2.get('c'),server.api.cursor.get('a.b[0].c'));server.api.cursor.set('a.b[0].c','j');_chai.assert.deepEqual(cursor1.get(),server.api.cursor.get('a'));_chai.assert.deepEqual(cursor2.get('c'),server.api.cursor.get('a.b[0].c'));server.api.cursor.splice('a.b',0,1,'abrvalk');_chai.assert.deepEqual(cursor1.get(),server.api.cursor.get('a'));_chai.assert.deepEqual(cursor2.get(),server.api.cursor.get('a.b[0]'))});(0,_react2.default)()})});
//# sourceMappingURL=index.js.map