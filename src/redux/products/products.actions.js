import axios from "axios";
// import * as alertActions from '../alert/alert.actions';
import * as userUtil from '../../layout/util/userUtil';
import * as tokenUtil from '../../layout/util/tokenUtil';
import  {toast} from "react-toastify";

export const UPLOAD_PRODUCT_REQUEST='UPLOAD_PRODUCT_REQUEST';
export const UPLOAD_PRODUCT_SUCCESS='UPLOAD_PRODUCT_SUCCESS';
export const UPLOAD_PRODUCT_FAILURE='UPLOAD_PRODUCT_FAILURE';

export const GET_MEN_PRODUCT_REQUEST='GET_MEN_PRODUCT_REQUEST';
export const GET_MEN_PRODUCT_SUCCESS='GET_MEN_PRODUCT_SUCCESS';
export const GET_MEN_PRODUCT_FAILURE='GET_MEN_PRODUCT_FAILURE';

export const GET_KIDS_PRODUCT_REQUEST='GET_KIDS_PRODUCT_REQUEST';
export const GET_KIDS_PRODUCT_SUCCESS='GET_KIDS_PRODUCT_SUCCESS';
export const GET_KIDS_PRODUCT_FAILURE='GET_KIDS_PRODUCT_FAILURE';

export const GET_WOMEN_PRODUCT_REQUEST='GET_WOMEN_PRODUCT_REQUEST';
export const GET_WOMEN_PRODUCT_SUCCESS='GET_WOMEN_PRODUCT_SUCCESS';
export const GET_WOMEN_PRODUCT_FAILURE='GET_WOMEN_PRODUCT_FAILURE';

export const GET_PRODUCT_REQUEST='GET_PRODUCT_REQUEST';
export const GET_PRODUCT_SUCCESS='GET_PRODUCT_SUCCESS';
export const GET_PRODUCT_FAILURE='GET_PRODUCT_FAILURE';

export const uploadProduct=(product,navigate)=>{
    return async (dispatch)=>{
        try{
            if(userUtil.isLoggedIn()){
                tokenUtil.setToken(userUtil.getToken());
            }
            dispatch({type:UPLOAD_PRODUCT_REQUEST});
            let datUrl=`${process.env.REACT_APP_EXPRESS_SERVER}/api/products/upload`;
            let response = await axios.post(datUrl,product);
            dispatch({type:UPLOAD_PRODUCT_SUCCESS , payload:response.data});
            // dispatch(alertActions.setAlert(response.data.msg,'success'));
            toast.success(response.data.msg);
            navigate('/');
        }
        catch (error){
            console.error(error);
            dispatch({type:UPLOAD_PRODUCT_FAILURE , payload:error.response.data});
            let errorList = error.response.data.errors;
            for (let error of errorList){
                // dispatch(alertActions.setAlert(error.msg,'danger'));
                toast.error(error.msg);
            }
        }
    }
};

export const getMensWear=()=>{
  return async (dispatch)=>{
      try{
          dispatch({type:GET_MEN_PRODUCT_REQUEST});
          let datUrl=`${process.env.REACT_APP_EXPRESS_SERVER}/api/products/men`;
          let response = await axios.get(datUrl);
          dispatch({type:GET_MEN_PRODUCT_SUCCESS , payload:response.data});
      }
      catch (error){
          console.error(error);
          dispatch({type:GET_MEN_PRODUCT_FAILURE , payload:error.response.data});
          let errorList = error.response.data.errors;
          for (let error of errorList){
              // dispatch(alertActions.setAlert(error.msg,'danger'));
              toast.error(error.msg);
          }
      }
  }
};

export const getKidsWear=()=>{
    return async (dispatch)=>{
        try{
            dispatch({type:GET_KIDS_PRODUCT_REQUEST});
            let datUrl=`${process.env.REACT_APP_EXPRESS_SERVER}/api/products/kids`;
            let response = await axios.get(datUrl);
            dispatch({type:GET_KIDS_PRODUCT_SUCCESS , payload:response.data});
        }
        catch (error){
            console.error(error);
            dispatch({type:GET_KIDS_PRODUCT_FAILURE , payload:error.response.data});
            let errorList = error.response.data.errors;
            for (let error of errorList){
                // dispatch(alertActions.setAlert(error.msg,'danger'));
                toast.error(error.msg);
            }
        }
    }
};

export const getWomenWear=()=>{
    return async (dispatch)=>{
        try{
            dispatch({type:GET_WOMEN_PRODUCT_REQUEST});
            let datUrl=`${process.env.REACT_APP_EXPRESS_SERVER}/api/products/women`;
            let response = await axios.get(datUrl);
            dispatch({type:GET_WOMEN_PRODUCT_SUCCESS , payload:response.data});
        }
        catch (error){
            console.error(error);
            dispatch({type:GET_WOMEN_PRODUCT_FAILURE , payload:error.response.data});
            let errorList = error.response.data.errors;
            for (let error of errorList){
                // dispatch(alertActions.setAlert(error.msg,'danger'));
                toast.error(error.msg);
            }
        }
    }
};

export const getProduct=(productId)=>{
    return async (dispatch)=>{
        try{
            dispatch({type:GET_PRODUCT_REQUEST});
            let datUrl=`${process.env.REACT_APP_EXPRESS_SERVER}/api/products/${productId}`;
            let response = await axios.get(datUrl);
            dispatch({type:GET_PRODUCT_SUCCESS , payload:response.data});
        }
        catch (error){
            console.error(error);
            dispatch({type:GET_PRODUCT_FAILURE , payload:error.response.data});
            let errorList = error.response.data.errors;
            for (let error of errorList){
                // dispatch(alertActions.setAlert(error.msg,'danger'));
                toast.error(error.msg);
            }
        }
    }
}




