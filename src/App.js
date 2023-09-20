import './App.css';
import React, {useEffect} from "react";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Navbar from "./layout/components/navbar/Navbar";
import MensWear from "./modules/products/MensWear";
import Home from "./layout/components/home/Home";
import KidsWear from "./modules/products/KidsWear";
import WomensWear from "./modules/products/WomensWear";
import UploadProduct from "./modules/products/UploadProduct";
import Cart from "./modules/orders/Cart";
import UserProfile from "./modules/users/UserProfile";
import UserLogin from "./modules/users/UserLogin";
import UserRegister from "./modules/users/UserRegister";
import Alert from "./layout/util/alert/Alert";
import {useDispatch} from "react-redux";
import ProductDetails from "./modules/products/ProductDetails";
import CheckOut from "./modules/orders/CheckOut";
import OrderSuccess from './modules/orders/OrderSuccess';
import OrderList from "./modules/orders/OrderList";
import * as userUtil from '../src/layout/util/userUtil';
import * as userActions from '../src/redux/users/users.actions';
import PrivateRoute from "./layout/util/PrivateRoute";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let App=()=> {
   let dispatch=useDispatch();
   useEffect(()=>{
       if (userUtil.isLoggedIn()){
           dispatch(userActions.getUserInfo());
       }
   },[]);
  return (
    <React.Fragment>
      <Router>
          <Navbar/>
          {/*<Alert/>*/}
          <Routes>
                 <Route path={'/'} element={<Home/>}/>
                 <Route path={'/products/men'} element={<MensWear/>}/>
                 <Route path={'/products/kids'} element={<KidsWear/>}/>
                 <Route path={'/products/women'} element={<WomensWear/>}/>
                 <Route path={'/products/upload'} element={<PrivateRoute><UploadProduct/></PrivateRoute>}/>
                 <Route path={'/products/:product_id'} element={<ProductDetails/>}/>
                 <Route path={'/orders/cart'} element={<PrivateRoute><Cart/></PrivateRoute>}/>
                 <Route path={'/orders/checkout'} element={<PrivateRoute><CheckOut/></PrivateRoute>}/>
                 <Route path={'/orders/order-success'} element={<PrivateRoute><OrderSuccess/></PrivateRoute>}/>
                 <Route path={'/orders/order-list'} element={<PrivateRoute><OrderList/></PrivateRoute>}/>
                 <Route path={'/users/profile'} element={<PrivateRoute><UserProfile/></PrivateRoute>}/>
                 <Route path={'/users/login'} element={<UserLogin/>}/>
                 <Route path={'/users/register'} element={<UserRegister/>}/>
          </Routes>
          <ToastContainer />
      </Router>
    </React.Fragment>
  );
}

export default App;
