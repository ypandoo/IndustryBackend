const Facade = require('../../lib/facade');
const entrySchema = require('./schema');

class EntryFacade extends Facade {}

module.exports = new EntryFacade(entrySchema);
