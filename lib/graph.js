'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _typeof=typeof Symbol==='function'&&typeof Symbol.iterator==='symbol'?function(obj){return typeof obj}:function(obj){return obj&&typeof Symbol==='function'&&obj.constructor===Symbol&&obj!==Symbol.prototype?'symbol':typeof obj};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')}return call&&(typeof call==='object'||typeof call==='function')?call:self}function _inherits(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}/**
 * This method allows you to use Graph class to its inheritance chain.
 *
 * @param {Class} ParentClass
 * @return {Class} Graph
 */function factoryGraph(ParentClass){if(!ParentClass){var ParentClass=function ParentClass(){_classCallCheck(this,ParentClass)}}/**
   * Class to inherit. Class with methods for control links in graph.
   * Must be completed for adaptation to a particular database.
   * 
   * @class
   * @description `import { Graph } from 'ancient-graph';`
   */var Graph=function(_ParentClass){_inherits(Graph,_ParentClass);/**
     * Construct new graph and checks for required adaptation methods.
     * @throws {Error} if the adapter methods is not complete
     * 
     * @param {} collection - A pointer to the collection dannymineobhodimye daapteru to work with the graph. This may be a connection to the SQL database and table name, for example, or a collection of Mongo. 
     * @param {Object.<string, string>} fields - Comparison of the data in the collection of data in the graph. It is necessary for the adapter.
     * @param {Object} [config] - Additional config.
     * @param {Object} [config.aliases]
     * @param {String} [config.aliases.$]
     */function Graph(collection,fields,config){_classCallCheck(this,Graph);var _this=_possibleConstructorReturn(this,(Graph.__proto__||Object.getPrototypeOf(Graph)).apply(this,arguments));_this.collection=collection;_this.fields=fields;if((typeof config==='undefined'?'undefined':_typeof(config))!='object')var config={};_this.config=config;if(_typeof(config.aliases)!='object')config.aliases={};for(var f in fields){if(!config.aliases[f])config.aliases[f]=f}_this.config._aliases={};for(var a in _this.config.aliases){_this.config._aliases[_this.config.aliases[a]]=a}if(_this.insert==Graph.prototype.insert){throw new Error('Method `insert` is not adapted.')}if(_this.update==Graph.prototype.update){throw new Error('Method `update` is not adapted.')}if(_this.remove==Graph.prototype.remove){throw new Error('Method `remove` is not adapted.')}if(_this.query==Graph.prototype.query){throw new Error('Method `query` is not adapted.')}if(_this.options==Graph.prototype.options){throw new Error('Method `options` is not adapted.')}if(_this.fetch==Graph.prototype.fetch){throw new Error('Method `fetch` is not adapted.')}if(_this.get==Graph.prototype.get){throw new Error('Method `get` is not adapted.')}if(_this.each==Graph.prototype.each){throw new Error('Method `each` is not adapted.')}if(_this.map==Graph.prototype.map){throw new Error('Method `map` is not adapted.')}if(_this.count==Graph.prototype.count){throw new Error('Method `count` is not adapted.')}if(_this.on==Graph.prototype.on){throw new Error('Method `on` is not adapted.')}return _this}/**
     * Should insert new link into graph.
     * If the database allows, it is recommended to return a synchronous result. This can be useful in your application. But for writing generic code, it is recommended to only use the callback result.
     * 
     * @param {Link} link
     * @param {Graph~insertCallback} [callback]
     * @param {Object} [context]
     * @return {string} [id]
     */_createClass(Graph,[{key:'insert',value:function insert(link,callback,context){}/**
     * Optional callback. If present, called with an error object as the first argument and, if no error, the unique id of inserted link as the second.
     *
     * @callback Graph~insertCallback
     * @param {Error} [error]
     * @param {string} [id]
     *//**
     * Should update to new state of modifier object link by unique id or by link query object.
     * If the database allows, it is recommended to return a synchronous result. This can be useful in your application. But for writing generic code, it is recommended to only use the callback result.
     * 
     * @param {string|LinkSelector} selector
     * @param {LinkModifier} modifier
     * @param {Graph~updateCallback} [callback]
     * @param {Object} [context]
     * @return {number} [count]
     */},{key:'update',value:function update(selector,modifier,callback,context){}/**
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
     */},{key:'remove',value:function remove(selector,callback,context){}/**
     * Optional callback. If present, called with an error object as the first argument.
     *
     * @callback Graph~removeCallback
     * @param {Error} [error]
     * @param {number} [count]
     *//**
     * Should generate adapter for database query for links search by unique id or by link query object.
     * 
     * @param {string|LinkSelector} selector
     * @return {*} query
     */},{key:'query',value:function query(selector){}/**
     * Should generate adapter for database options. 
     * 
     * @param {Object} [options]
     * @return {*} options - a options suitable for the database
     */},{key:'options',value:function options(_options){}/**
     * Find and all matching links as an Array.
     * 
     * @param {string|LinkSelector} selector
     * @param {SelectOptions} [options]
     * @param {Graph~fetchCallback} [callback]
     * @return {Link[]} links - result links objects in array
     */},{key:'fetch',value:function fetch(selector,options,callback){}/**
     * Optional callback. If present, called with an error object as the first argument and, if no error, the result links objects in array.
     *
     * @callback Graph~fetchCallback
     * @param {Error} [error]
     * @param {Link[]} [links]
     *//**
     * Get one first matching link.
     * 
     * @param {string|LinkSelector} selector
     * @param {SelectOptions} [options]
     * @param {Graph~getCallback} [callback]
     * @return {Link} link - result link object
     */},{key:'get',value:function get(selector,options,callback){}/**
     * Optional callback. If present, called with an error object as the first argument and, if no error, the result link object.
     *
     * @callback Graph~getCallback
     * @param {Error} [error]
     * @param {Link} [link]
     *//**
     * Should call callback once for each matching document, sequentially and synchronously.
     * 
     * @param {string|LinkSelector} selector
     * @param {SelectOptions} [options]
     * @param {Graph~eachCallback} [callback]
     */},{key:'each',value:function each(selector,options,callback){}/**
     * @callback Graph~eachCallback
     * @param {Link} [link]
     *//**
     * Should map callback over all matching documents. Returns an Array.
     * 
     * @param {string|LinkSelector} selector
     * @param {SelectOptions} [options]
     * @param {Graph~mapCallback} [callback]
     * @return {Array} results
     */},{key:'map',value:function map(selector,options,callback){}/**
     * @callback Graph~mapCallback
     * @param {Link} [link]
     * @return {*} result
     *//**
     * Should count all matching documents.
     * 
     * @param {string|LinkSelector} selector
     * @param {SelectOptions} [options]
     * @param {Graph~countCallback} [callback]
     * @return {number} [count]
     */},{key:'count',value:function count(selector,options,callback){}/**
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
     */},{key:'on',value:function on(event,callback){}/**
     * @callback Graph~onCallback
     * @param {Link} [oldLink] - can be undefined on link and insert events
     * @param {Link} [newLink] - can be undefined on unlink and remove events
     * @param {Object} [context] - additional app information, such as context.userId
     */}]);return Graph}(ParentClass);;return Graph}var Graph=factoryGraph();exports.factoryGraph=factoryGraph;exports.Graph=Graph;
//# sourceMappingURL=graph.js.map