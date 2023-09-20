import * as productActions from './products.actions';

export const productFeatureKey='product-info';
let initialState={
    loading:false,
    products:[],
    selectedProduct:{},
    errorMessage:''
};

export const reducer=(state=initialState,action)=>{
    let {type,payload}=action;
    switch (type){
        // upload product
        case productActions.UPLOAD_PRODUCT_REQUEST:
            return{
                ...state,
                loading: true
            };
        case productActions.UPLOAD_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case productActions.UPLOAD_PRODUCT_FAILURE:
            return {
                ...state,
                errorMessage: payload
            };
            // get men product
        case productActions.GET_MEN_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case productActions.GET_MEN_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: payload.products
            };
        case productActions.GET_MEN_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false
            };
            // get kids product
        case productActions.GET_KIDS_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case productActions.GET_KIDS_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: payload.products
            };
        case productActions.GET_KIDS_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false
            };
            // get women product
        case productActions.GET_WOMEN_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case productActions.GET_WOMEN_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: payload.products
            }
        case productActions.GET_WOMEN_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false
            }
            // get product Details
        case productActions.GET_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case productActions.GET_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                selectedProduct: payload.product
            }
        case productActions.GET_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload
            }

        default:return state;
    }
};