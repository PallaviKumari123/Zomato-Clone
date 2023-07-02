const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//creating schema
const menuSchema = new mongoose.Schema({
    _id : { type:Number },
    name : { type:String },
    description : { type:String },
    ingridients : { type:Array },   
    image : { type:String },
    qty: { type: Number },
    price: { type: Number },
     
});

//attaching schema to model
const menuModel = mongoose.model('menu', menuSchema, 'menu');
module.exports = menuModel;