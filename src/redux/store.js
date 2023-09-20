import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./root.reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import logger from 'redux-logger';
import thunk from "redux-thunk";

let middlewares=[logger,thunk]
export const store= createStore(rootReducer,composeWithDevTools(applyMiddleware(...middlewares)));

