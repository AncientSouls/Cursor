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