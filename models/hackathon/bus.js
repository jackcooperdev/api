const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const busSchema = new mongoose.Schema({
    _id: {type:ObjectId,required:true},
    AtcoCode: {type:String, required:true},
    CommonName: {type:String, required:true},
    StopType: {type:String, required:true},
    Longitude: {type:Number, required:true},
    Latitude: {type:Number, required:true},
});
const myDB = mongoose.connection.useDb('hackathon');

module.exports = myDB.model('bus_stops', busSchema);