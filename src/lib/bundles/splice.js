/**
 * @param {Object} bundle
 * @param {string} bundle.path
 * @param {number} bundle.start
 * @param {number} bundle.deleteCount
 * @param {Array} bundle.items
 * @param {Cursor} cursor
 */
function execute(bundle, cursor) {
  cursor.splice(bundle.path, bundle.start, bundle.deleteCount, ...bundle.items);
}

export default execute;