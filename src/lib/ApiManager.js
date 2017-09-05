import lodash from 'lodash';

/**
 * Interface for Api instance returnable from custom `adapterFindApi`.
 * @interface Api
 */

/**
 * @function
 * @name Api#receiveQuery
 * @param {UniqueId} clientId
 * @param {UniqueId} channelId
 * @param {Query} query
 * @param {UniqueId} cursorId
 * @param {Api~sendBundles} sendBundles
 */

/**
 * @function
 * @name Api#channelDisconnected
 * @param {UniqueId} clientId
 * @param {UniqueId} channelId
 * @param {Api~sendBundles} sendBundles
 */

/**
 * @function
 * @name Api#cursorDestroyed
 * @param {UniqueId} clientId
 * @param {UniqueId} channelId
 * @param {UniqueId} cursorId
 * @param {Api~sendBundles} sendBundles
 */

/**
 * @callback ApiManager~sendBundles
 * @param {UniqueId} channelId
 * @param {Bundle[]} bundles
 */

/**
 * Manager of many api for sync data with cursors.
 */
export class ApiManager {
  
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
   * @param {UniqueId} channelId
   * @param {Query} apiQuery
   * @param {Query} query
   * @param {UniqueId} cursorId
   * @returns {Promise} - {@link ApiObject}
   */
  receiveQuery(clientId, channelId, apiQuery, query, cursorId) {
    return this.findApi(apiQuery).then((api) => {
      lodash.set(this.relations, [clientId, channelId, cursorId], apiQuery);
      api.receiveQuery(
        clientId, channelId, query, cursorId,
        (clientId, channelId, bundles) => {
          this.adapterSend(clientId, channelId, bundles);
        }
      );
      return api;
    });
  }
  
  /**
   * Call channelDisconnected method apply cursorDestroyed for each cursor used in current channelId.
   * @param {UniqueId} clientId
   * @param {UniqueId} channelId
   */
  channelDisconnected(clientId, channelId) {
    var cursors = lodash.get(this.relations, [clientId, channelId]);
    
    var promises = [];
    for (var cursorId in cursors) {
      promises.push(((clientId, channelId, cursorId) => {
        return new Promise(() => this.cursorDestroyed(clientId, channelId, cursorId));
      })(clientId, channelId, cursorId));
    }

    return promises;
  }
  
  /**
   * Call cursorDestroyed method into api serving for current cursor sync.
   * @param {UniqueId} clientId
   * @param {UniqueId} channelId
   * @param {UniqueId} cursorId
   */
  cursorDestroyed(clientId, channelId, cursorId) {
    var apiQuery = lodash.get(this.relations, [clientId, channelId, cursorId]);
    return this.findApi(apiQuery).then((api) => {
      api.cursorDestroyed(
        clientId, channelId, cursorId,
        (clientId, channelId, bundles) => {
          this.adapterSend(clientId, channelId, bundles);
        }
      );
    });
  }
}

/**
 * @callback ApiManager~adapterFindApi
 * @param {Query} apiQuery
 * @returns {Promise} - {@link ApiObject}
 * @description
 * Must be sended into `ApiManager` into constructor. Used for found api instance by apiQuery, from custom application storage logic.
 */

/**
 * @callback ApiManager~adapterSend
 * @param {UniqueId} clientId
 * @param {UniqueId} channelId
 * @param {Bundle[]} bundles
 * @description
 * Must be sended into `ApiManager` into constructor. Used for send bundles from api to cursor into current clientId and channelId within custom application logic.
 */