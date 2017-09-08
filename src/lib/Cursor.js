import lodash from 'lodash';
import EventEmitter from 'events';

/**
 * One query capsule.
 * @class
 * @memberof module:ancient-cursor
 */
class Cursor {
  
  /**
   * @constructs Cursor
   * @param query - Query resolves current cursor .We keep it just in case. Suddenly, to work with data, you need to compare them with the query?
   * @param data - Any data by resolved query.
   * @param {Cursor~adapterDestroyed} adapterDestroyed
   * @param {string|number} [id]
   */
  constructor(query, data, adapterDestroyed, id) {
    this.query = query;
    this.data = data;
    this.adapterDestroyed = adapterDestroyed;
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

  /**
   * Destroy current cursor.
   * If cursor constructed with adapterDestroyed method, then call `this.adapterDestroyed` method. If cursor constructed from `CursorManager`, it remove cursor from `this.manager.cursors` and unset `this.id`.
   * Has no other effects.
   */
  destroy() {
    if (typeof(this.adapterDestroyed) == 'function') {
      this.adapterDestroyed(this);
    }
  }
}

/**
 * @callback Cursor~adapterDestroyed
 * @memberof module:ancient-cursor
 * @param {Cursor} cursor
 */

/**
 * @callback Cursor~handler
 * @memberof module:ancient-cursor
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

 export default Cursor;