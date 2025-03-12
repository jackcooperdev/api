
// noinspection JSValidateTypes

const mongoose = require('mongoose');

const trackSchema = mongoose.Schema({
  track_name: {type: String, required: true},
  cup_name: {type: String, required: true},
  base_times: {type: Array, required: false}


});
const myDB = mongoose.connection.useDb('mariokart');

module.exports = myDB.model('tracks', trackSchema);
