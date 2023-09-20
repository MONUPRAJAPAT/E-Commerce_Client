import {combineReducers} from "redux";
import * as alertReducer from './alert/alert.reducer';
import * as userReducer from './users/users.reducer';
import * as productReducer from './products/products.reducer';
import * as orderReducer from './orders/order.reducer';

export const rootReducer = combineReducers({
  [alertReducer.alertFeatureKey]:alertReducer.reducer,
  [userReducer.userFeatureKey]:userReducer.reducer,
  [productReducer.productFeatureKey]:productReducer.reducer,
  [orderReducer.orderFeatureKey]:orderReducer.reducer
});