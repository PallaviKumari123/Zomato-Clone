const express = require("express");
const route = express.Router();     //Route function use  
const control = require("../controller/app_controller");
const { genOrderDetails,verifyPayment } = require("../controller/payment_controller");

route.get("/api/location-list", control.getLocationList);
route.get("/api/restaurant-list", control.getRestaurantList);
route.get("/api/mealtype-list", control.getMealTypeList);
route.get("/api/menu-list", control.getMenuList);
route.get("/api/restaurant-list-byid/:_id",control.getRestaurantById);
// route.get("/api/search-location/:city_name", control.searchLocation);
route.post("/api/filter",control.filter);
route.post("/api/gen-order-details", genOrderDetails);
route.post("/api/verify-payment", verifyPayment);

//exporting api links  to use in app.js(main file)
module.exports = route;