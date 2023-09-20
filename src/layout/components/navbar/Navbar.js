import React from "react";
import {Link,useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import brand from '../../../assets/img/brand.png';
import * as userUtil from '../../util/userUtil';
import * as userActions from '../../../redux/users/users.actions';
import * as userReducer from '../../../redux/users/users.reducer';
import * as orderReducer from '../../../redux/orders/order.reducer';
import GirlShopping from '../../../assets/img/girlshopping 1.png';
import PeopleShopping from '../../../assets/img/peopleshopping.png';
import WatchShopping from '../../../assets/img/watch.png';


let Navbar=()=>{
    let userInfo=useSelector( (state)=>{
        return state[userReducer.userFeatureKey];
    });
    let orderInfo=useSelector((state)=>{
       return state[orderReducer.orderFeatureKey];
    });
    let {cartItems}=orderInfo;
    let {user}=userInfo;
    let dispatch=useDispatch();
    let logOutUser=()=>{
        dispatch(userActions.logOutUser());
    }
    let beforeLoginLinks=(
      <React.Fragment>
          <li className="nav-item">
              <Link to={'/users/register'} className="nav-link btn btn-outline-dark text-white  mx-1">Register<i className=" mx-1 fa-regular fa-address-card"/></Link>
          </li>
          <li className="nav-item">
              <Link to={'/users/login'} className="nav-link btn btn-outline-dark text-white mx-1">Login<i
                  className="fa fa-sign-in-alt mx-1"/> </Link>
          </li>
      </React.Fragment>
    )
    let afterLoginLinks=(
       <React.Fragment>
           <li className="nav-item">
               <Link to={'/users/profile'} className="nav-link mx-1 d-flex align-items-center justify-content-center">
                   <img src={user.avatar} width="30" height="30" className=" img-fluid mx-1" alt=""/>{user.name}</Link>
           </li>
           <li className="nav-item">
               <Link to={'/users/register'} className="nav-link btn btn-outline-dark text-white mx-1" onClick={logOutUser}>
                   <i className="fa fa-sign-out-alt"/> LogOut</Link>
           </li>
       </React.Fragment>
    )

    return(
        <React.Fragment>
           <nav className="navbar navbar-light bg-light navbar-expand-sm p-3 ">
               <div className="container">
                 <Link to={'/'} className="navbar-brand">
                     <h2>WardrobeWorld</h2>
                 </Link>
                   <div className="collapse navbar-collapse">
                       <ul className="navbar-nav">
                           <li className="nav-item">
                               <Link to={'/products/men'} className="nav-link">Men's Wear</Link>
                           </li>
                           <li className="nav-item">
                               <Link to={'/products/kids'} className="nav-link">Kids' Wear</Link>
                           </li>
                           <li className="nav-item">
                               <Link to={'/products/women'} className="nav-link">Women's Wear</Link>
                           </li>
                           <li className="nav-item">
                               <Link to={'/products/upload'} className="nav-link">Upload</Link>
                           </li>
                           <li className="nav-item">
                               <Link to={'/orders/cart'} className="nav-link"><i className="fa fa-shopping-cart"/><span className="badge badge-primary rounded-circle">{cartItems?.length}</span></Link>
                           </li>
                           <li className="nav-item">
                               <Link to={'/orders/order-list'} className="nav-link">Orders</Link>
                           </li>
                       </ul>
                       <ul className="navbar-nav ml-auto">
                           {
                               userUtil.isLoggedIn()? afterLoginLinks : beforeLoginLinks
                           }
                       </ul>
                   </div>
               </div>
           </nav>
        </React.Fragment>
    )
};
export default Navbar;