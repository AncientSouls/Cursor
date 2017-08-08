/**
 * @param {Object} bundle
 * @param {string} bundle.path
 * @param bundle.value
 * @param {Cursor} cursor
 */
function execute(bundle, cursor) {
  cursor.set(bundle.path, bundle.value);
}

export default execute;