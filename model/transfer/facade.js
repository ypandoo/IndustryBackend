const Facade = require('../../lib/facade');
const transferSchema = require('./schema');

class TransferFacade extends Facade {}

module.exports = new TransferFacade(transferSchema);
