import * as orderActions from './order.actions';

export const orderFeatureKey='order-info';
let initialState={
    loading:false,
    errorMessage:'',
    orders:[],
    cartItems:[],
    order:{}
};

export const reducer=(state=initialState,action)=>{
    let {type,payload}=action;
    switch (type){
        // add to cart
        case orderActions.ADD_TO_CART:
            let matchedCartItem= state.cartItems.find(cartItem => cartItem._id === payload.item._id);
            if (matchedCartItem)
                return state;
            return {
                ...state,
                cartItems: [...state.cartItems, payload.item]
             };

            case orderActions.ADD_TO_CART_FAILURE:
            return {
                ...state,
                errorMessage: payload
            };
        // increase the quantity of the item
        case orderActions.INCR_CART_ITEM_QTY:
            let incrCartItems= state.cartItems.map((cartItem)=>{
                if (cartItem._id === payload.productId){
                    return {
                        ...cartItem,
                        qty: cartItem.qty +1
                    }
                }
                return cartItem;
            })
            return {
                cartItems: [...incrCartItems]
            };

        case orderActions.INCR_CART_ITEM_QTY_FAILURE:
            return {
                ...state,
                errorMessage: payload
            };
       // decrease the quantity of the item
        case orderActions.DECR_CART_ITEM_QTY:
            let decrCartItems= state.cartItems.map((cartItem)=>{
                if (cartItem._id === payload.productId){
                    return {
                        ...cartItem,
                        qty: (cartItem.qty -1) >0 ? cartItem.qty-1:1
                    }
                }
                return cartItem;
            })
            return {
                cartItems: [...decrCartItems]
            };

        case orderActions.DECR_CART_ITEM_QTY_FAILURE:
            return {
                ...state,
                errorMessage: payload
            };

            // delete cart item
        case orderActions.DELETE_CART_ITEM:
            let updatedCartItems= state.cartItems.filter((cartItem)=>{
               return cartItem._id !== payload.productId;
            });
            return {
                ...state,
                cartItems: [...updatedCartItems]
            };
        case orderActions.DELETE_CART_ITEM_FAILURE:
            return {
                ...state,
                errorMessage: payload
            };
            // make payment
        case  orderActions.MAKE_PAYMENT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case orderActions.MAKE_PAYMENT_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case orderActions.MAKE_PAYMENT_FAILURE:
            return {
                ...state,
                errorMessage: payload
            };
        case orderActions.PLACE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case orderActions.PLACE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                order: payload.order
            };
        case orderActions.PLACE_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload
            };
        case orderActions.CLEAR_CART_ITEMS_SUCCESS:
            return {
                ...state,
                cartItems: []
            };
        case orderActions.CLEAR_CART_ITEMS_FAILURE:
            return {
                ...state,
                errorMessage: payload
            };
        case orderActions.GET_ALL_ORDERS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case orderActions.GET_ALL_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders:payload.orders
            };
        case orderActions.GET_ALL_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
                orders: [],
                errorMessage: payload
            };

        default:return state;
    }
};