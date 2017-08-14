var repl = require('repl');
var lodash = require('lodash');
var EventEmitter = require('events');

/**
 * One query capsule.
 */
export class Cursor {
  
  /**
   * @constructs Cursor
   * @param query - Query resolves current cursor .We keep it just in case. Suddenly, to work with data, you need to compare them with the query?
   * @param data - Any data by resolved query.
   */
  constructor(query, data, manager, id) {
    this.query = query;
    this.data = data;
    this.manager = manager;
    this.id = id;
    this.emitter = new EventEmitter();
  }
  
  /**
   * Way to change data changes in specified path.
   * @param {string|string[]} path
   * @param current
   */
  set(path, current) {
    var _path = lodash.toPath(path); 
    
    var oldByPath = lodash.get(this.data, _path);
    
    if (!_path.length) this.data = current;
    else this.data = lodash.set(this.data || {}, _path, current);
    
    this.emitter.emit('changed', { old: oldByPath, path: _path, action: 'set', 'arguments': lodash.toArray(arguments), });
  }
  
  /**
   * Way to change array data in specified path. Unlike the standard splice, all arguments are required, except items.
   * @param {string|string[]} path
   * @param {number} start
   * @param {number} deleteCount
   * @param {...*} [items]
   */
  splice(path, start, deleteCount, ...items) {
    var _path = lodash.toPath(path); 
    
    var oldByPath = lodash.clone(lodash.get(this.data, _path));
    
    var data = this.get(_path);
    
    if (!lodash.isArray(data)) throw new Error(`Data by path is not an array.`);
    
    data.splice(start, deleteCount, ...items);
    
    this.emitter.emit('changed', { old: oldByPath, path: _path, action: 'splice', 'arguments': lodash.toArray(arguments), });
  }
  
  /**
   * Getter from data. Handler can observe changes by current path in data.
   * @param {string|string[]} path
   * @param {Cursor~handler} [handler] - Notify you about changes in data by path.
   * @return data - Returns someting from data by spcefied path.
   */
  get(path = null, handler) {
    this.on(path, handler);
    return lodash.isNull(path)?this.data:lodash.get(this.data, path);
  }
  
  /**
   * Handle event changed, as get handler argument, but returns stop method.
   * @param {string|string[]} path
   * @param {Cursor~handler} [handler] - Notify you about changes in data by path.
   * @return {Function} stop
   */
  on(path = null, handler) {
    var eventPath = lodash.toPath(path);
    if (typeof(handler) == 'function') {
      var listener = (changes) => {
        var isClone, oldValue, currentValue;
        var eventPathLocal = eventPath.slice(changes.path.length);
        
        if (changes.path.length <= eventPath.length) {
          if (lodash.isEqual(changes.path, eventPath.slice(0, changes.path.length))) {
            isClone = true;
            oldValue = eventPathLocal.length?lodash.get(changes.old, eventPathLocal):changes.old;
            currentValue = eventPath.length?lodash.get(this.data, eventPath):this.data;
          } else return;
        } else {
          if (lodash.isEqual(eventPath, changes.path.slice(0, eventPath.length))) {
            isClone = false;
            oldValue = currentValue = eventPath.length?lodash.get(this.data, eventPath):this.data;
          } else return;
        }
        
        handler(oldValue, currentValue, stop, changes, isClone, this);
      };
      var stop = () => this.emitter.removeListener('changed', listener);
      this.emitter.on('changed', listener);
      return stop;
    }
  }
}

/**
 * @callback Cursor~handler
 * @param old - Link to this data old the change.
 * @param current - Link to this data current the change.
 * @param {Function} stop
 * @param {Object} changes
 * @param changes.old
 * @param {string[]} changes.path
 * @param {string} changes.action
 * @param {Array} changes.arguments
 * @param {boolean} isClone - True if changed path deeper then event path. For details, read attention.
 * @param {Cursor} cursor
 * @description
 * **Attention!** If the path leads to a higher level of data from the changed, the link to the data `old` the change will lead to the same location as link `current` the change. If the path leads to a changed level or deeper, then `old` and `current` will differ.
 */

/**
 * Queue of bundles execution.
 * You must override _handler, for parse bandles for your cursors.
 */
export class BundlesQueue {
  
  /**
   * @constructs BundlesQueue
   */
  constructor() {
    this.nextId = 0;
    this.handling = false;
    this.queue = {};
  }
  
  /**
   * Add received bundles into queue.
   * @param {number} id
   * @param task - Any data for your _handler.
   */
  addBundle(id, task) {
    this.queue[id] = task;
    this.handleNext();
  }
  
  /**
   * Handle next possible bundle from queue.
   * Do not do anything if there is no next mandatory bundle in queue.
   * It is called automatically current each {@link BundlesQueue#addBundle}
   */
  handleNext() {
    /**
     * @todo May be need protect from call stack, as timeout 0 or some think as...
     */
    if (this.handling) return;
    if (this.queue[this.nextId]) {
      this.handling = true;
      this._handler(this.nextId, this.queue[this.nextId], () => {
        this.handling = false;
        delete this.queue[this.nextId];
        this.nextId++;
        this.handleNext();
      });
    }
  }
  
  /**
   * You must overrided this method, which would somehow handle each bandle.
   */
  _handler(id, task, done) {
    throw new Error('Method _handler must be overrided.');
  }
}

/**
 * A small registrar of cursors. Sends into Cursor constructor unique id and link to current manager.
 */
export class CursorsManager {
  constructor(Cursor = Cursor) {
    this.Cursor = Cursor;
    this.cursors = {};
    this.nextId = 0;
  }
  
  /**
   * Constructs new {@link CursorsManager#Cursor}.
   * @param query
   * @param data
   */
  new(query, data) {
    var cursor = new this.Cursor(query, data, this, this.nextId);
    this.cursors[this.nextId] = cursor;
    this.nextId++;
    return cursor;
  }
}

/**
 * Attention! If the executers object does not have the correct executer type, an error will be thrown.
 * @param {Object} bundle
 * @param {number} bundle.cursor - id of cursor on current client
 * @param {string} bundle.type - set, unset or splice string
 * @param {Object} executers
 * @param {parseBundle~parser} executers.* - executers for each possible bundle
 * @param {Cursor} cursor
 * @throws Uncaught TypeError: executers[bundle.type] is not a function
 */
export function executeBundle(bundle, cursor, executers) {
  executers[bundle.type](bundle, cursor);
}

/**
 * @param {Object} bundle
 * @param {string|string[]} bundle.path
 * @param bundle.value
 * @param {Cursor} cursor
 */
export function executeBundleSet(bundle, cursor) {
  cursor.set(bundle.path, bundle.value);
}

/**
 * @param {Object} bundle
 * @param {string|string[]} bundle.path
 * @param {Cursor} cursor
 */
export function executeBundleUnset(bundle, cursor) {
  cursor.set(bundle.path, undefined);
}

/**
 * @param {Object} bundle
 * @param {string|string[]} bundle.path
 * @param {number} bundle.start
 * @param {number} bundle.deleteCount
 * @param {Array} bundle.items
 * @param {Cursor} cursor
 */
export function executeBundleSplice(bundle, cursor) {
  cursor.splice(bundle.path, bundle.start, bundle.deleteCount, ...bundle.items);
}

/**
 * Default executers object.
 */
export var executers = {
  set: executeBundleSet,
  unset: executeBundleUnset,
  splice: executeBundleSplice,
};