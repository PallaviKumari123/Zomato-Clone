// importing schema
const mongoose = require("mongoose");

// Creating Schema
const RestaurantSchema = new mongoose.Schema({
    _id : { type:String },
    name: { type:String },
    city_name : { type:String },
    city : { type: String },
    area : { type:String },
    locality : { type:String },
    thumb : { type:String },
    cost : { type:Number },
    address : { type:String },
    type : { type:Array },
    Cuisine : { type:Array },
});

//attaching schema to model
const RestaurantModel = mongoose.model('restaurant', RestaurantSchema, 'restaurants');
module.exports = RestaurantModel;