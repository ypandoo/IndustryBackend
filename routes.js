const Router = require('express').Router;
const router = new Router();

const fee = require('./model/fee/router');
const entry = require('./model/entry/router');
const verfication = require('./model/verfication/router');
const entryRecord = require('./model/entryRecord/router');
const transfer = require('./model/transfer/router');
const path = require('path');

router.route('/').get((req, res) => {

  res.sendFile(path.join(__dirname, './', 'testpage.html'));

});

router.use('/fee', fee);
router.use('/entry', entry);
router.use('/verfication', verfication);
router.use('/entryRecord', entryRecord);
router.use('/transfer', transfer);

module.exports = router;
