'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.ApiManager=undefined;var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}/**
 * Interface for Api instance returnable from custom `adapterFindApi`.
 * @interface Api
 *//**
 * @function
 * @name Api#receiveQuery
 * @param {UniqueId} clientId
 * @param {UniqueId} channelId
 * @param {Query} query
 * @param {UniqueId} cursorId
 * @param {Api~sendBundles} sendBundles
 *//**
 * @function
 * @name Api#channelDisconnected
 * @param {UniqueId} clientId
 * @param {UniqueId} channelId
 * @param {Api~sendBundles} sendBundles
 *//**
 * @function
 * @name Api#cursorDestroyed
 * @param {UniqueId} clientId
 * @param {UniqueId} channelId
 * @param {UniqueId} cursorId
 * @param {Api~sendBundles} sendBundles
 *//**
 * @callback ApiManager~sendBundles
 * @param {UniqueId} channelId
 * @param {Bundle[]} bundles
 *//**
 * Manager of many api for sync data with cursors.
 */var ApiManager=exports.ApiManager=function(){/**
   * @constructs ApiManager
   * @param {ApiManager~adapterFindApi} adapterFindApi
   * @param {ApiManager~adapterSend} adapterSend
   */function ApiManager(adapterFindApi,adapterSend){_classCallCheck(this,ApiManager);this.adapterFindApi=adapterFindApi;this.adapterSend=adapterSend;this.relations={}}/**
   * Find api object.
   * @param {Query} apiQuery
   * @returns {Promise} - {@link ApiObject}
   */_createClass(ApiManager,[{key:'findApi',value:function findApi(apiQuery){return this.adapterFindApi(apiQuery)}/**
   * Receive some query from some clientId, with possible need to sync result with some cursorId on client cursors namespace.
   * @param {UniqueId} clientId
   * @param {UniqueId} channelId
   * @param {Query} apiQuery
   * @param {Query} query
   * @param {UniqueId} cursorId
   * @returns {Promise} - {@link ApiObject}
   */},{key:'receiveQuery',value:function receiveQuery(clientId,channelId,apiQuery,query,cursorId){var _this=this;return this.findApi(apiQuery).then(function(api){_lodash2.default.set(_this.relations,[clientId,channelId,cursorId],apiQuery);api.receiveQuery(clientId,channelId,query,cursorId,function(clientId,channelId,bundles){_this.adapterSend(clientId,channelId,bundles)});return api})}/**
   * Call channelDisconnected method apply cursorDestroyed for each cursor used in current channelId.
   * @param {UniqueId} clientId
   * @param {UniqueId} channelId
   */},{key:'channelDisconnected',value:function channelDisconnected(clientId,channelId){var _this2=this;var cursors=_lodash2.default.get(this.relations,[clientId,channelId]);var promises=[];for(var cursorId in cursors){promises.push(function(clientId,channelId,cursorId){return new Promise(function(){return _this2.cursorDestroyed(clientId,channelId,cursorId)})}(clientId,channelId,cursorId))}return promises}/**
   * Call cursorDestroyed method into api serving for current cursor sync.
   * @param {UniqueId} clientId
   * @param {UniqueId} channelId
   * @param {UniqueId} cursorId
   */},{key:'cursorDestroyed',value:function cursorDestroyed(clientId,channelId,cursorId){var _this3=this;var apiQuery=_lodash2.default.get(this.relations,[clientId,channelId,cursorId]);return this.findApi(apiQuery).then(function(api){api.cursorDestroyed(clientId,channelId,cursorId,function(clientId,channelId,bundles){_this3.adapterSend(clientId,channelId,bundles)})})}}]);return ApiManager}();/**
 * @callback ApiManager~adapterFindApi
 * @param {Query} apiQuery
 * @returns {Promise} - {@link ApiObject}
 * @description
 * Must be sended into `ApiManager` into constructor. Used for found api instance by apiQuery, from custom application storage logic.
 *//**
 * @callback ApiManager~adapterSend
 * @param {UniqueId} clientId
 * @param {UniqueId} channelId
 * @param {Bundle[]} bundles
 * @description
 * Must be sended into `ApiManager` into constructor. Used for send bundles from api to cursor into current clientId and channelId within custom application logic.
 */
//# sourceMappingURL=ApiManager.js.map