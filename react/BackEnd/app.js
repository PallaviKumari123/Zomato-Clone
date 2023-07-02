//server creation
const express  = require("express");
const app =  express();
const mongoose = require("mongoose");
const route = require("./route/app_route");
const cors = require("cors");
const MONGODB_URI = "mongodb://127.0.0.1:27017/zomato";

app.use(cors());

//enable all incoming json
    app.use(express.json());
//allow raw post data to convert to a js object
    app.use(express.urlencoded({extended: false}));

//route addition 
app.use("/",route);

//connecting database
mongoose.connect(MONGODB_URI)
    .then(() => {
        //port addition
        app.listen(5001, ()=> {
            console.log("server started at port::", 5001);
        });
    })
    .catch((error) => {
        console.log(error);
    });

