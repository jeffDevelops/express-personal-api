const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var VSTSchema = new Schema({
  title: String,
  developer: String,
  function: String
});

var VST = mongoose.model('VST', VSTSchema);

module.exports = VST;