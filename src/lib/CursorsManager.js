/**
 * A small registrar of cursors. Sends into Cursor constructor unique id and link to current manager.
 * @class
 * @memberof module:ancient-cursor
 */
class CursorsManager {
  constructor(Cursor = Cursor, adapterCursorDestroyed, adapterCustorConstructed) {
    this.Cursor = Cursor;
    this.cursors = {};
    this.nextId = 0;
    this.adapterCursorDestroyed = adapterCursorDestroyed;
    this.adapterCustorConstructed = adapterCustorConstructed;
  }
  
  /**
   * Constructs new {@link CursorsManager#Cursor} with unique id within current manager. Set constructed cursor into `this.cursors`. Call `this.adapterCustorConstructed` method.
   * @param query
   * @param data
   */
  new(query, data) {
    var cursor = new this.Cursor(query, data, this, this.nextId);
    this.cursors[this.nextId] = cursor;
    this.nextId++;
    if (typeof(this.adapterCustorConstructed) == 'function') {
      this.adapterCustorConstructed(cursor);
    }
    return cursor;
  }
  
  /**
   * Resume destroyed cursor into `this.cursors`. Define new id for cursor. You can reset query and default data. Call `this.adapterCustorConstructed` method.
   * @param {Cursor} cursor
   * @param [query]
   * @param [data]
   * @throws Cursor must be destroyed.
   * @description
   * > If cursor not destroyed, throw error.
   */
  renew(cursor, query, data) {
    if (!cursor.hasOwnProperty('id')) {

      cursor.id = this.nextId++;
      this.cursors[cursor.id] = cursor;
      
      if (query) cursor.query = query;
      if (arguments.length == 3) cursor.set('', data);

      if (typeof(this.adapterCustorConstructed) == 'function') {
        this.adapterCustorConstructed(cursor);
      }

      return cursor;
    } else {
      throw new Error('Cursor must be destroyed.');
    }
  }

  /**
   * Calls if used `cursor.destroy` method. Call `this.adapterCursorDestroyed` method. Remove cursor from `this.cursors` hash.
   * @param {Cursor} cursor 
   */
  cursorDestroyed(cursor) {
    delete this.cursors[cursor.id];
    delete cursor.id;
    if (typeof(this.adapterCursorDestroyed) == 'function') {
      this.adapterCursorDestroyed(cursor);
    }
  }
}

/**
 * @callback CursorManager~adapterCursorDestroyed
 * @memberof module:ancient-cursor
 * @param {Cursor} cursor
 * @description
 * Can be sended into `ApiManager` into constructor. Used for handle cursor destroyed event. For example you can send it information to some api within `ApiManager`.
 */

/**
 * @callback CursorManager~adapterCustorConstructed
 * @memberof module:ancient-cursor
 * @param {Cursor} cursor
 * @description
 * Can be sended into `ApiManager` into constructor. Used for handle cursor constructed event. For example you can send it information to some api within `ApiManager`.
 */

 export default CursorsManager;