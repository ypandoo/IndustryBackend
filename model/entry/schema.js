const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const entrySchema = new Schema({
  entry_gateType:  { type: String, required:true },
  entry_gateNo:{type: String, required:true},
  entry_siteNo:{type: String, required:true},
  entry_siteName:{type: String, required:true}
});


module.exports = mongoose.model('Entry', entrySchema);
