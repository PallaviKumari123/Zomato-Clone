import {useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Base_url, Header} from "./header";
import axios from "axios";

const  Home = (props) => {

    let navigate= useNavigate();
    
    let [locationList , setLocationList] = useState([]);
    let [restaurantList , setRestaurantList] = useState([]);
    let [mealTypeList, setMealTypeList ] = useState([]);

  let getLocationList = async() => {
    let url = Base_url + "location-list";
    let { data } = await axios.get(url);
    setLocationList(data.locationList);
    console.log(data);
  }

  let getRestaurantList = async() => {
    let url = Base_url + "restaurant-list";
    let { data } = await axios.get(url);
    setRestaurantList(data.restaurantList);
    console.log(data);
  }

  let getMealTypeList = async() => {
    let url = Base_url + "mealtype-list";
    let { data } = await axios.get(url);
    setMealTypeList(data.mealTypeList);
    console.log(data);
  }

useEffect(() =>{
    getLocationList();
    getRestaurantList();
    getMealTypeList();
},[]);

    return(
        <> 
            {/* <!--topmost background part start--> */}
    <header className="container-fluid background px-5 pb-5 text-center">
        <div className="row d-flex justify-content-center">
            {/* <!--topmost login and create account button--> */}
            <Header logo={false} user={props.user} />  
            <p className="col-11 brand d-flex justify-content-center align-items-center bg-white fw-bolder">e!</p>
            <p className="col-11 h2 text-white"><strong>Find the best restaurants, cafés, and bars</strong></p>
            {/* <!--bottom of background starts--> */}
            <div className="col-8 d-flex justify-content-center gap-3 pt-2">
                {/* <!--Location search--> */}
                <select type="text" className="col-4 ps-2 bg-white" placeholder="Enter any location">
                        <option value=""> Enter any Location </option>
                        {locationList.map((location,index) =>{
                            return(
                                <option key = {index} value={location.location_id}>
                                    {location.name} 
                                </option>
                            );
                        })}
                    </select>   
                
                {/* <!--restaurant search--> */}
                <div className="col-7 d-flex gap-0">
                    {/* <!--magnify glass y font awesome 4.7--> */}
                    <button type="submit" className="col-2 search-btn bg-white">
                        <i className="fa fa-search"></i>
                    </button>
                    <select type="text" className="col-10 ps-2 bg-white" placeholder="Search for Restaurants">
                            <option value=""> Search for Restaurants </option>
                            {restaurantList.map((restaurant,index) =>{
                                return(
                                    <option key = {index} value = {restaurant._id}>
                                        
                                                {restaurant.name +","+restaurant.locality} 
                                           
                                    </option>
                                );
                            })}
                    </select>
                </div>
            </div>
        </div>
    </header> 
    {/* <!--topmost background part end-->  */}
    {/* <!--bottom food part start--> */}
    <div className="container-fluid colour-background mt-5">
        <p className="h4 fw-bolder colour-blue px-1">
            <strong><font family="Poppins Bold 700">
                 Quick Searches </font></strong></p>
        <p className="h5 colour-grey px-1">Discover restaurants by type of meal</p>
        <section className="row d-flex p-4 gap-4">
            {mealTypeList.map((mealtype, index)=>{
                return(
                    <article 
                    onClick={() => navigate(`/search/${mealtype.meal_type}/${mealtype.name}`)} 
                    key={index}
                    className="food-box col-5 d-flex">
                <div className="card-body p-0">
                    <img src= {"/IMAGE/" + mealtype.image} className="food-img h-100" alt="breafst"/>
                </div>
                <div className="card-text p-3">
                    <p className="h6 fw-bold colour-blue">{mealtype.name}</p>
                    <p className="h6 colour-grey">{mealtype.content}</p>
                </div>
                    </article>
                );
            })} 
        </section>
    </div>
    {/* <!--bottom restaurant part end--> */}
        </>
    );
};

export default Home;