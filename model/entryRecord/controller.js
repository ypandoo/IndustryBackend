const Controller = require('../../lib/controller');
const entryRecordFacade = require('./facade');
const feeFacade = require('../fee/facade');
const request = require('request');


class EntryRecordController extends Controller {
  create(req, res, next) {

    //Notice monitor
    const io = this.getIO();
    const recordData = {
        cardNo:req.body.cardNo, 
        warn:0, 
        ATC:req.body.ATC, 
        entry_gateNo:req.body.entry_gateNo, 
        entry_gateType:req.body.entry_gateType,
        entry_siteNo:req.body.entry_siteNo,
        entry_time: req.body.entry_time,
        serialNo:req.body.serialNo
    };
    io.emit('monitor', recordData);

    //if leaving entry
    var cardNo = req.body.cardNo;
    var entry_gateType = parseInt(req.body.entry_gateType);
    if(entry_gateType == 1){
        //find enter record
        this.facade
        .findOne({entry_gateType:!entry_gateType, cardNo: cardNo})
        .then(doc => {
            //save fee record
            var feeData = {
              currencyCode:"156", 
              pan:doc.cardNo, 
              amount:"000000000010", 
              sysTraceNum:"001609", 
              merchantNum:"000000050000012",
              status: 0
            }
            feeFacade.create(feeData).then(doc=>{
              var requireForFee ={
                interfaceID:"oda_request_pay",
                currencyCode:doc.currencyCode, 
                pan:doc.pan, 
                amount:doc.amount, 
                sysTraceNum:doc.sysTraceNum, 
                merchantNum:doc.merchantNum
              }

              const _id = doc._id;

              //request for fee here
              var url = 'http://192.168.199.185:8081/acquirer-war/odaServlet/api/v1';
              //request.post(url, { json: true, body: req.body })
              request.post(url,{ json: true, body: requireForFee }
               ,function(error, response, body){
                  console.log(body);
                  var feeUpdate = {
                    status:1,
                    ACCT_BALANCE: body.oda_request_pay_response_info.ACCT_BALANCE,
                    status_describle:body.response_status,
                    ref_num : body.oda_request_pay_response_info.ref_num             
                  };
                  console.log(feeUpdate);
                  feeFacade.update({_id, _id}, feeUpdate).then(doc=>{
                    console.log('update fee request');
                    console.log(doc);
                  });
                });

            });
            //can send message to monitor here
        })
        .catch(err => {
          
          
          
          next(err);
        });
    }
    



    this.facade.create(req.body)
    .then(doc =>{ 

        //calculate price here
  //         currencyCode: { type: String, required: true },
  // pan:  { type: String, required:true },
  // amount: {type:String, required: true, default: "0",},
  // sysTraceNum:{ type: String, required:true },
  // merchantNum:  { type: String, required:true },
  // status:{ type: Number, required:true, default: 0 }, // 0 - pending, 1 - requiring, 2 - required success, 3 - required failed, 4 - other error

        


        //entryRecordFacade.findOne()
        res.status(201).json({response_status:'SUCCESS', response_describe:'', data:doc});
    })
    .catch(err => next(err));
  }
}

module.exports = new EntryRecordController(entryRecordFacade);
