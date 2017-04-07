const Controller = require('../../lib/controller');
const entryFacade = require('./facade');

class EntryController extends Controller {}

module.exports = new EntryController(entryFacade);
