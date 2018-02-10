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
 * @param {UniqueId} channelId
 * @param {Query} query
 * @param {UniqueId} cursorId
 * @param {Api~sendBundles} sendBundles
 */

/**
 * @function
 * @memberof module:ancient-cursor
 * @name Api#channelDisconnected
 * @param {UniqueId} channelId
 * @param {Api~sendBundles} sendBundles
 */

/**
 * @function
 * @memberof module:ancient-cursor
 * @name Api#cursorDestroyed
 * @param {UniqueId} channelId
 * @param {UniqueId} cursorId
 * @param {Api~sendBundles} sendBundles
 */

/**
 * @callback ApiManager~sendBundles
 * @memberof module:ancient-cursor
 * @param {UniqueId} channelId
 * @param {...Bundle} bundles
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
   * Receive some query from some channelId, with possible need to sync result with some cursorId on channel cursors namespace.
   * @param {UniqueId} channelId
   * @param {Query} apiQuery
   * @param {Query} query
   * @param {UniqueId} cursorId
   * @returns {Promise} - {@link ApiObject}
   */
  receiveQuery(channelId, apiQuery, query, cursorId) {
    return this.findApi(apiQuery).then((api) => {
      lodash.set(this.relations, [channelId, cursorId], apiQuery);
      api.receiveQuery(
        channelId, query, cursorId,
        (channelId, ...bundles) => {
          this.adapterSend(channelId, bundles);
        }
      );
      return api;
    });
  }
  
  /**
   * Call channelDisconnected method apply cursorDestroyed for each cursor used in current channelId.
   * @param {UniqueId} channelId
   */
  channelDisconnected(channelId) {
    var cursors = lodash.get(this.relations, [channelId]);
    
    var promises = [];
    var apis = {};
    for (var cursorId in cursors) {
      if (!apis[cursors[cursorId]]) {
        apis[cursors[cursorId]] = true;
        promises.push(((channelId, cursorId) => {
          return new Promise(() => {
            return this.findApi(cursors[cursorId]).then((api) => {
              lodash.set(this.relations, [channelId, cursorId], cursors[cursorId]);
              if (typeof api.channelDisconnected == 'function') {
                api.channelDisconnected(
                  channelId, (channelId, ...bundles) => {
                    this.adapterSend(channelId, bundles);
                  }
                );
              }
              return api;
            });
          });
        })(channelId, cursorId));
      }
      promises.push(((channelId, cursorId) => {
        return new Promise(() => this.cursorDestroyed(channelId, cursorId));
      })(channelId, cursorId));
    }
    
    delete this.relations[channelId];

    return promises;
  }
  
  /**
   * Call cursorDestroyed method into api serving for current cursor sync.
   * @param {UniqueId} channelId
   * @param {UniqueId} cursorId
   */
  cursorDestroyed(channelId, cursorId) {
    var apiQuery = lodash.get(this.relations, [channelId, cursorId]);
    return this.findApi(apiQuery).then((api) => {
      if (typeof api.cursorDestroyed == 'function') {
        api.cursorDestroyed(
          channelId, cursorId,
          (channelId, ...bundles) => {
            this.adapterSend(channelId, bundles);
          }
        );
      }
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
 * @param {UniqueId} channelId
 * @param {Bundle[]} bundles
 * @description
 * Must be sended into `ApiManager` into constructor. Used for send bundles from api to cursor into current and channelId within custom application logic.
 */

export default ApiManager;