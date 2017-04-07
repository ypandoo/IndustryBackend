const Facade = require('../../lib/facade');
const verficationSchema = require('./schema');

class VerficationFacade extends Facade {}

module.exports = new VerficationFacade(verficationSchema);
