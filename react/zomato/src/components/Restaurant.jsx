import axios from "axios";
import { Base_url, Header} from "./header";
import{ useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Restaurant = (props) => {
    let {id} = useParams();
    
    let [rDetails , setrDetails] = useState([]);
    let [menuList , setMenuList] = useState([]);
    const [total, setTotal] = useState(0);

  // user details
   const [name, setName] = useState(props.user ? props.user.name : "");
   const [email, setEmail] = useState(props.user ? props.user.email : "");
   const [mobile, setMobile] = useState("9999999999");
   const [address, setAddress] = useState("Swargate , Pune");

    let getRestList = async() => {
        let url = Base_url + "restaurant-list-byid/" + id;
        let { data } = await axios.get(url);
        setrDetails(data.details);   
      }

    let getMenuList = async() => {
        let url = Base_url + "menu-list";
        let { data } = await axios.get(url);
        setTotal(0);
        setMenuList(data.menuList);
    }
    
    let addQty = (index) => {
        console.log(index);
        let _menuItemList = [...menuList];
        _menuItemList[index].qty += 1;
        let newTotal = _menuItemList[index].price + total;
        setTotal(newTotal);
        setMenuList(_menuItemList);
      };
      let removeQty = (index) => {
        console.log(index);
        let _menuItemList = [...menuList];
        _menuItemList[index].qty -= 1;
        let newTotal = total - _menuItemList[index].price;
        setTotal(newTotal);
        setMenuList(_menuItemList);
      };
      let makePayment = async () => {
        // hit order details api
        let url = Base_url + "gen-order-details";
        let { data } = await axios.post(url, { amount: total });
        if (data.status === false) {
          alert("Unable to create order details");
          return false;
        }
        let { order } = data;
        var options = {
          key: "rzp_test_FxTJb1BSlD6qTT", // Enter the Key ID generated from the Dashboard
          amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: order.currency,
          name: "Edureka Zomato Clone",
          description: "Online Food Delivery",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/b/bb/Square_zomato_logo_new.png?20180511061014",
          order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          handler: async (response) => {
            let userOrders = menuList.filter((menu_item) => {
              return menu_item.qty > 0;
            });
            let sendData = {
              pay_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              signature: response.razorpay_signature,
              orders: userOrders,
              name: name,
              email: email,
              contact: mobile,
              address: address,
              totalAmount: total,
              rest_id: rDetails._id,
              rest_name: rDetails.name,
            };
            let url = Base_url + "verify-payment";
            let { data } = await axios.post(url, sendData);
            if (data.status === true) {
              alert("Payment done successfully");
            } else {
              alert("Payment Fail, try again.");
            }
          },
          prefill: {
            name: name,
            email: email,
            contact: mobile,
          },
        };
        var razorpay = new window.Razorpay(options);
        razorpay.on("payment.failed", function (response) {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });
        razorpay.open(); // payment window of Razorpay
      };


    useEffect(() => {
        getRestList();
        getMenuList();
    },[]);

    return(
    <> 
    <div className="container-fluid">
        <div className="row bg-danger justify-content-center">
            <Header/>
        </div>
    </div>                      
   
    {/* <!--Image & click Gallary section--> */}
    <div className="container-fluid p-4 px-lg-5 bg-light">
        <div className="row px-lg-5">
            <div className="col-12 position-relative pb-4">
                <img className="gallaryimg w-100 " src="../IMAGE/largebigchilly.png" alt="loading.."/>
                {/* <!--Click Gallary Buuton; id: gallary(modal used)--> */}
                <button type="button" className="btn gallarybtn colour-blue bg-light rounded-0" data-bs-toggle="modal" data-bs-target="#gallary">
                    Click to view Gallary
                </button>
            </div>
        </div>
        {rDetails?.map((rest, index) => (
        <p key={index} className="h2 ps-lg-5 py-3 fw-bolder colour-blue">{rest.name} </p>
        ))}
        {/* <!--overview, contact and place order section-->     */}
        <section className="row px-lg-5 justify-content-between"> 
            <ul className="col-7 fontsixteen nav nav-tabs" id="restaurant-tab">
                <li className="col-lg-4 col-6 nav-item">
                    <a className="nav-link colour-blue active" href="#overview" data-bs-toggle="tab">
                        Overview  
                    </a>
                </li>
                <li className="col-lg-4 col-6 nav-item">
                    <a className="nav-link colour-blue " href="#contact" data-bs-toggle="tab">
                        Contact  
                    </a>
                </li>
            </ul>
            {/* <!--Place Order Button; id:orderpg(modal used)--> */}
            <button className="col-lg-3 col-4 btn btn-danger text-white fontsixteen px-lg-3" data-bs-toggle="modal" data-bs-target="#orderpg">Place Order</button>
            <hr/>
            {rDetails?.map((rest, index) => (
               <div key={index} className="tab-content fontsixteen">
                
                <div  className="tab-pane show fade active" id="overview">
                    <p className="my-4 colour-blue fw-bolder">About this place</p>  
                    <p className="mt-5 colour-blue fw-bolder">Cuisine</p> 
                      
                    <p className="my-3">{rest.Cuisine.map((csi)=>{return csi.name + " , "})}</p> 
                   
                
                    <p className="mt-5 colour-blue fw-bolder">Average Cost</p>
                    
                    <p className="my-3 mb-5">₹{rest.cost} for two people (approx.)</p> 
                     
                </div>
                
                
                
                    
                <div  className="tab-pane fade" id="contact">
                    <p className="mt-5 h5">Phone Number</p>
                       
                    <p className="my-2 text-danger">+91{rest.contact_number}</p> 
                    
                    <p className="mt-5 colour-blue fw-bolder">{rest.name}</p> 
                    <p className="mt-2">{rest.address}</p> 
                    <p>{rest.city_name}</p> 
                    
                </div>
               
              </div>
               ))}  
             
        </section>
    </div>
        
    {/* <!-- modal for Gallary; id:gallary--> */}
    <div className="modal fade bg-dark" id="gallary" tabIndex="-1"  aria-hidden="true">
        <div className="modal-dialog ">
            <div className="modal-content ">
                <div className="modal-header bg-dark ">
                    <button type="button" className="btn-close btn-close-white " data-bs-dismiss="modal" aria-label="Close"></button>
                </div>    
                <div className="carousel slide" id="image-slide">
                    <div className="carousel-inner"> 
                        {rDetails?.map((value, index) => {
                            return(
                                <div key={index} className="carousel-item active">
                                    <img src={value.thumb} className="d-block w-100" alt=".33333."/>
                                </div>  
                            );

                        })} 
                        <div className="carousel-item ">
                            <img src="../IMAGE/assets/drinks.png" className="d-block w-100" alt=".11133333."/>
                        </div>
                        <div className="carousel-item ">
                            <img src="../IMAGE/assets/lunch.png" className="d-block w-100" alt=".11133333."/>
                        </div>
                        <div className="carousel-item ">
                            <img src="../IMAGE/assets/dinner.png" className="d-block w-100" alt=".11133333."/>
                        </div> 
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#image-slide" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#image-slide" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    </button>
                </div>             
            </div>
        </div>
    </div> 

    {/* <!-- modal for place order; id:orderpg--> */}
    <div className="modal fade" id="orderpg" tabIndex="-1"  aria-hidden="true">
        <div className="container-fluid modal-dialog">
            <div className="row modal-content p-4">
                <div className="modal-header">
                {rDetails?.map((rest, index) => (
                <p key={index} className="h2 m-0 fw-semibold colour-blue">{rest.name} </p>
                ))}
                    <button className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                    {menuList.map((menu, index) => { 
                        return(
                            <div key={index} className="row">
                                <div className="col-8">
                                    <img src="../IMAGE/vegLogo.png" className="vegLogo" alt="...."/>
                                    <p className="fontsixteen m-0">{menu.name}</p>
                                    <p className="fontsixteen m-0">{"`"+menu.price}</p>
                                    <p className="fontten text-dark">{menu.description}</p>
                                </div>
                                <div className="col-4 d-flex flex-column justify-content-center">
                                    <img className="rounded-4" src={"../IMAGE/"+menu.image} alt="restaurant"/>
                                    {menu.qty > 0 ? (
                                        <div className="order-item-count section ">
                                            <span className="hand" onClick={() => removeQty(index)}> - </span>
                                            <span>{menu.qty}</span>
                                            <span className="hand" onClick={() => addQty(index)}> + </span>
                                        </div>
                                    ) : (
                                        <button className="btn btn-primary btn-sm add" onClick={() => addQty(index)}>
                                             Add </button>
                                    )}
                                </div>
                    {/* </div> */}
                                <hr className=" p-0 my-2" />
                            </div>
                        );
                    })}
                    {total > 0 ? (
                        <div className="d-flex justify-content-between">
                            <h3>Subtotal: {total}</h3>
                            <button className="btn btn-danger" data-bs-target="#pay" data-bs-toggle="modal">
                                Pay Now </button>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    </div>

    {/* <!-- modal for pay now; id:pay--> */}
    <div className="modal fade" id="pay" tabIndex="-1"  aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel2">
                {rDetails.name} User Form
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter full Name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Address
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={address}
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-danger"
                data-bs-target="#modalMenuItem"
                data-bs-toggle="modal"
              >
                Back
              </button>
              <button className="btn btn-success" onClick={makePayment}>
                Make Payment
              </button>
            </div>
          </div>
        </div>
    </div>
    </>
    );
};

export default Restaurant;