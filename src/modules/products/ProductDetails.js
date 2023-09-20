import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams,useNavigate} from 'react-router-dom';
import * as productActions from '../../redux/products/products.actions';
import * as productReducer from '../../redux/products/products.reducer';
import Spinner from "../../layout/util/spinner/Spinner";
import * as orderActions from '../../redux/orders/order.actions';

let ProductDetails=()=>{
    let dispatch=useDispatch();
    let navigate=useNavigate();
    let productId = useParams().product_id;
    let [selectedQty,setSelectedQty]=useState('');
    let productInfo=useSelector( (state)=>{
        return state[productReducer.productFeatureKey];
    });
    let {loading,selectedProduct}=productInfo;
    useEffect(()=>{
        dispatch(productActions.getProduct(productId));
    },[productId]);
    let submitAddToCart=(event)=>{
        event.preventDefault();
        selectedProduct.qty= (selectedQty !== '')? Number(selectedQty) : 1;
        dispatch(orderActions.addToCart(selectedProduct,navigate));
    }
    return(

        <React.Fragment>
            <section className="bg-brown-single p-2">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h5 className="font-weight-bold">Your Selected Product</h5>
                        </div>
                    </div>
                </div>
            </section>
            {/*<pre>{productId}</pre>*/}
            {
                loading ? <Spinner/> :
                    <React.Fragment>
                        <div className="container mt-3">
                            <div className="row">
                                {
                                    Object.keys(selectedProduct).length >0  &&
                                        <React.Fragment>
                                            <div className="col-md-4 text-center">
                                                <img src={selectedProduct.image} className="img-fluid" alt=""/>
                                            </div>
                                            <div className="col-md-8">
                                                {/*<pre>{selectedQty}</pre>*/}
                                               <p className="h3">Name : {selectedProduct.name}</p>
                                               <p className="h5">Brand : {selectedProduct.brand}</p>
                                               <p className="h5 font-weight-bold">Price : &#8377;{selectedProduct.price}</p>
                                                <form action="" className="form-inline" onSubmit={submitAddToCart}>
                                                    <div className="form-group">
                                                        <select
                                                            value={selectedQty}
                                                            onChange={e=> setSelectedQty(e.target.value)}
                                                            className="form-control">
                                                            <option value="">Select Quantity</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <input type="submit" className="btn btn-brown btn-sm" value="Add to Cart"/>
                                                    </div>
                                                </form>
                                                <p>{selectedProduct.usage}</p>
                                                <p>{selectedProduct.description}</p>
                                            </div>
                                        </React.Fragment>

                                }
                            </div>
                        </div>
                    </React.Fragment>
            }

        </React.Fragment>

    )
};
export default ProductDetails;