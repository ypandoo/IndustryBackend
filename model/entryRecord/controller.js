const Controller = require('../../lib/controller');
const entryRecordFacade = require('./facade');


class EntryRecordController extends Controller {
  create(req, res, next) {
    const io = this.getIO();
    io.emit('monitor', {
        cardNo:req.body.cardNo, 
        warn:0, 
        ATC:req.body.ATC, 
        entry_gateNo:req.body.entry_gateNo, 
        entry_gateType:req.body.entry_gateType,
        entry_siteNo:req.body.entry_siteNo,
        entry_time: req.body.entry_time,
        serialNo:req.body.serialNo
    });
    this.facade.create(req.body)
    .then(doc =>{ 

        //calculate price here
        //entryRecordFacade.findOne()
        res.status(201).json({response_status:'SUCCESS', response_describe:'', data:doc});
    })
    .catch(err => next(err));
  }
}

module.exports = new EntryRecordController(entryRecordFacade);
