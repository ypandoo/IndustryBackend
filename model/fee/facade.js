const Facade = require('../../lib/facade');
const feeSchema = require('./schema');

class FeeFacade extends Facade {
    search(query) {

        if (query.hasOwnProperty('pan') && query.pan && query.startDate && query.endDate) {
            return this.Schema
                .find({ pan: query.pan, created_time: { $gte: ISODate(query.startDate), $lt: ISODate(query.endDate) } })
                .exec();
        } else {
            return this.Schema
                .find({ created_time: { $gte: (query.startDate), $lt: (query.endDate) } })
                .exec();
        }


    }
}

module.exports = new FeeFacade(feeSchema);