const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const feeSchema = new Schema({
    currencyCode: { type: String, required: true },
    pan: { type: String, required: true },
    amount: { type: String, required: true, default: "0", },
    sysTraceNum: { type: String, required: true },
    merchantNum: { type: String, required: true },
    status: { type: Number, required: true, default: 0 }, // 0 - pending, 1 - requiring, 2 - required success, 3 - required failed, 4 - other error
    status_describle: { type: String },
    ref_num: { type: String },
    ACCT_BALANCE: { type: String },
    created_time: { type: Date }
});

feeSchema.pre('save', function(next) {
    if (this.isNew) {
        this.created_time = Date.now();
    }

    next();
});

module.exports = mongoose.model('Fee', feeSchema);