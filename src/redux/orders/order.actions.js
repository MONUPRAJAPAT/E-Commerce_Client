import axios from "axios";
import * as userUtil from "../../layout/util/userUtil";
import * as tokenUtil from "../../layout/util/tokenUtil";

export const ADD_TO_CART='ADD_TO_CART';
export const ADD_TO_CART_FAILURE='ADD_TO_CART_FAILURE';

export const INCR_CART_ITEM_QTY='INCR_CART_ITEM_QTY';
export const INCR_CART_ITEM_QTY_FAILURE='INCR_CART_ITEM_QTY_FAILURE';

export const DECR_CART_ITEM_QTY='DECR_CART_ITEM_QTY';
export const DECR_CART_ITEM_QTY_FAILURE='DECR_CART_ITEM_QTY_FAILURE';

export const DELETE_CART_ITEM='DELETE_CART_ITEM';
export const DELETE_CART_ITEM_FAILURE='DELETE_CART_ITEM_FAILURE';

export const MAKE_PAYMENT_REQUEST='MAKE_PAYMENT_REQUEST';
export const MAKE_PAYMENT_SUCCESS='MAKE_PAYMENT_SUCCESS';
export const MAKE_PAYMENT_FAILURE='MAKE_PAYMENT_FAILURE';

export const PLACE_ORDER_REQUEST='PLACE_ORDER_REQUEST';
export const PLACE_ORDER_SUCCESS='PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAILURE='PLACE_ORDER_FAILURE';

export const CLEAR_CART_ITEMS_SUCCESS='CLEAR_CART_ITEMS_SUCCESS';
export const CLEAR_CART_ITEMS_FAILURE='CLEAR_CART_ITEMS_FAILURE';

export const GET_ALL_ORDERS_REQUEST='GET_ALL_ORDERS_REQUEST';
export const GET_ALL_ORDERS_SUCCESS='GET_ALL_ORDERS_SUCCESS';
export const GET_ALL_ORDERS_FAILURE='GET_ALL_ORDERS_FAILURE';

export const addToCart=(item,navigate)=>{
  return async (dispatch)=>{
      try{
          dispatch({type:ADD_TO_CART, payload: {item:item}});
          navigate('/orders/cart');
      }
      catch (error){
          dispatch({type:ADD_TO_CART_FAILURE , payload: error.message});
      }
  }
};

export const incrCartItemQty=(productId)=>{
    return async (dispatch)=>{
        try{
            dispatch({type:INCR_CART_ITEM_QTY, payload: {productId:productId}});
        }
        catch (error){
            dispatch({type:INCR_CART_ITEM_QTY_FAILURE , payload: error.message});
        }
    }
};
export const decrCartItemQty=(productId)=>{
    return async (dispatch)=>{
        try{
            dispatch({type:DECR_CART_ITEM_QTY, payload: {productId:productId}});
        }
        catch (error){
            dispatch({type:DECR_CART_ITEM_QTY_FAILURE , payload: error.message});
        }
    }
};

export const deleteCartItem=(productId)=>{
    return async (dispatch)=>{
        try{
            dispatch({type:DELETE_CART_ITEM, payload: {productId:productId}});
        }
        catch (error){
            dispatch({type:DELETE_CART_ITEM_FAILURE , payload: error.message});
        }
    }
};
const handleOpenRazorpay=(data)=>{
    let options = {
        "key": process.env.REACT_APP_RAZORPAY_KEY_ID,
        "amount": data.amount,
        "currency": data.currency,
        "name": "Online Shopping",
        "description": "XYZ",
        "order_id": data.order_id,
        "handler": function (response){
            console.log(response);
        }
    };
    let rzp1 = new window.Razorpay(options);
    rzp1.open();
};
export const makePayment=(body,order,navigate)=>{
    return async (dispatch)=>{
        try{
            if(userUtil.isLoggedIn()){
                tokenUtil.setToken(userUtil.getToken());
            }
            dispatch({type:MAKE_PAYMENT_REQUEST});
            let dataUrl=`${process.env.REACT_APP_EXPRESS_SERVER}/api/payments/pay`;

            let response= axios.post(dataUrl,body)
                .then((response)=>{
                    handleOpenRazorpay(response.data);
                })
                .catch((err)=>{
                    console.log(err,42);
                });
            dispatch({type:MAKE_PAYMENT_SUCCESS , payload: response.data});
            dispatch(placeOrder(order,navigate));

        }
        catch (error){
            dispatch({type:MAKE_PAYMENT_FAILURE , payload:error});
        }
    }
};

export const placeOrder=(order,navigate)=>{
    return async (dispatch)=>{
        try{
            dispatch({type:PLACE_ORDER_REQUEST});
            let dataUrl=`${process.env.REACT_APP_EXPRESS_SERVER}/api/orders/`;
            let response= await axios.post(dataUrl,order);
            dispatch({type:PLACE_ORDER_SUCCESS , payload: response.data});
            dispatch(clearCartItems());
            navigate('/orders/order-success');
        }
        catch (error){
            dispatch({type:PLACE_ORDER_FAILURE , payload: error});
        }
    }
};

export const clearCartItems=()=>{
  return async (dispatch)=>{
      try{
          dispatch({type:CLEAR_CART_ITEMS_SUCCESS});
      }
      catch (error){
          dispatch({type:CLEAR_CART_ITEMS_FAILURE});
      }
  }
};

export const getAllOrders=()=>{
    return async (dispatch)=>{
        try{
            if(userUtil.isLoggedIn()){
                tokenUtil.setToken(userUtil.getToken());
            }
             dispatch({type:GET_ALL_ORDERS_REQUEST});
            let dataUrl=`${process.env.REACT_APP_EXPRESS_SERVER}/api/orders/list`;
            let response= await axios.get(dataUrl);
            dispatch({type:GET_ALL_ORDERS_SUCCESS , payload: response.data});
        }
        catch (error){
            dispatch({type:GET_ALL_ORDERS_FAILURE , payload: error});
        }
    }
}
