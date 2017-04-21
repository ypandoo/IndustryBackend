const Controller = require('../../lib/controller');
const feeFacade = require('./facade');

class FeeController extends Controller {
    search(req, res, next) {
        return this.facade.search(req.body)
            .then(collection => {
                res.status(200).json({ response_status: 'SUCCESS', response_describe: '', data: collection })
            })
            .catch(err => next(err));
    }
}

module.exports = new FeeController(feeFacade);