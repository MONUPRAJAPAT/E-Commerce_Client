import * as userActions from './users.actions';

export const userFeatureKey='user-info';
let initialState={
    loading:false,
    user:{},
    isAuthenticated:false,
    token:'',
    errorMessage:''
};

export const reducer=(state=initialState,action)=>{
    let {type,payload}=action;
    switch (type){
        // Register a user
        case userActions.REGISTER_USER_REQUEST:
            return{
                ...state,
                loading: true
            }
        case userActions.REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case userActions.REGISTER_USER_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload
            }
            // login a user
        case userActions.LOGIN_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case userActions.LOGIN_USER_SUCCESS:
            localStorage.setItem(process.env.REACT_APP_ONLINE_SHOPPING,payload.token);
            return {
                ...state,
                loading: false,
                token: payload.token,
                isAuthenticated: true
            }
        case userActions.LOGIN_USER_FAILURE:
            localStorage.removeItem(process.env.REACT_APP_ONLINE_SHOPPING);
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                errorMessage: payload
            }
            // get user info
        case userActions.GET_USER_INFO_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case userActions.GET_USER_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                user:payload.user
            }
        case userActions.GET_USER_INFO_FAILURE:
            return {
                ...state,
                loading: false,
                user:{},
                errorMessage: payload
            }
            // update address
        case userActions.UPDATE_USER_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case userActions.UPDATE_USER_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                user:payload.user
            }
        case userActions.UPDATE_USER_ADDRESS_FAILURE:
            return {
                ...state,
                loading: false,
                user:{},
                errorMessage: payload
            }
            // logout user
        case userActions.LOGOUT_USER:
            localStorage.removeItem(process.env.REACT_APP_ONLINE_SHOPPING);
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: {},
                token: ''
            }
        default:return state;
    }
};