import {useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Base_url, Header} from "./header";
import axios from "axios";

    const Search = (props) => {
        let { locationList } = props;
        let { id, name } = useParams();
        let navigate = useNavigate();
        let [filterData, setFilterData] = useState({
          mealType: id,
          sort: 1,
        });
        let [restaurants, setRestaurants] = useState([]);
        // mealType (mandatory), loca_id, lCost, hCost, sort (mandatory)
        let getFilterData = async () => {
          let url = Base_url + "filter";
          let { data } = await axios.post(url, filterData);
          console.log(data); 
          setRestaurants(data.RestaurantList);
        };
        let setFilterForPage = (event) => {
          let { value, name } = event.target;
          switch (name) {
            case "location":
              if (value === "") {
                delete filterData.loca_id;
                setFilterData({ ...filterData });
              } else {
                setFilterData({ ...filterData, loca_id: Number(value) });
              }
              break;
            case "sort":
              // {} are stored by reference
              // state we need recreate the object
              setFilterData({ ...filterData, sort: Number(value) });
              break;
            case "cost":
              let array = value.split("-"); //0-5000 ==> [ 0 , 500]
              setFilterData({
               ...filterData,
                lCost: Number(array[0]),
                hCost: Number(array[1]),
              });
              break;
            case "cuisine":
                if (value === "") {
                    delete filterData.cuisine;
                    setFilterData({ ...filterData });
                  } else {
                    setFilterData({ ...filterData, cuisine: String(value) });
                  }
                  break;
            case "page":
                setFilterData({ ...filterData, page: Number(value)});
            }
        };
        useEffect(() => {
          getFilterData();
          // on mounting + on update
        }, [filterData]);

    return(
    <> 
    {/* <!-- upper-red-section start--> */}
    <div className="container-fluid">
        <div className="row bg-danger justify-content-center">
            <Header/>
        </div>
    </div> 
    {/* <!--upper-red-section end--> */}

    {/* <!--lower-grey-section start--> */}
    <section className="container-fluid bg-light">
        <p className="row ps-lg-4 px-1 h1 fw-bolder colour-blue">
            Breakfast Places in Mumbai
        </p>
        <aside className="row ps-lg-5">
            {/* <!--left-side-filter-section start--> */}
            {/* <div className="col-12 dropdown" ></div> */}
            <button className="col-12 btn font-sixteen colour-blue bg-white d-lg-none mx-2" data-bs-toggle="collapse" data-bs-target="#collapseFilter" aria-controls="collapseFilter">Filter/Sort</button>
            <form className="col-lg-2 col-12 font-sixteen colour-blue bg-white d-flex flex-column justify-content-center px-3 me-4 ">
                <p className="h5 d-none d-lg-block fw-bolder">Filters</p>
                {/* <!--location--> */}
                <div className="collapse show" id="collapseFilter">
                <div>
                    <label htmlFor="location" className="fontsixteen form-label">Select Location</label>  
                    <div>
                        <select name="location" className="my-2 form-select form-select-sm colour-grey" onChange={setFilterForPage}>
                        <option value="fontten"> Enter any Location </option>
                        {locationList.map((location,index) =>{
                            return(
                                <option key = {index} value={location.city_id}>
                                    {location.name} 
                                </option>
                            );
                        })}
                        </select>
                    </div>
                </div>
                {/* <!--Cuisine-checkbox--> */}
                <div>
                    <label htmlFor="cuisine" className="pt-3 pb-2">Cuisine</label>    
                    <div className="colour-grey">
                        <input type="checkbox" className="form-check-input" name="cuisine" value="1" onChange={setFilterForPage}/>
                        <label htmlFor="" className="form-check-label">&ensp;North Indian</label>
                    </div>
                    <div className="colour-grey py-1">
                        <input type="checkbox" className="form-check-input" name="cuisine" value="2" onChange={setFilterForPage}/>
                        <label htmlFor="" className="form-check-label">&ensp;South Indian</label>
                    </div>
                    <div className="colour-grey">
                        <input type="checkbox" className="form-check-input" name="cuisine" value="3" onChange={setFilterForPage}/>
                        <label htmlFor="" className="form-check-label">&ensp;Chinese</label>
                    </div>
                    <div className="colour-grey py-1">
                        <input type="checkbox" className="form-check-input" name="cuisine" value="4" onChange={setFilterForPage}/>
                        <label htmlFor="" className="form-check-label">&ensp;Fast Food</label>
                    </div>
                    <div className="colour-grey">
                        <input type="checkbox" className="form-check-input" name="cuisine" value="5" onChange={setFilterForPage}/>
                        <label htmlFor="" className="form-check-label">&ensp;Street Food</label>
                    </div>
                </div>
                {/* <!--cost-radio--> */}
                <div>
                    <label htmlFor="sort" className="pt-3 pb-2">Cost for Two</label>    
                    <div className="colour-grey">
                        <input type="radio" className="form-check-input" name="cost" value="0-500" onChange={setFilterForPage}/>
                        <label htmlFor="" className="form-check-label">&ensp;0 - 500</label>
                    </div>
                    <div className="colour-grey py-1">
                        <input type="radio" className="form-check-input" name="cost" value="500-1000" onChange={setFilterForPage}/>
                        <label htmlFor="" className="form-check-label">&ensp;500 - 1000</label>
                    </div>
                    <div className="colour-grey">
                        <input type="radio" className="form-check-input" name="cost" value="1000-1500" onChange={setFilterForPage}/>
                        <label htmlFor="" className="form-check-label">&ensp;1000 - 1500 </label>
                    </div>    
                    <div className="colour-grey py-1">
                        <input type="radio" className="form-check-input" name="cost" value="1500-2000" onChange={setFilterForPage}/>
                        <label htmlFor="" className="form-check-label">&ensp;1500 - 2000</label>
                    </div>
                    <div className="colour-grey"> 
                        <input type="radio" className="form-check-input" name="cost" value="2000-99999" onChange={setFilterForPage}/>
                        <label htmlFor="" className="form-check-label">&ensp;2000+</label>    
                    </div>
                </div>
                {/* <!--sort-radio--> */}
                <div>
                    <label htmlFor="sort" className="pt-3 pb-2">Sort</label>
                    <div className="colour-grey">
                        <input type="radio" className="form-check-input" name="sort" value="1" 
                           checked={filterData.sort === 1 ? true : false}
                           onChange={setFilterForPage}/>
                        <label htmlFor="" className="form-check-label">&ensp;Price Low to High</label>
                    </div>
                    <div className="colour-grey py-1">
                        <input type="radio" className="form-check-input" name="sort" value="-1"
                           checked={filterData.sort === -1 ? true : false}
                           onChange={setFilterForPage}/>
                        <label htmlFor="" className="form-check-label">&ensp;Price High to Low</label> 
                    </div>
                </div>
                {/* <button className="col-10 bg-danger text-white fontten p-1" type="submit">Submit</button> */}
                </div>
            </form>
            {/* <!--left-Side-fiter-section end--> */}
        
            {/* <!--right-side-food-section start--> */}
            <section className="col-10 col-lg-8 ">
            {restaurants.length == 0 ? (
                <>
                  <p className="text-center h3 text-danger">No Result Found</p>
                </>
              ) : (
                restaurants.map((restaurant, index) => {
                    return(
                        <section onClick={() => navigate(`/restaurant/${restaurant._id}`)} 
                          key={index}
                          className="card search-box bg-white p-3 my-4">
                        <div className=" d-flex gap-lg-5 gap-2">
                        <img src="/IMAGE/assets/breakfast.png" className="col-4 search-food-img rounded-4" alt="Big Chilly"/>
                        <div className="col-7 colour-blue">
                            <p className="h3 fw-bolder">{restaurant.name}</p>
                            <p className="font-sixteen">{restaurant.locality.toUpperCase()}</p>
                            <p className="colour-grey fontsixteen m-0">{restaurant.address}</p>
                        </div></div>
                        <hr/>
                        <div className="col-10 colour-grey">
                            <p className="m-0">CUISINES: <span className="colour-blue">{restaurant.Cuisine.map((csi)=>{return csi.name + " , "})}</span></p>
                            <p>Cost for Two <span className="colour-blue">{restaurant.cost}</span> </p>
                        </div>
                        </section> 
                    );
                })
            )}
            </section>
        </aside>

        {/* <!--Page-section--> */}
        <ul className="col-10 pagination justify-content-center">
            <li className="page-item">
                <a className="page-link"  href="">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
                    <li className="page-item">
                        <button className="page-link active" name="page" value="1"
                            onClick={setFilterForPage} href="">1</button>
                    </li>
                    <li className="page-item">
                        <button className="page-link" name="page" value="2"
                            onClick={setFilterForPage} href="">2</button>
                    </li>
                    <li className="page-item">
                    <button className="page-link" name="page" value="3"
                            onClick={setFilterForPage} href="">3</button>
                    </li>
                    <li className="page-item">
                    <button className="page-link" name="page" value="4"
                            onClick={setFilterForPage} href="">4</button>
                    </li>
                    <li className="page-item">
                    <button className="page-link" name="page" value="5"
                            onClick={setFilterForPage} href="">5</button>
                    </li>
                    <li className="page-item">
                    <a className="page-link" href="#">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                    </li>
        </ul>
        {/* <!--right-side-food-section end--> */}
        
    </section> 
    {/* <!--lower-grey-section end--> */}

        </>
    );
};

export default Search;