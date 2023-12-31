const locationsModel = require("../module/locationsModel");
const RestaurantModel = require ("../module/RestaurantModel");
const mealtypeModel = require ("../module/mealtypeModel");
const menuModel = require ("../module/menuModel");
const { request, response } =require ("express");


module.exports.getLocationList = async(request, response) =>{
    //get list
    try{
        let locationList =  await locationsModel.find();

        let jsonData = {
             status: locationList.length === 0 ? false : true,
            locationList: locationList,
        };
        response.status(200).send(jsonData);
    }catch (error) {
        let errorObj = { status: false, error };
        response.status(500).send(errorObj);
    }
};

module.exports.getRestaurantList =async(request, response) => {
    try{
        let restaurantList =  await RestaurantModel.find();
        let jsonData = {
             status: restaurantList.length === 0 ? false : true,
             restaurantList: restaurantList,
        };
        response.status(200).send(jsonData);
    }catch (error) {
        response.status(500).send("database error");
    }
}

module.exports.getMealTypeList = async(request , response ) => {
    try{
        let mealTypeList = await mealtypeModel.find();
        let jsonData ={
            status : mealTypeList.length === 0 ? false : true,
            mealTypeList :mealTypeList
        };
        response.status(200).send(jsonData);
    }catch (error) {
        let errorObj = { status: false, error };
        response.status(500).send(errorObj);
    }
};

module.exports.getMenuList = async(request, response) =>{
    //get list
    try{
        let menuList =  await menuModel.find();
    
        let jsonData = {
            status: menuList.length === 0 ? false : true,
            menuList: menuList,
        };
        response.status(200).send(jsonData);
    }catch (error) {
        let errorObj = { status: false, error };
        response.status(500).send(errorObj);
    }
};
 
module.exports.getRestaurantById = async(request, response) =>{
    let { _id } = request.params;
    try{
        let filter = {_id : _id};
        let restaurant= await RestaurantModel.find(filter);
       console.log(restaurant);
       let sendData = {
        status: restaurant.length === 0 ? false : true,
        details: restaurant,
        count: restaurant.length,
      };
      response.status(200).send(sendData);
    }catch (error) {
        let errorObj = { status: false, error };
        response.status(500).send(errorObj);
    }  
};

module.exports.filter = async (request, response) => {
    try {
      let { mealType, loca_id, cuisine, page, lCost, hCost, sort } = request.body;
      let filter = {}; // {} ==> get all data
      // add a runtime value in JSON or js object ===>
      
      if (mealType !== undefined) filter["type.mealtype"] = mealType;
      if (loca_id !== undefined) filter["city"] = loca_id;
      if (cuisine !== undefined) filter["Cuisine.cuisine"] = cuisine;
      if (lCost !== undefined && hCost !== undefined) {
        filter["cost"] = { $lt: hCost, $gt: lCost };
      }
  
      // -1 dec , 1 asc
       console.log(filter);
      
      //pagenation of data
      let show = 2; // to show data on 1 page
      let leave = (page - 1) * show ; //skippping other previous data on further pages
        
      let RestaurantList = await RestaurantModel.find(filter).sort({
        cost: sort,
      }).limit(show).skip(leave);
      let sendData = {
        status: RestaurantList.length === 0 ? false : true,
        RestaurantList,
        count: RestaurantList.length,
      };
      response.status(200).send(sendData);
    } catch (error) {
      let errorObj = { status: false, error };
      response.status(500).send(errorObj);
    }
  };