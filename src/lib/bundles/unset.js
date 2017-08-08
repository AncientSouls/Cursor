/**
 * @param {Object} bundle
 * @param {string} bundle.path
 * @param {Cursor} cursor
 */
function execute(bundle, cursor) {
  cursor.unset(bundle.path, undefined);
}

export default execute;