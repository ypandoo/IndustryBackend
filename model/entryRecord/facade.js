const Facade = require('../../lib/facade');
const entryRecordSchema = require('./schema');

class EntryRecordFacade extends Facade {}

module.exports = new EntryRecordFacade(entryRecordSchema);
