const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const bikeSchema = new mongoose.Schema({
    _id: {type:ObjectId,required:true},
    ID: {type:Number, required:true},
    Location: {type:String, required:true},
    Longitude: {type:Number, required:true},
    Latitude: {type:Number, required:true},
});
const myDB = mongoose.connection.useDb('hackathon');

module.exports = myDB.model('bike_stations', bikeSchema);