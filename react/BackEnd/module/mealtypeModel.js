//importing schema
const mongoose =require ("mongoose");
const Schema = mongoose.Schema ;

//creating schema
const mealtypeSchema = new mongoose.Schema({
    _id : {type:Number},
    name : {type:String},
    content : {type:String},
    image : {type:String},
    meal_type : {type:Number}
})

//attaching schema to model
const mealtypeModel = mongoose.model('mealtype' , mealtypeSchema , 'mealtype');

//exporting model
module.exports = mealtypeModel;