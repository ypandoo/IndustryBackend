const Facade = require('../../lib/facade');
const feeSchema = require('./schema');

class FeeFacade extends Facade {}

module.exports = new FeeFacade(feeSchema);
