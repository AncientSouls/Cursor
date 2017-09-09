import lodash from 'lodash';

/**
 * Method for generate example local storage for `bundles`, `nextBundleIds` and adapters for `BandleQueuesManager` `constructor`.
 * @param {CursorsManager} cursorsManager 
 * @returns {Object}
 * @example
 * var cm = new CursorsManager(Cursor);
 * var memory = generateAdapterForBundleQueuesManager(cm);
 * var bqm = new BundleQueuesManage(...memory.adapters);
 * var c = cm.new('any',{'some':['things','and','others']});
 */
function generateAdapterForBundleQueuesManager(cursorsManager) {
  var memory = {
    bundles: {},
    nextBundleIds: {},
    adapters: [
      function getCursor(cursorId, callback) {
        if (cursorsManager.cursors[cursorId])
          callback(cursorsManager.cursors[cursorId]);
      },
      function getBundle(cursorId, bundleId, callback) {
        var bundle = lodash.get(memory.bundles, [cursorId, bundleId]);
        callback(bundle);
      },
      function setBundle(bundle) {
        lodash.set(memory.bundles, [bundle.cursor, bundle.id], bundle);
      },
      function unsetBundle(bundle) {
        if (memory.bundles[bundle.cursor]) {
          delete memory.bundles[bundle.cursor][bundle.id];
        }
      },
      function getNextBundleId(cursorId, callback) {
        var nextBundleId = lodash.get(memory.nextBundleIds, [cursorId]);
        if (typeof(nextBundleId) == 'number') {
          callback(nextBundleId);
        } else {
          this.setNextBundleId(cursorId, 0);
          callback(0);
        }
      },
      function setNextBundleId(cursorId, nextBundleId) {
        memory.nextBundleIds[cursorId] = nextBundleId;
      }
    ],
  };

  return memory;
}

/**
 * Queue of bundles execution for multiple cursors. You must descrobe adapter-methods for store bundles and queue informatation per each cursor. You can see example of adapters in `generateAdapterForBundleQueuesManager` function.
 * @class
 * @memberof module:ancient-cursor
 */
class BundleQueuesManager {
  
  /**
   * @constructs BundleQueuesManager
   * @param {BundleQueuesManager~getCursor} getCursor
   * @param {BundleQueuesManager~getBundle} getBundle
   * @param {BundleQueuesManager~setBundle} setBundle
   * @param {BundleQueuesManager~unsetBundle} unsetBundle
   * @param {BundleQueuesManager~getNextBundleId} getNextBundleId
   * @param {BundleQueuesManager~setNextBundleId} setNextBundleId
   */
  constructor(
    getCursor,
    getBundle,
    setBundle,
    unsetBundle,
    getNextBundleId,
    setNextBundleId,
  ) {
    this.getCursor = getCursor;
    this.getBundle = getBundle;
    this.setBundle = setBundle;
    this.unsetBundle = unsetBundle;
    this.getNextBundleId = getNextBundleId;
    this.setNextBundleId = setNextBundleId;
  }
  
  /**
   * Receive bundle object. If it bundle is next in queue, then execute it, else just save into storage within adapter methods.
   * @param {Bundle} bundle
   * @param {Function} callback - Calls after all executable bundles did executed, and next bundle not founded.
   */
  useBundle(bundle, callback) {
    this.getNextBundleId(bundle.cursor, (nextBundleId) => {
      if (bundle.id == nextBundleId) {
        this.executeBundle(bundle, callback);
      } else {
        if (bundle.id > nextBundleId) {
          this.setBundle(bundle);
        }
        if (callback) callback();
      }
    });
  }
  
  /**
   * Execute bundle without queue. Not for manual usage. After execution, try to execute next bandle in queue, if it exists.
   * @param {Bundle} bundle
   * @param {Function} callback - Calls after all executable bundles did executed, and next bundle not founded.
   */
  executeBundle(bundle, callback) {
    this.getCursor(bundle.cursor, (cursor) => {
      if (cursor) {
        switch (bundle.type) {
          case 'set':
            cursor.set(bundle.path, bundle.value);
            break;
          case 'unset':
            cursor.set(bundle.path, undefined);
            break;
          case 'splice':
            cursor.splice(bundle.path, bundle.start, bundle.deleteCount, ...bundle.items);
            break;
          default:
            throw new Error(`Bundle type "${bundle.type}" is unexpected.`);
        }
        this.unsetBundle(bundle);
        this.setNextBundleId(bundle.cursor, bundle.id + 1);
        this.getBundle(bundle.cursor, bundle.id + 1, (bundle) => {
          if (bundle) this.executeBundle(bundle, callback);
          else if (callback) callback();
        });
      } else if (callback) callback();
    });
  }
}

export {
  BundleQueuesManager,
  generateAdapterForBundleQueuesManager,
};

/**
 * @callback BundleQueuesManager~getCursor
 * @memberof module:ancient-cursor
 * @param cursorId
 * @param {Function} callback - (cursor) => {}
 */

/**
 * @callback BundleQueuesManager~getBundle
 * @memberof module:ancient-cursor
 * @param cursorId
 * @param bundleId
 * @param {Function} callback - (bundle) => {}
 */

/**
 * @callback BundleQueuesManager~setBundle
 * @memberof module:ancient-cursor
 * @param {Bundle} bundle
 */

/**
 * @callback BundleQueuesManager~unsetBundle
 * @memberof module:ancient-cursor
 * @param {Bundle} bundle
 */

/**
 * @callback BundleQueuesManager~getNextBundleId
 * @memberof module:ancient-cursor
 * @param cursorId
 * @param {Function} callback - (nextBundleId) => {}
 */

/**
 * @callback BundleQueuesManager~setNextBundleId
 * @memberof module:ancient-cursor
 * @param cursorId
 * @param nextBundleId
 */