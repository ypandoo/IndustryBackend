const Controller = require('../../lib/controller');
const entryRecordFacade = require('./facade');

class EntryRecordController extends Controller {}

module.exports = new EntryRecordController(entryRecordFacade);
