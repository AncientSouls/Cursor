'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.ApiManager=undefined;var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}/**
 * Interface for Api instance returnable from custom `adapterFindApi`.
 * @interface Api
 *//**
 * @function
 * @memberof module:ancient-cursor
 * @name Api#receiveQuery
 * @param {UniqueId} channelId
 * @param {Query} query
 * @param {UniqueId} cursorId
 * @param {Api~sendBundles} sendBundles
 *//**
 * @function
 * @memberof module:ancient-cursor
 * @name Api#channelDisconnected
 * @param {UniqueId} channelId
 * @param {Api~sendBundles} sendBundles
 *//**
 * @function
 * @memberof module:ancient-cursor
 * @name Api#cursorDestroyed
 * @param {UniqueId} channelId
 * @param {UniqueId} cursorId
 * @param {Api~sendBundles} sendBundles
 *//**
 * @callback ApiManager~sendBundles
 * @memberof module:ancient-cursor
 * @param {UniqueId} channelId
 * @param {Bundle[]} bundles
 *//**
 * Manager of many api for sync data with cursors.
 * @class
 * @memberof module:ancient-cursor
 */var ApiManager=exports.ApiManager=function(){/**
   * @constructs ApiManager
   * @param {ApiManager~adapterFindApi} adapterFindApi
   * @param {ApiManager~adapterSend} adapterSend
   */function ApiManager(adapterFindApi,adapterSend){_classCallCheck(this,ApiManager);this.adapterFindApi=adapterFindApi;this.adapterSend=adapterSend;this.relations={}}/**
   * Find api object.
   * @param {Query} apiQuery
   * @returns {Promise} - {@link ApiObject}
   */_createClass(ApiManager,[{key:'findApi',value:function findApi(apiQuery){return this.adapterFindApi(apiQuery)}/**
   * Receive some query from some channelId, with possible need to sync result with some cursorId on channel cursors namespace.
   * @param {UniqueId} channelId
   * @param {Query} apiQuery
   * @param {Query} query
   * @param {UniqueId} cursorId
   * @returns {Promise} - {@link ApiObject}
   */},{key:'receiveQuery',value:function receiveQuery(channelId,apiQuery,query,cursorId){var _this=this;return this.findApi(apiQuery).then(function(api){_lodash2.default.set(_this.relations,[channelId,cursorId],apiQuery);api.receiveQuery(channelId,query,cursorId,function(channelId,bundles){_this.adapterSend(channelId,bundles)});return api})}/**
   * Call channelDisconnected method apply cursorDestroyed for each cursor used in current channelId.
   * @param {UniqueId} channelId
   */},{key:'channelDisconnected',value:function channelDisconnected(channelId){var _this2=this;var cursors=_lodash2.default.get(this.relations,[channelId]);var promises=[];for(var cursorId in cursors){promises.push(function(channelId,cursorId){return new Promise(function(){return _this2.cursorDestroyed(channelId,cursorId)})}(channelId,cursorId))}return promises}/**
   * Call cursorDestroyed method into api serving for current cursor sync.
   * @param {UniqueId} channelId
   * @param {UniqueId} cursorId
   */},{key:'cursorDestroyed',value:function cursorDestroyed(channelId,cursorId){var _this3=this;var apiQuery=_lodash2.default.get(this.relations,[channelId,cursorId]);return this.findApi(apiQuery).then(function(api){api.cursorDestroyed(channelId,cursorId,function(channelId,bundles){_this3.adapterSend(channelId,bundles)})})}}]);return ApiManager}();/**
 * @callback ApiManager~adapterFindApi
 * @memberof module:ancient-cursor
 * @param {Query} apiQuery
 * @returns {Promise} - {@link ApiObject}
 * @description
 * Must be sended into `ApiManager` into constructor. Used for found api instance by apiQuery, from custom application storage logic.
 *//**
 * @callback ApiManager~adapterSend
 * @memberof module:ancient-cursor
 * @param {UniqueId} channelId
 * @param {Bundle[]} bundles
 * @description
 * Must be sended into `ApiManager` into constructor. Used for send bundles from api to cursor into current and channelId within custom application logic.
 */
//# sourceMappingURL=ApiManager.js.map