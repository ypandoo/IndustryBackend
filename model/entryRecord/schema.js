const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const entryRecordSchema = new Schema({
  serialNo: { type: String, required: true },
  entry_siteNo:  { type: String, required: true },
  entry_gateNo:  { type: String, required: true },
  cardNo:{type: String, required: true},
  ATC:  { type: String, required: true },
  entry_time: {type: Date, require: true},
  entry_gateType:{type: Number, required: true}
});

entryRecordSchema.pre('save', function(next) {
    if (this.isNew) {
        this.entry_time = Date.now();
    }

    next();
});
   

module.exports = mongoose.model('EntryRecord', entryRecordSchema);
