'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.Graph=exports.factoryObjectGraph=undefined;var _typeof=typeof Symbol==='function'&&typeof Symbol.iterator==='symbol'?function(obj){return typeof obj}:function(obj){return obj&&typeof Symbol==='function'&&obj.constructor===Symbol&&obj!==Symbol.prototype?'symbol':typeof obj};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _graph=require('../graph.js');var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _fbemitter=require('fbemitter');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')}return call&&(typeof call==='object'||typeof call==='function')?call:self}function _inherits(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}/**
 * This method allows you to use ObjectGraph class to its inheritance chain.
 *
 * @param {Class} ParentClassGraph
 * @return {Class} ObjectGraph
 */function factoryObjectGraph(ParentClassGraph){/**
   * Inherited class. Class with methods for control links in graph.
   * Adapted for array collection.
   * 
   * @class
   * @description `import { ObjectGraph as Graph } from 'ancient-graph';`
   */var ObjectGraph=function(_ParentClassGraph){_inherits(ObjectGraph,_ParentClassGraph);/**
     * Construct new graph and checks for required adaptation methods.
     * @param {Array[]} collection
     * @param {Object.<string, string>} fields - matching of fields in the link with fields in document
     * @param {Object} [config] - Additional config.
     * @param {Object} [config.aliases]
     * @param {String} [config.aliases.$]
     * @throws {Error} if the adapter methods is not complete
     */function ObjectGraph(collection,fields,config){_classCallCheck(this,ObjectGraph);var _this=_possibleConstructorReturn(this,(ObjectGraph.__proto__||Object.getPrototypeOf(ObjectGraph)).apply(this,arguments));_this.emitter=new _fbemitter.EventEmitter;return _this}/**
     * Specifies the id field on insert
     * 
     * @param {number} index
     * @param {Link} link
     * @return {number|string} id;
     */_createClass(ObjectGraph,[{key:'_idGenerator',value:function _idGenerator(index,link){return''+index}},{key:'_insertModifier',/**
     * Generate insert modifier.
     * 
     * @param {number} index
     * @param {Link} link
     * @return {number|string} id;
     */value:function _insertModifier(link){var _modifier={};for(var f in link){if(this.fields[f]){_modifier[this.fields[f]]=link[this.config.aliases[f]]}}return _modifier}},{key:'insert',/**
     * Should insert new link into graph.
     * Return a synchronous result. This can be useful in your application. But for writing generic code, it is recommended to only use the callback result.
     * 
     * @param {Link} link
     * @param {Graph~insertCallback} [callback]
     * @param {Object} [context]
     * @return {number|string} [id]
     */value:function insert(link,callback,context){this.callback;var _modifier=this._insertModifier(link);var index,error,id;try{index=this.collection.push(_modifier)-1;if(!this.collection[index].hasOwnProperty(this.fields[this.config.aliases['id']])){id=this.collection[index][this.fields[this.config.aliases['id']]]=this._idGenerator(index,this.collection[index])}this.emitter.emit('insert',this.collection[index])}catch(_error){error=_error}if(callback){callback(error,id)}return id}/**
     * Optional callback. If present, called with an error object as the first argument and, if no error, the unique id of inserted link as the second.
     *
     * @callback Graph~insertCallback
     * @param {Error} [error]
     * @param {number|string} [id]
     *//**
     * Push into link value some item/items.
     * 
     * @param {Array} data
     * @param {string|number|string[]|number[]} item
     */},{key:'_updateModifierPush',value:function _updateModifierPush(data,item){data.push(item)}/**
     * Push into link value some item/items if not already exists.
     * 
     * @param {Array} data
     * @param {string|number|string[]|number[]} item
     */},{key:'_updateModifierAdd',value:function _updateModifierAdd(data,item){if(_lodash2.default.isArray(item)){for(var i in item){this._updateModifierAdd(data,item[i])}}else{var index=_lodash2.default.indexOf(data,item);if(index<0){this._updateModifierPush(data,item)}}}/**
     * Remove from link value some item/items.
     * 
     * @param {Array} data
     * @param {string|number|string[]|number[]} item
     */},{key:'_updateModifierRemove',value:function _updateModifierRemove(data,item){if(_lodash2.default.isArray(item)){for(var i in item){this._updateModifierRemove(data,item[i])}}else{_lodash2.default.remove(data,function(value){return value==item})}}/**
     * Generate update modifier.
     * 
     * @param {LinkModifier} modifier 
     * @param {Object} result
     * @return {number|string} id;
     */},{key:'_updateModifier',value:function _updateModifier(modifier,result){for(var m in modifier){if(this.fields[m]){if(typeof modifier[m]=='undefined'){delete result[this.fields[m]]}else{if(_typeof(modifier[m])=='object'){if(_lodash2.default.isArray(modifier[m])){result[this.fields[m]]=modifier[m]}else{if(!_lodash2.default.isArray(result[this.fields[m]])){result[this.fields[m]]=result[this.fields[m]]?[result[this.fields[m]]]:[]}for(var key in modifier[m]){if(key=='add'){this._updateModifierAdd(result[this.fields[m]],modifier[m][key])}if(key=='push'){this._updateModifierPush(result[this.fields[m]],modifier[m][key])}if(key=='remove'){this._updateModifierRemove(result[this.fields[m]],modifier[m][key])}}}}else{result[this.fields[m]]=modifier[m]}}}}}},{key:'update',/**
     * Should update to new state of modifier object link by unique id or by link query object.
     * If the database allows, it is recommended to return a synchronous result. This can be useful in your application. But for writing generic code, it is recommended to only use the callback result.
     * 
     * @param {string|LinkSelector} selector
     * @param {LinkModifier} modifier
     * @param {Graph~updateCallback} [callback]
     * @param {Object} [context]
     * @return {number} [count]
     */value:function update(selector,modifier,callback,context){var results=this._fetch(selector);for(var r in results){var oldResult=_lodash2.default.cloneDeep(results[r]);this._updateModifier(modifier,results[r]);this.emitter.emit('update',results[r],oldResult)}if(callback)callback(undefined,results.length);return results.length}/**
     * Optional callback. If present, called with an error object as the first argument and, if no error, the number of affected documents as the second.
     *
     * @callback Graph~updateCallback
     * @param {Error} [error]
     * @param {number} [count]
     *//**
     * Should remove link by unique id or by link query object.
     * 
     * @param {string|LinkSelector} selector
     * @param {Graph~removeCallback} [callback]
     * @param {Object} [context]
     */},{key:'remove',value:function remove(selector,callback,context){var _this2=this;var oldLength=this.collection.length;var removed=[];_lodash2.default.remove(this.collection,function(result){var _query=_this2.query(selector)(result);if(_query)removed.push(result);return _query});for(var r in removed){this.emitter.emit('remove',removed[r])}var newLength=this.collection.length;if(callback)callback(undefined,oldLength-newLength)}/**
     * Optional callback. If present, called with an error object as the first argument.
     *
     * @callback Graph~removeCallback
     * @param {Error} [error]
     * @param {number} [count]
     *//**
     * Generate adapter for database query for links search by unique id or by link query object.
     * 
     * @param {string|LinkSelector} selector
     * @return {*} query
     */},{key:'query',value:function query(selector){var _this3=this;var type=typeof selector==='undefined'?'undefined':_typeof(selector);if(type=='string'||type=='number'){return function(doc){return doc[_this3.fields[_this3.config.aliases['id']]]==selector}}else if(type=='object'){return function(doc){if((typeof doc==='undefined'?'undefined':_typeof(doc))!='object')return false;for(var m in selector){if(_this3.fields[m]){if(typeof selector[m]=='undefined'){if(doc.hasOwnProperty(_this3.fields[m]))return false}else{if(_lodash2.default.isArray(doc[_this3.fields[m]])){if(_lodash2.default.isArray(selector[m])){for(var s in selector[m]){if(!_lodash2.default.includes(doc[_this3.fields[m]],selector[m][s])){return false}}}else{if(!_lodash2.default.includes(doc[_this3.fields[m]],selector[m])){return false}}}else{if(doc[_this3.fields[m]]!=selector[m])return false}}}}return true}}}/**
     * Generate adapted for database options object.
     * 
     * @param {Object} [options]
     * @return {*} options - a options suitable for the database
     */},{key:'options',value:function options(_options2){var _options={};if(_options2){if(_options2.sort){_options.sort={keys:[],orders:[]};for(var s in _options2.sort){if(this.fields[s]){_options.sort.keys.push(this.fields[s]);_options.sort.orders.push(_options2.sort[s]?'asc':'desc')}}}if(typeof _options2.skip=='number'){_options.skip=_options2.skip}if(typeof _options2.limit=='number'){_options.limit=_options2.limit}}return _options}/**
     * Generate Link from document by fields.
     * 
     * @param {Object} document
     * @return {Link} link
     */},{key:'_generateLink',value:function _generateLink(document){var link={};for(var f in this.fields){if(document.hasOwnProperty(this.fields[f])){link[f]=document[this.fields[f]]}}return link}/**
     * Get one first matching link.
     * 
     * @param {string|LinkSelector} selector
     * @param {SelectOptions} [options]
     * @param {Graph~getCallback} [callback]
     * @return {Link} link - result link object
     */},{key:'get',value:function get(selector,options,callback){var results=this.fetch(selector,options,function(error,results){if(callback)callback(error,results?results[0]:undefined)});if(results)return results[0]}/**
     * Fetch native database documents.
     * 
     * @param {string|linkSelector} selector
     * @param {SelectOptions} [options]
     * @return {Object[]} documents - result documents
     */},{key:'_fetch',value:function _fetch(selector,options){var query=this.query(selector);var documents=_lodash2.default.filter(this.collection,query);var _options=this.options(options);if(_options.sort)documents=_lodash2.default.orderBy(documents,_options.sort.keys,_options.orders);var skip=_options.skip?_options.skip:0;var limit=_options.limit?skip+_options.limit:_options.limit;documents=documents.slice(skip,limit);return documents}/**
     * Find and all matching links as an Array.
     * 
     * @param {string|LinkSelector} selector
     * @param {SelectOptions} [options]
     * @param {Graph~fetchCallback} [callback]
     * @return {Link[]} links - result links objects in array
     */},{key:'fetch',value:function fetch(selector,options,callback){var documents=this._fetch(selector,options);var links=[];for(var d in documents){links.push(this._generateLink(documents[d]))}if(callback)callback(undefined,links);return links}/**
     * Optional callback. If present, called with an error object as the first argument and, if no error, the result links objects in array.
     *
     * @callback Graph~fetchCallback
     * @param {Error} [error]
     * @param {Link[]} [links]
     *//**
     * Should call callback once for each matching document, sequentially and synchronously.
     * 
     * @param {string|LinkSelector} selector
     * @param {SelectOptions} [options]
     * @param {Graph~eachCallback} [callback]
     */},{key:'each',value:function each(selector,options,callback){var links=this.fetch(selector,options);for(var l in links){callback(links[l])}}/**
     * @callback Graph~eachCallback
     * @param {Link} [link]
     *//**
     * Map callback over all matching documents. Returns an Array.
     * 
     * @param {string|LinkSelector} selector
     * @param {SelectOptions} [options]
     * @param {Graph~mapCallback} [callback]
     * @return {Array} results
     */},{key:'map',value:function map(selector,options,callback){var links=this.fetch(selector,options);return links.map(callback)}/**
     * @callback Graph~mapCallback
     * @param {Link} [link]
     * @return {*} result
     *//**
     * Count all matching documents.
     * 
     * @param {string|LinkSelector} selector
     * @param {SelectOptions} [options]
     * @param {Graph~countCallback} [callback]
     * @return {number} [count]
     */},{key:'count',value:function count(selector,options,callback){var links=this.fetch(selector,options);if(callback)callback(undefined,links.length);return links.length}/**
     * @callback Graph~countCallback
     * @param {Error} [error]
     * @param {number} [count]
     *//**
     * Should subscribe to the events: link, unlink, insert, update, remove.
     * 
     * @param {string} event - One event name
     * @param {Graph~onCallback} callback
     * @returns {Function} Stops event subscription.
     * @example
     * var counter = 0;
     * var stop = graph.on('update', (oldData, newData) => {
     *   if (oldData.id == '1') console.log(oldData.id, 'is changed');
     *   counter++;
     *   if (counter == 3) stop();
     * });
     */},{key:'on',value:function on(event,callback){var _this4=this;var subscriptions=[];if(event=='insert'){subscriptions.push(this.emitter.addListener('insert',function(document){callback(undefined,_this4._generateLink(document))}))}if(event=='update'){subscriptions.push(this.emitter.addListener('update',function(newDocument,oldDocument){callback(_this4._generateLink(oldDocument),_this4._generateLink(newDocument))}))}if(event=='remove'){subscriptions.push(this.emitter.addListener('remove',function(document){callback(_this4._generateLink(document),undefined)}))}if(event=='link'){subscriptions.push(this.emitter.addListener('insert',function(document){callback(undefined,_this4._generateLink(document))}));subscriptions.push(this.emitter.addListener('update',function(newDocument,oldDocument){callback(_this4._generateLink(oldDocument),_this4._generateLink(newDocument))}))}if(event=='unlink'){subscriptions.push(this.emitter.addListener('update',function(newDocument,oldDocument){callback(_this4._generateLink(oldDocument),_this4._generateLink(newDocument))}));subscriptions.push(this.emitter.addListener('remove',function(document){callback(_this4._generateLink(document),undefined)}))}return function(){var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=subscriptions[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var subscription=_step.value;subscription.remove()}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return()}}finally{if(_didIteratorError){throw _iteratorError}}}}}/**
     * @callback Graph~onCallback
     * @param {Link} [oldLink] - can be undefined on link and insert events
     * @param {Link} [newLink] - can be undefined on unlink and remove events
     * @param {Object} [context] - additional app information, such as context.userId
     */}]);return ObjectGraph}(ParentClassGraph);return ObjectGraph};var ObjectGraph=factoryObjectGraph(_graph.Graph);exports.factoryObjectGraph=factoryObjectGraph;exports.Graph=ObjectGraph;
//# sourceMappingURL=object.js.map