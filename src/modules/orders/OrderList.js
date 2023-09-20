import React, {useEffect} from "react";
import * as orderActions from '../../redux/orders/order.actions';
import * as orderReducer from '../../redux/orders/order.reducer';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../layout/util/spinner/Spinner";
import EmptyOrder from '../../assets/img/emptyOrder.jpg';

let OrderList=()=>{
    let dispatch=useDispatch();
    let orderInfo=useSelector((state)=>{
       return state[orderReducer.orderFeatureKey];
    });
    let {loading,orders}=orderInfo;
      useEffect(()=>{
          dispatch(orderActions.getAllOrders());
      },[]);
    return(
        <React.Fragment>
            <section className="bg-brown-single p-2">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h5 className="font-weight-bold"><i className="fa fa-list-check"/> Your Orders</h5>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner/> : <React.Fragment>
                    <section>
                        <div className="container mt-5 mb-5">
                            {
                                orders?.length > 0 ? <React.Fragment>
                                    <div className="row">
                                        <div className="col m-auto">
                                            <div className="card">
                                                <div className="card-header bg-info">
                                                    <h5 className="font-weight-bold">Your Orders</h5>
                                                </div>
                                                <div className="card-body text-center">
                                                    <table className="table  m-0  table-hover table-bordered table-striped table-info">
                                                        <thead className="">
                                                        <tr>
                                                            <th className="font-weight-bold">Order ID</th>
                                                            <th className="font-weight-bold">NAME</th>
                                                            <th className="font-weight-bold">EMAIL</th>
                                                            <th className="font-weight-bold">ITEMS</th>
                                                            <th className="font-weight-bold">AMOUNT</th>
                                                            <th className="font-weight-bold">ORDER DATE</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                            orders?.length > 0 ?
                                                                <React.Fragment>
                                                                    {
                                                                        orders?.map((order)=>{
                                                                            return(
                                                                                <tr key={order._id}>
                                                                                    <td><small>{order._id}</small></td>
                                                                                    <td>{order.name}</td>
                                                                                    <td>{order.email}</td>
                                                                                    <td>
                                                                                        <ul className="list-group">
                                                                                            {
                                                                                                order.items.map((item,index)=>{
                                                                                                    return(
                                                                                                        <li className="list-group-item font-italic">
                                                                                                            <small>Name:{item.name},brand:{item.brand},Qty:{item.qty},price:&#8377;{item.price}</small>
                                                                                                        </li>
                                                                                                    )
                                                                                                })
                                                                                            }
                                                                                        </ul>
                                                                                    </td>
                                                                                    <td className="font-weight-bold">&#8377;{order.total}</td>
                                                                                    <td>{order.createdAt}</td>
                                                                                </tr>
                                                                            )
                                                                        })
                                                                    }
                                                                </React.Fragment>: null
                                                        }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment> : <React.Fragment>
                                    <div className="text-center">
                                        <img src={EmptyOrder} width="350" height="200"  alt=""/>
                                        <h2 className="text-warning">No Orders</h2>
                                    </div>
                                </React.Fragment>
                            }
                        </div>
                    </section>
                </React.Fragment>
            }


        </React.Fragment>
    )
};
export default OrderList;