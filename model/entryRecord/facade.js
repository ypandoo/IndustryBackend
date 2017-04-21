const Facade = require('../../lib/facade');
const entryRecordSchema = require('./schema');

class EntryRecordFacade extends Facade {
    search(query) {

        if (query.hasOwnProperty('cardNo') && query.cardNo && query.startDate && query.endDate) {
            return this.Schema
                .find({ cardNo: query.cardNo, entry_time: { $gte: ISODate(query.startDate), $lt: ISODate(query.endDate) } })
                .exec();
        } else {
            return this.Schema
                .find({ entry_time: { $gte: (query.startDate), $lt: (query.endDate) } })
                .exec();
        }


    }
}

module.exports = new EntryRecordFacade(entryRecordSchema);