import React from "react";
import {Link,useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as userReducer from '../../redux/users/users.reducer';
import * as orderReducer from '../../redux/orders/order.reducer';
import StripeCheckout from "react-stripe-checkout";
import * as orderActions from '../../redux/orders/order.actions';
import axios from "axios";


let CheckOut=()=>{
    let dispatch=useDispatch();
    let navigate=useNavigate();
    let userInfo= useSelector( (state)=>{
        return state[userReducer.userFeatureKey];
    });
    let orderInfo=useSelector( (state)=>{
       return state[orderReducer.orderFeatureKey];
    });
    let {cartItems}=orderInfo;
    let {loading , user}=userInfo;
    const calTotal=()=>{
        let total=0;
        for(let cartItem of cartItems){
            total += cartItem.price * cartItem.qty;
        }
        return total;
    };
    const calTax=()=>{
        let tax= Number(process.env.REACT_APP_PRODUCT_TAX);
        return calTotal()*tax/100;
    };
    const calGrandTotal=()=>{
        return Number(calTotal()+calTax());
    };
   const handlePayment=(amount)=>{
       let items= cartItems.map((item)=>{
          return {
              name:item.name,
              brand:item.brand,
              price:item.price,
              qty:item.qty
          }
       });
       let order={
           total: Number(calTotal()),
           tax: Number(calTax()),
           items:items

       }
       const _data={ amount: amount};
       dispatch(orderActions.makePayment(_data,order,navigate));

   };
    return(
        <React.Fragment>
            <section className="bg-brown-single p-2">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h5 className="font-weight-bold"><i className="fa fa-check-circle"/> CheckOut Items</h5>
                        </div>
                    </div>
                </div>
            </section>
            {
                <section>
                    <div className="container mt-5 mb-5">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="card">
                                    <div className="card-header bg-light">
                                         <span className="h5 font-weight-bold">Billing Address</span>
                                        <Link to={'/users/profile'} className="btn btn-dark btn-sm float-right">Update Address</Link>
                                    </div>
                                    <div className="card-body ">
                                          <ul className="list-group">
                                              <li className="list-group-item">
                                                  <small>House NO. : {user?.address?.flat}</small><br/>
                                                  <small>Street : {user?.address?.street}</small><br/>
                                                  <small>Landmark : {user?.address?.landmark}</small><br/>
                                                  <small>City : {user?.address?.city}</small><br/>
                                                  <small>State : {user?.address?.state}</small><br/>
                                                  <small>Country : {user?.address?.country}</small><br/>
                                                  <small>Pin code : {user?.address?.pin}</small><br/>
                                                  <small>Mobile : {user?.address?.mobile}</small><br/>
                                              </li>
                                          </ul>
                                    </div>
                                </div>
                                <div className="card mt-3">
                                    <div className="card-header bg-light">
                                       <span className="h5 font-weight-bold">Payment Details</span>
                                    </div>
                                    <div className="card-body">
                                        <form action="">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="exampleRadios"
                                                       id="exampleRadios1" value="option1" />
                                                <label className="form-check-label" htmlFor="exampleRadios1">
                                                    Cash On Delivery
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="exampleRadios"
                                                       id="exampleRadios2" value="option2" />
                                                <label className="form-check-label" htmlFor="exampleRadios2">
                                                    Credit Card Payment
                                                </label>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                {
                                    cartItems.length >0 &&
                                    <div className="card">
                                        <div className="card-header bg-light">
                                            <span className="h5 font-weight-bold">Your Cart</span>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <ul className="list-group">
                                                        {
                                                            cartItems.map((cartItem)=>{
                                                                return(
                                                                    <li id={cartItem._id} className="list-group-item align-items-center">
                                                                        <div className="row">
                                                                            <div className="col-md-4">
                                                                                <img src={cartItem.image} width="35" height="50" alt=""/>
                                                                            </div>
                                                                            <div className="col-md-8">
                                                                                  <small>{cartItem.name}</small><br/>
                                                                                  <small>&#8377; {cartItem.price}</small><br/>
                                                                                  <small>Qty : {cartItem.qty}</small><br/>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                    <ul className="list-group bg-brown mt-2">
                                                        <li className="list-group-item list-group-item-success font-weight-bold">Total : &#8377; {calTotal().toFixed(2)}</li>
                                                        <li className="list-group-item list-group-item-success font-weight-bold">Tax : &#8377; {calTax().toFixed(2)}</li>
                                                        <li className="list-group-item  list-group-item-success font-weight-bold">Grand Total : &#8377; {calGrandTotal().toFixed(2)}</li>
                                                    </ul>
                                                    <div className="mt-2">
                                                        <button onClick={handlePayment.bind(this,Number(calGrandTotal()))} className="btn btn-secondary btn-block">Pay &#8377; {calGrandTotal()}</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </section>
            }
        </React.Fragment>
    )
};
export default CheckOut;