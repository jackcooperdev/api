// noinspection JSValidateTypes

const mongoose = require('mongoose');
const authSchema = mongoose.Schema({
  name: {type: String, required: true},
  id: {type: String, required: false},
  email: {type: String, required: false}
});
const myDB = mongoose.connection.useDb('mariokart');


module.exports = myDB.model('user', authSchema);
