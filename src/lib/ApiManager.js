import lodash from 'lodash';

/**
 * Interface for Api instance returnable from custom `adapterFindApi`.
 * @interface Api
 * @memberof module:ancient-cursor
 */

/**
 * @function
 * @memberof module:ancient-cursor
 * @name Api#receiveQuery
 * @param {UniqueId} clientId
 * @param {Query} query
 * @param {UniqueId} cursorId
 * @param {Api~sendBundles} sendBundles
 */

/**
 * @function
 * @memberof module:ancient-cursor
 * @name Api#clientDisconnected
 * @param {UniqueId} clientId
 * @param {Api~sendBundles} sendBundles
 */

/**
 * @function
 * @memberof module:ancient-cursor
 * @name Api#cursorDestroyed
 * @param {UniqueId} clientId
 * @param {UniqueId} cursorId
 * @param {Api~sendBundles} sendBundles
 */

/**
 * @callback ApiManager~sendBundles
 * @memberof module:ancient-cursor
 * @param {UniqueId} clientId
 * @param {Bundle[]} bundles
 */

/**
 * Manager of many api for sync data with cursors.
 * @class
 * @memberof module:ancient-cursor
 */
class ApiManager {
  
  /**
   * @constructs ApiManager
   * @param {ApiManager~adapterFindApi} adapterFindApi
   * @param {ApiManager~adapterSend} adapterSend
   */
  constructor(adapterFindApi, adapterSend) {
    this.adapterFindApi = adapterFindApi;
    this.adapterSend = adapterSend;
    this.relations = {};
  }

  /**
   * Find api object.
   * @param {Query} apiQuery
   * @returns {Promise} - {@link ApiObject}
   */
  findApi(apiQuery) {
    return this.adapterFindApi(apiQuery);
  }
  
  /**
   * Receive some query from some clientId, with possible need to sync result with some cursorId on client cursors namespace.
   * @param {UniqueId} clientId
   * @param {Query} apiQuery
   * @param {Query} query
   * @param {UniqueId} cursorId
   * @returns {Promise} - {@link ApiObject}
   */
  receiveQuery(clientId, apiQuery, query, cursorId) {
    return this.findApi(apiQuery).then((api) => {
      lodash.set(this.relations, [clientId, cursorId], apiQuery);
      api.receiveQuery(
        clientId, query, cursorId,
        (clientId, bundles) => {
          this.adapterSend(clientId, bundles);
        }
      );
      return api;
    });
  }
  
  /**
   * Call clientDisconnected method apply cursorDestroyed for each cursor used in current clientId.
   * @param {UniqueId} clientId
   */
  clientDisconnected(clientId) {
    var cursors = lodash.get(this.relations, [clientId]);
    
    var promises = [];
    for (var cursorId in cursors) {
      promises.push(((clientId, cursorId) => {
        return new Promise(() => this.cursorDestroyed(clientId, cursorId));
      })(clientId, cursorId));
    }

    return promises;
  }
  
  /**
   * Call cursorDestroyed method into api serving for current cursor sync.
   * @param {UniqueId} clientId
   * @param {UniqueId} cursorId
   */
  cursorDestroyed(clientId, cursorId) {
    var apiQuery = lodash.get(this.relations, [clientId, cursorId]);
    return this.findApi(apiQuery).then((api) => {
      api.cursorDestroyed(
        clientId, cursorId,
        (clientId, bundles) => {
          this.adapterSend(clientId, bundles);
        }
      );
    });
  }
}

/**
 * @callback ApiManager~adapterFindApi
 * @memberof module:ancient-cursor
 * @param {Query} apiQuery
 * @returns {Promise} - {@link ApiObject}
 * @description
 * Must be sended into `ApiManager` into constructor. Used for found api instance by apiQuery, from custom application storage logic.
 */

/**
 * @callback ApiManager~adapterSend
 * @memberof module:ancient-cursor
 * @param {UniqueId} clientId
 * @param {Bundle[]} bundles
 * @description
 * Must be sended into `ApiManager` into constructor. Used for send bundles from api to cursor into current and clientId within custom application logic.
 */

export default ApiManager;