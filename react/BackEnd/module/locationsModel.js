//importing schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//creating schema
const LocationsSchema = new mongoose.Schema({
    _id : { type:Number , minLength: 1},
    name : { type:String , required:true },
    city_id: { type: Number, minLength: 1 },
    location_id: { type: Number, minLength: 1 },
    country_name : { type:String , required:true }
    
});

//attaching schema to model
const locationsModel = mongoose.model('location', LocationsSchema, 'locations');
module.exports = locationsModel;