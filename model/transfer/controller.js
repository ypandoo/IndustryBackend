const Controller = require('../../lib/controller');
const transferFacade = require('./facade');
var http = require('http');
const request = require('request');

class TransferController extends Controller {

    transfer(req, res, next) {
        const url = 'http://222.128.108.174:20721/acquirer-war/odaServlet/api/v1';
        req.pipe(request.post(url, { json: true, body: req.body }), { end: false }).pipe(res);

        //     var data = {
        //     interfaceID:"oda_terminal_consume",
        //     pan:"6222620110000010752", 
        //     cardData:"9f26087c2f2d495e94e3639f2701809f101307020103a0a002010a010000092519479c34ce9f37040d5295d59f360200699505008004e0009a031703279c01009f02060000000005555f2a02015682027c009f1a0201569f03060000000000009f3303e0f1c89f34030203009f3501229f1e0832383336323637358408a0000003330101019f090200019f410400000672",
        //     merchantNum:"000000050000002"
        // }

        // var options = {
        //     host: 'http://192.168.199.185:8081/acquirer-war/',
        //     port: 8081,
        //     path: '/odaServlet/api/v1',
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //       'Content-Length': Buffer.byteLength(data)
        //     }
        //   };

        //   var httpreq = http.request(options, function (response) {
        //     response.setEncoding('utf8');
        //     response.on('data', function (chunk) {
        //       console.log("body: " + chunk);
        //     });
        //     response.on('end', function() {
        //       res.send('ok');
        //     })
        //   });
        //   httpreq.write(data);
        //   httpreq.end();

    }

    // transfter(req, res, next) {

    // var data = {
    //     interfaceID:"oda_terminal_consume",
    //     pan:"6222620110000010752", 
    //     cardData:"9f26087c2f2d495e94e3639f2701809f101307020103a0a002010a010000092519479c34ce9f37040d5295d59f360200699505008004e0009a031703279c01009f02060000000005555f2a02015682027c009f1a0201569f03060000000000009f3303e0f1c89f34030203009f3501229f1e0832383336323637358408a0000003330101019f090200019f410400000672",
    //     merchantNum:"000000050000002"
    // }

    // var options = {
    //     host: 'http://192.168.199.185:8081/acquirer-war/',
    //     port: 8081,
    //     path: '/odaServlet/api/v1',
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Content-Length': Buffer.byteLength(data)
    //     }
    //   };

    //   var httpreq = this.getHttp().request(options, function (response) {
    //     response.setEncoding('utf8');
    //     response.on('data', function (chunk) {
    //       console.log("body: " + chunk);
    //     });
    //     response.on('end', function() {
    //       res.send('ok');
    //     })
    //   });
    //   httpreq.write(data);
    //   httpreq.end();

    //   }
}

module.exports = new TransferController(transferFacade);