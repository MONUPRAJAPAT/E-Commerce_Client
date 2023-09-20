import axios from 'axios';
import * as userUtil from '../../layout/util/userUtil';
import * as tokenUtil from '../../layout/util/tokenUtil';
import {toast} from "react-toastify";

export const REGISTER_USER_REQUEST='REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS='REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE='REGISTER_USER_FAILURE';

export const LOGIN_USER_REQUEST='LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS='LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE='LOGIN_USER_FAILURE';

export const GET_USER_INFO_REQUEST='GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS='GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILURE='GET_USER_INFO_FAILURE';

export const UPDATE_USER_ADDRESS_REQUEST='UPDATE_USER_ADDRESS_REQUEST';
export const UPDATE_USER_ADDRESS_SUCCESS='UPDATE_USER_ADDRESS_SUCCESS';
export const UPDATE_USER_ADDRESS_FAILURE='UPDATE_USER_ADDRESS_FAILURE';

export const LOGOUT_USER='LOGOUT_USER';

export const registerUser=(user,navigate)=>{
  return async (dispatch)=>{
      try{
          dispatch({type:REGISTER_USER_REQUEST});
          let dataUrl=`${process.env.REACT_APP_EXPRESS_SERVER}/api/users/register`;
          let response = await axios.post(dataUrl,user);
          dispatch({type:REGISTER_USER_SUCCESS , payload:response.data});
          // dispatch(alertActions.setAlert(response.data.msg,'success'));
          toast.success(response.data.msg);
          setTimeout(()=>{
              toast.info('After Login Add Delivery Address');
          },2000);
          navigate('/users/login');
      }
      catch (error){
          console.error(error);
          dispatch({type:REGISTER_USER_FAILURE , payload: error.response.data});
          let errorList=error.response.data.errors;
          console.log(errorList);
          for (let error of errorList){
              // dispatch(alertActions.setAlert(error.msg,'danger'));
              toast.error(error.msg);
          }

      }
  }
};

export const loginUser=(user,navigate)=>{
    return async (dispatch)=>{
        try{
            dispatch({type:LOGIN_USER_REQUEST});
            let dataUrl=`${process.env.REACT_APP_EXPRESS_SERVER}/api/users/login`;
            let response = await axios.post(dataUrl,user);
            dispatch({type:LOGIN_USER_SUCCESS , payload:response.data});
            if (userUtil.isLoggedIn()){
                dispatch(getUserInfo());
            }
            // dispatch(alertActions.setAlert(response.data.msg,'success'));
            toast.success(response.data.msg);
            navigate('/');
        }
        catch (error){
            console.error(error);
            dispatch({type:LOGIN_USER_FAILURE , payload: error.response.data});
            let errorList=error.response.data.errors;
            for (let error of errorList){
                // dispatch(alertActions.setAlert(error.msg,'danger'));
                toast.error(error.msg);
            }

        }
    }
};

export const getUserInfo=()=>{
    return async (dispatch)=>{
        try{
            // setting the token to request header to send to server
            if (userUtil.isLoggedIn()){
                tokenUtil.setToken(userUtil.getToken());
            }
            dispatch({type:GET_USER_INFO_REQUEST});
            let dataUrl=`${process.env.REACT_APP_EXPRESS_SERVER}/api/users`;
            let response = await axios.get(dataUrl);
            dispatch({type:GET_USER_INFO_SUCCESS , payload:response.data});
        }
        catch (error){
            console.error(error);
            dispatch({type:LOGIN_USER_FAILURE , payload: error.response.data});
            let errorList=error.response.data.errors;
            for (let error of errorList){
                // dispatch(alertActions.setAlert(error.msg,'danger'));
                toast.error(error.msg);
            }

        }
    }
};

export const updateAddress=(address)=>{
    return async (dispatch)=>{
        try{
            dispatch({type:UPDATE_USER_ADDRESS_REQUEST});
            let dataUrl=`${process.env.REACT_APP_EXPRESS_SERVER}/api/users/address`;
            let response = await axios.post(dataUrl,address);
            dispatch({type:UPDATE_USER_ADDRESS_SUCCESS , payload:response.data});
            // dispatch(alertActions.setAlert(response.data.msg,'success'));
            toast.success(response.data.msg);
        }
        catch (error){
            console.error(error);
            dispatch({type:UPDATE_USER_ADDRESS_FAILURE , payload: error.response.data});
            let errorList=error.response.data.errors;
            for (let error of errorList){
                // dispatch(alertActions.setAlert(error.msg,'danger'));
                toast.error(error.msg);
            }

        }
    }
};

export const logOutUser=()=>{
    return(dispatch)=>{
        dispatch({type:LOGOUT_USER});
    }
};




