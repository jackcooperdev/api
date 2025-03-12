// noinspection JSValidateTypes

const mongoose = require('mongoose');
const tracks = require('./tracks');
const user = require('./user');

const leaderSchema = mongoose.Schema({
  track_id: {type: mongoose.Schema.Types.ObjectId, ref: tracks},
  user: {type: mongoose.Schema.Types.ObjectId, ref: user},
  lapTimes: {type: Array, required: true},
  fastestTimeIdx: {type: Number, required: true},
  totalTime: {type: Number, required: true},
  marker: {type: Boolean, required: true}

});

const myDB = mongoose.connection.useDb('mariokart');

module.exports = myDB.model('lap', leaderSchema);
