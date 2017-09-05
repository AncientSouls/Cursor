'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}/**
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
   * It is called automatically current each {@link BundlesQueue#addBundle}
   */},{key:'handleNext',value:function handleNext(){var _this=this;/**
     * @todo May be need protect from call stack, as timeout 0 or some think as...
     */if(this.handling)return;if(this.queue[this.nextId]){this.handling=true;this._handler(this.nextId,this.queue[this.nextId],function(){_this.handling=false;delete _this.queue[_this.nextId];_this.nextId++;_this.handleNext()})}}/**
   * You must overrided this method, which would somehow handle each bandle.
   */},{key:'_handler',value:function _handler(id,task,done){throw new Error('Method _handler must be overrided.')}}]);return BundlesQueue}();
//# sourceMappingURL=BundlesQueue.js.map