const Controller = require('../../lib/controller');
const verficationFacade = require('./facade');

class VerficationController extends Controller {}

module.exports = new VerficationController(verficationFacade);
