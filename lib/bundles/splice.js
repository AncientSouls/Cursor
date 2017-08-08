"use strict";Object.defineProperty(exports,"__esModule",{value:true});function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i]}return arr2}else{return Array.from(arr)}}/**
 * @param {Object} bundle
 * @param {string} bundle.path
 * @param {number} bundle.start
 * @param {number} bundle.deleteCount
 * @param {Array} bundle.items
 * @param {Cursor} cursor
 */function execute(bundle,cursor){cursor.splice.apply(cursor,[bundle.path,bundle.start,bundle.deleteCount].concat(_toConsumableArray(bundle.items)))}exports.default=execute;
//# sourceMappingURL=splice.js.map