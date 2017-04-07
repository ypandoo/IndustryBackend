const Controller = require('../../lib/controller');
const feeFacade = require('./facade');

class FeeController extends Controller {}

module.exports = new FeeController(feeFacade);
