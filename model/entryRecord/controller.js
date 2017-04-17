const Controller = require('../../lib/controller');
const entryRecordFacade = require('./facade');
const feeFacade = require('../fee/facade');
const request = require('request');
const moment = require('moment');


class EntryRecordController extends Controller {

    create(req, res, next) {
        //1. Notice monitor through socket io
        const io = this.getIO();
        const recordData = {
            cardNo: req.body.cardNo,
            warn: 0,
            ATC: req.body.ATC,
            entry_gateNo: req.body.entry_gateNo,
            entry_gateType: req.body.entry_gateType,
            entry_siteNo: req.body.entry_siteNo,
            entry_time: new Date().toISOString(),
            serialNo: req.body.serialNo,
            used: 0
        };
        io.emit('monitor', recordData);

        //Check
        if (!(recordData.entry_gateType == 1 || recordData.entry_gateType == 0))
            return res.status(201).json({ response_status: 'Failed', response_describe: 'Invalid gate type.', data: doc });

        //2. Save entry record
        const that = this;
        this.facade.create(req.body)
            .then(doc => {
                    //Enter record
                    if (recordData.entry_gateType == 0)
                        return res.status(201).json({ response_status: 'SUCCESS', response_describe: 'Enter record saved.', data: doc });

                    //Leave record
                    //3.Find  corresponding enter record
                    that.facade
                        .findOne({ entry_gateType: !recordData.entry_gateType, cardNo: recordData.cardNo, used: 0 })
                        .then(doc => {
                            console.log(doc);
                            if (!doc) { throw new Error('Cannot find corresponding enter record!') }

                            //set used for both record
                            that.facade.update({ _id: doc._id }, { used: 1 });

                            //save fee record
                            var feeData = {
                                currencyCode: "156",
                                pan: doc.cardNo,
                                amount: "000000000010",
                                sysTraceNum: "001609",
                                merchantNum: "000000050000012",
                                status: 0
                            }

                            feeFacade.create(feeData).then(doc => {
                                const requireForFee = {
                                    interfaceID: "oda_request_pay",
                                    currencyCode: doc.currencyCode,
                                    pan: doc.pan,
                                    amount: doc.amount,
                                    sysTraceNum: doc.sysTraceNum,
                                    merchantNum: doc.merchantNum
                                }

                                const _id = doc._id;

                                //4. request for fee here
                                var url = 'http://222.128.108.174:20721/acquirer-war/odaServlet/api/v1';
                                request.post(url, { json: true, body: requireForFee }, function(error, response, body) {
                                    if (!body) {
                                        //set require for fee status error
                                        feeFacade.update({ _id: _id, status: 1 });
                                        return res.status(201).json({ response_status: 'Failed', response_describe: "CSC communication error!", data: doc });
                                    }

                                    const feeUpdate = {
                                        status: 1,
                                        ACCT_BALANCE: body.oda_request_pay_response_info.ACCT_BALANCE,
                                        status_describle: body.response_status,
                                        ref_num: body.oda_request_pay_response_info.ref_num
                                    };

                                    feeFacade.update({ _id, _id }, feeUpdate).then(doc => {
                                        const recordData = {
                                            cardNo: requireForFee.pan,
                                            warn: 0,
                                            ATC: "",
                                            entry_gateNo: requireForFee.amount,
                                            entry_gateType: 3,
                                            entry_siteNo: requireForFee.merchantNum,
                                            entry_time: new Date().toISOString(),
                                            serialNo: feeUpdate.ref_num
                                        };
                                        io.emit('monitor', recordData);

                                        return res.status(201).json({ response_status: 'SUCCESS', response_describe: 'Leave record saved.Fee is charged successul!.', data: doc });
                                    }); //End of update fee 
                                });

                            });
                        }).catch(err => {
                            console.log(err);

                            const errData = {
                                cardNo: recordData.cardNo,
                                warn: 1,
                                ATC: err.message,
                                entry_gateNo: '',
                                entry_gateType: 3,
                                entry_siteNo: err.message,
                                entry_time: new Date().toISOString(),
                                serialNo: ''
                            };
                            io.emit('monitor', errData);

                            return res.status(201).json({ response_status: 'Failed', response_describe: err.message, data: doc });
                        });
                }

            )
    }

}


module.exports = new EntryRecordController(entryRecordFacade);