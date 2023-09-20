import React, {useEffect} from "react";
import kidsproduct1 from "../../assets/img/kidsproduct.webp";
import {useDispatch, useSelector} from "react-redux";
import * as productReducer from "../../redux/products/products.reducer";
import * as productActions from "../../redux/products/products.actions";
import Spinner from "../../layout/util/spinner/Spinner";
import {Link,useNavigate} from "react-router-dom";
import * as orderActions from "../../redux/orders/order.actions";

let KidsWear=()=>{
    let dispatch=useDispatch();
    let navigate=useNavigate();
    let productInfo=useSelector( (state)=>{
        return state[productReducer.productFeatureKey];
    });
    let {products,loading}=productInfo;
    useEffect(()=>{
        dispatch(productActions.getKidsWear());
    },[]);
    let clickAddToCart=(product)=>{
        product.qty=1;
        dispatch(orderActions.addToCart(product,navigate));
    };
    return(
        <React.Fragment>
            <section className="bg-brown-single p-2">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h5 className="font-weight-bold">Kids' Wear</h5>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                {
                    loading ? <Spinner/>:
                        <React.Fragment>
                            {
                                products?.length > 0?
                                    <React.Fragment>
                                        <div className="container mt-3">
                                            <div className="row">
                                                {
                                                    products.map((product)=>{
                                                        return (

                                                            <div className="col-md-3 mt-3" key={product._id}>
                                                                <div className="card ">
                                                                    <div className="card-header bg-white d-flex justify-content-center align-items-center overflow-hidden">
                                                                        <Link to={`/products/${product._id}`}>
                                                                            <img src={product.image}  alt="" height="250" width="200"/>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="card-body text-center">
                                                                        <small>{product.name}</small><br/>
                                                                        <small>{product.brand}</small><br/>
                                                                        <small className="font-weight-bold">&#8377; {product.price}</small><br/>
                                                                        <button className="btn btn-brown btn-sm text-dark" onClick={clickAddToCart.bind(this,product)}>Add to Cart</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </React.Fragment> : null
                            }
                        </React.Fragment>
                }
            </section>
        </React.Fragment>
    )
};
export default KidsWear;