import React from "react";
import {useSelector} from "react-redux";
import {Link} from 'react-router-dom';
import * as orderReducer from '../../redux/orders/order.reducer';
import Spinner from "../../layout/util/spinner/Spinner";

let OrderSuccess=()=>{
    let orderInfo=useSelector( (state)=>{
        return state[orderReducer.orderFeatureKey];
    });
    let {order,loading}=orderInfo;
    const calTotal=()=>{
        let total=0;
        for(let item of order.items){
            total += item.price * item.qty;
        }
        return Number(total);
    };
    const calTax=()=>{
        let tax= Number(process.env.REACT_APP_PRODUCT_TAX);
        return Number(calTotal()*tax/100);
    };
    const calGrandTotal=()=>{
        return Number(calTotal()+calTax());
    };
    const downloadReceipt=(event)=>{
        event.preventDefault();
        return window.print();
    };
 return(
     <React.Fragment>
         <section className="bg-brown-single p-2">
             <div className="container">
                 <div className="row">
                     <div className="col">
                         <h5 className="font-weight-bold"><i className="fa fa-check-circle"/> Order Success</h5>
                     </div>
                 </div>
             </div>
         </section>
         {
             loading ? <Spinner/> :
                 <React.Fragment>
                     {
                         Object.keys(order).length > 0?
                             <React.Fragment>
                                 <section>
                                     <div className="container mt-5 mb-5">
                                         <div className="row">
                                             <div className="col-md-10 m-auto">
                                                 <div className="card">
                                                     <div className="card-header bg-light">
                                                         <h5 className="font-weight-bold">Order Details</h5>
                                                     </div>
                                                     <div className="card-body">
                                                         <ul className="list-group">
                                                             <li className="list-group-item">
                                                                 Order ID : {order._id}
                                                             </li>
                                                             <li className="list-group-item">
                                                                 NAME : {order.name}
                                                             </li>
                                                             <li className="list-group-item">
                                                                 EMAIL : {order.email}
                                                             </li>
                                                             <li className="list-group-item">
                                                                 MOBILE NO. : {order.mobile}
                                                             </li>
                                                         </ul>
                                                         <table className="table table-hover table-borderless table-success mt-2">
                                                             <thead>
                                                             <tr>
                                                                 <th className="font-weight-bold">SNO.</th>
                                                                 <th className="font-weight-bold">Item Name</th>
                                                                 <th className="font-weight-bold">Brand</th>
                                                                 <th className="font-weight-bold">Item Qty</th>
                                                                 <th className="font-weight-bold">Item Price</th>
                                                                 <th className="font-weight-bold">Total</th>
                                                             </tr>
                                                             </thead>
                                                             <tbody>
                                                             {
                                                                 order?.items.map((item,index)=>{
                                                                     return (
                                                                         <tr key={item._id}>
                                                                             <td>{index+1}</td>
                                                                             <td>{item.name}</td>
                                                                             <td>{item.brand}</td>
                                                                             <td>{item.qty}</td>
                                                                             <td className="font-weight-bold">&#8377; {item.price}</td>
                                                                             <td className="font-weight-bold">&#8377; {(item.price) * (item.qty)}</td>
                                                                         </tr>
                                                                     )
                                                                 })
                                                             }
                                                             <tr>
                                                                 <td colSpan='4'> </td>
                                                                 <td colSpan='2' className="font-weight-bold">Tax : &#8377; {calTax()} </td>
                                                             </tr>
                                                             <tr>
                                                                 <td colSpan='4'> </td>
                                                                 <td colSpan='2' className="font-weight-bold">Grand Total : &#8377; {calGrandTotal()}</td>
                                                             </tr>
                                                             </tbody>
                                                         </table>
                                                         <div>
                                                             <h5>NOTE: Your Shipment will be delivered soon :)</h5>
                                                             <button onClick={downloadReceipt} className="btn btn-secondary btn-sm">Print Order</button>
                                                             <Link to={'/'} className="btn btn-sm btn-success">Done</Link>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                         </div>
                                     </div>
                                 </section>
                             </React.Fragment>:<React.Fragment>
                             <h1 className="text-center">Please Place Some Order</h1>
                             </React.Fragment>
                     }
                 </React.Fragment>
         }
     </React.Fragment>
 )
};
export default OrderSuccess;