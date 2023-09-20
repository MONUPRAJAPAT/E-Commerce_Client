import React from "react";
import {useDispatch, useSelector} from "react-redux";
import * as orderActions from '../../redux/orders/order.actions';
import * as orderReducer from '../../redux/orders/order.reducer';
import EmptyCart from '../../assets/img/Empty Shopping Cart on Behance - Google Chrome 19-09-2023 00_00_46.png';
import {Link} from "react-router-dom";

let Cart=()=>{
    let dispatch=useDispatch();
    let orderInfo=useSelector((state)=>{
        return state[orderReducer.orderFeatureKey];
    });
    let {cartItems}=orderInfo;

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
        return calTotal()+calTax();
    };
    const clickIncrCartItemQty=(productId)=>{
        dispatch(orderActions.incrCartItemQty(productId));
    };
    const clickDecrCartItemQty=(productId)=>{
        dispatch(orderActions.decrCartItemQty(productId));
    };
    const deleteCartItem=(productId)=>{
      dispatch(orderActions.deleteCartItem(productId));
    };
    return(
        <React.Fragment>
            <section className="bg-brown-single p-2">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h5 className="font-weight-bold"><i className="fa fa-shopping-cart"/> Your Cart</h5>
                        </div>
                    </div>
                </div>
            </section>
            {
                cartItems.length > 0?
                    <React.Fragment>
                        <section>
                            <div className="container mt-3">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="card">
                                            <div className="card-header heavy-rain-gradient ">
                                                <h5 className="font-weight-bold">Your Items</h5>
                                            </div>
                                            <div className="card-body">
                                                <table className="table table-hover table-bordered table-danger table-striped">
                                                    <thead className="">
                                                    <tr >
                                                        <th className="font-weight-bold">SNO</th>
                                                        <th className="font-weight-bold">Image</th>
                                                        <th className="font-weight-bold">Name</th>
                                                        <th className="font-weight-bold">Price</th>
                                                        <th className="font-weight-bold">Qty</th>
                                                        <th className="font-weight-bold">Action</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        cartItems.map((item,index)=>{
                                                          return (
                                                              <tr>
                                                                  <td>{index+1}</td>
                                                                  <td>
                                                                      <img src={item.image} width='30' height='45' alt=""/>
                                                                  </td>
                                                                  <td>{item.name}</td>
                                                                  <td className="font-weight-bold">&#8377; {Number(item.price).toFixed(2)}</td>
                                                                  <td>
                                                                      <i className="fa fa-minus-circle mx-1" onClick={clickDecrCartItemQty.bind(this,item._id)}/>
                                                                      {item.qty}
                                                                      <i className="fa fa-plus-circle mx-1" onClick={clickIncrCartItemQty.bind(this,item._id)}/>
                                                                  </td>
                                                                  <td>
                                                                      <button className="btn btn-warning btn-sm text-dark" onClick={deleteCartItem.bind(this,item._id)}>Delete</button>
                                                                  </td>
                                                              </tr>
                                                          )
                                                        })
                                                    }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card">
                                            <div className="card-header heavy-rain-gradient  ">
                                                <h5 className="font-weight-bold">Your Total</h5>
                                            </div>
                                            <div className="card-body">
                                                <ul className="list-group">
                                                    <li className="list-group-item list-group-item-success  font-weight-bold">Total : &#8377; {calTotal().toFixed(2)}</li>
                                                    <li className="list-group-item list-group-item-success font-weight-bold">Tax : &#8377; {calTax().toFixed(2)}</li>
                                                    <li className="list-group-item list-group-item-success font-weight-bold">Grand Total : &#8377; {calGrandTotal().toFixed(2)}</li>
                                                </ul>
                                                <div className="mt-3">
                                                    <Link to={'/orders/checkout'} className="btn btn-success btn-sm">CheckOut</Link>
                                                    <Link to={'/products/men'} className="btn btn-primary btn-sm">Shop More</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </React.Fragment> :
                    <React.Fragment>
                        <div className="mt-4 text-center">
                            <img src={EmptyCart} width="600" height="300" alt=""/>
                            <h3 className="text-warning">Your Cart is Empty!</h3>
                            <Link to={'/'} className="btn btn-info btn-sm">Continue Shopping</Link>
                        </div>
                    </React.Fragment>
            }
        </React.Fragment>
    )
};
export default Cart;