import React, {useEffect, useState} from "react";
import * as userActions from '../../redux/users/users.actions';
import * as userReducer from '../../redux/users/users.reducer';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../layout/util/spinner/Spinner";

let UserProfile=()=>{
    let dispatch=useDispatch();
    let [enableAddress,setEnableAddress]=useState(false);
    let userInfo= useSelector((state)=>{
        return state[userReducer.userFeatureKey];
    });
    let {loading , user}= userInfo;
    let [address,setAddress]=useState({
        flat:'',
        street:'',
        landmark:'',
        city:'',
        state:'',
        country:'',
        pin:'',
        mobile:''
    });
    useEffect(()=>{
        setAddress({
            flat: user && user.address ? user.address.flat : '',
            street: user && user.address ? user.address.street : '',
            landmark:user && user.address ? user.address.landmark : '',
            city:user && user.address ? user.address.city : '',
            state:user && user.address ? user.address.state : '',
            country:user && user.address ? user.address.country : '',
            pin:user && user.address ? user.address.pin : '',
            mobile:user && user.address ? user.address.mobile : ''
        });
    },[user]);
    let updateInputAddress=(event)=>{
        setAddress({
            ...address,
            [event.target.name]:event.target.value
        });
    }
    let submitUpdateAddress=(event)=>{
        event.preventDefault();
        dispatch(userActions.updateAddress(address));
        setEnableAddress(false);

    }
    return(
        <React.Fragment>
            <section className="bg-brown-single p-2">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h5 className="font-weight-bold"><img src={user.avatar} width="40" height="40" alt=""/> Your Profile</h5>
                        </div>
                    </div>
                </div>
            </section>
            {/*<pre>{JSON.stringify(address)}</pre>*/}
            {
                loading? <Spinner/>:
                    <React.Fragment>
                        {
                           Object.keys(user).length >0 &&
                           <section>
                               <div className="container my-3">
                                   <div className="row">
                                       <div className="col-md-3">
                                           <div className="card">
                                               <div className="card-body">
                                                   <img src={user.avatar} className="img-fluid purple-gradient" alt=""/>
                                               </div>
                                           </div>
                                       </div>
                                       <div className="col-md-9">
                                           <div className="card">
                                               <div className="card-header bg-light">
                                                   <h5 className="font-weight-bold">Your Information</h5>
                                               </div>
                                               <div className="card-body">
                                                   <ul className="list-group">
                                                       <li className="list-group-item list-group-item-info">Name : <span className="font-weight-bold">{user.name}</span></li>
                                                       <li className="list-group-item list-group-item-info">Email : <span className="font-weight-bold">{user.email}</span></li>
                                                       {
                                                           user.address ?  <li className="list-group-item list-group-item-info">Mobile : <span className="font-weight-bold">{user.address.mobile}</span></li> : null
                                                       }
                                                   </ul>
                                               </div>
                                           </div>
                                           <div className="card mt-3">
                                               <div className="card-header bg-light">
                                                   <span className="h5 font-weight-bold">Billing Address</span>
                                                   <div className="custom-control custom-switch float-right">
                                                       <input
                                                           onChange={e=> setEnableAddress(e.target.checked)}
                                                           type="checkbox" className="custom-control-input" id="customSwitches"/>
                                                       <label className="custom-control-label" htmlFor="customSwitches">Enable Address</label>
                                                   </div>
                                               </div>
                                               <div className="card-body">
                                                   {
                                                       user.address && !enableAddress &&
                                                       <ul className="list-group font-weight-bold font-italic">
                                                           <li className="list-group-item list-group-item-info">Flat : {user.address.flat}</li>
                                                           <li className="list-group-item list-group-item-info">Street : {user.address.street}</li>
                                                           <li className="list-group-item list-group-item-info">Landmark : {user.address.landmark}</li>
                                                           <li className="list-group-item list-group-item-info">City : {user.address.city}</li>
                                                           <li className="list-group-item list-group-item-info">State : {user.address.state}</li>
                                                           <li className="list-group-item list-group-item-info">Country : {user.address.country}</li>
                                                           <li className="list-group-item list-group-item-info">Pin Code : {user.address.pin}</li>
                                                           <li className="list-group-item list-group-item-info">Mobile : {user.address.mobile}</li>
                                                       </ul>
                                                   }
                                                   {
                                                       user.address && enableAddress &&
                                                       <form onSubmit={submitUpdateAddress}>
                                                           <div className="input-group mb-3">
                                                               <div className="input-group-prepend">
                                                                <span className="input-group-text peach-gradient text-dark"
                                                                      id="basic-addon1">Flat</span>
                                                               </div>
                                                               <input
                                                                   name='flat'
                                                                   value={address.flat}
                                                                   onChange={updateInputAddress}
                                                                   type="text" className="form-control"
                                                                   placeholder="Flat"/>
                                                           </div>
                                                           <div className="input-group mb-3">
                                                               <div className="input-group-prepend">
                                                                <span className="input-group-text peach-gradient text-dark"
                                                                      id="basic-addon1">Street</span>
                                                               </div>
                                                               <input
                                                                   name='street'
                                                                   value={address.street}
                                                                   onChange={updateInputAddress}
                                                                   type="text" className="form-control"
                                                                   placeholder="Street"/>
                                                           </div>
                                                           <div className="input-group mb-3">
                                                               <div className="input-group-prepend">
                                                                <span className="input-group-text peach-gradient text-dark"
                                                                      id="basic-addon1">Landmark</span>
                                                               </div>
                                                               <input
                                                                   name='landmark'
                                                                   value={address.landmark}
                                                                   onChange={updateInputAddress}
                                                                   type="text" className="form-control"
                                                                   placeholder="Landmark"/>
                                                           </div>
                                                           <div className="input-group mb-3">
                                                               <div className="input-group-prepend">
                                                                <span className="input-group-text peach-gradient text-dark"
                                                                      id="basic-addon1">City</span>
                                                               </div>
                                                               <input
                                                                   name='city'
                                                                   value={address.city}
                                                                   onChange={updateInputAddress}
                                                                   type="text" className="form-control"
                                                                   placeholder="City"/>
                                                           </div>
                                                           <div className="input-group mb-3">
                                                               <div className="input-group-prepend">
                                                                <span className="input-group-text peach-gradient text-dark"
                                                                      id="basic-addon1">State</span>
                                                               </div>
                                                               <input
                                                                   name='state'
                                                                   value={address.state}
                                                                   onChange={updateInputAddress}
                                                                   type="text" className="form-control"
                                                                   placeholder="State"/>
                                                           </div>
                                                           <div className="input-group mb-3">
                                                               <div className="input-group-prepend">
                                                                <span className="input-group-text peach-gradient text-dark"
                                                                      id="basic-addon1">Country</span>
                                                               </div>
                                                               <input
                                                                   name='country'
                                                                   value={address.country}
                                                                   onChange={updateInputAddress}
                                                                   type="text" className="form-control"
                                                                   placeholder="Country"/>
                                                           </div>
                                                           <div className="input-group mb-3">
                                                               <div className="input-group-prepend">
                                                                <span className="input-group-text peach-gradient text-dark"
                                                                      id="basic-addon1">Pin Code</span>
                                                               </div>
                                                               <input
                                                                   name='pin'
                                                                   value={address.pin}
                                                                   onChange={updateInputAddress}
                                                                   type="text" className="form-control"
                                                                   placeholder="Pin Code"/>
                                                           </div>
                                                           <div className="input-group mb-3">
                                                               <div className="input-group-prepend">
                                                                <span className="input-group-text peach-gradient text-dark"
                                                                      id="basic-addon1">Mobile</span>
                                                               </div>
                                                               <input
                                                                   name='mobile'
                                                                   value={address.mobile}
                                                                   onChange={updateInputAddress}
                                                                   type="text" className="form-control"
                                                                   placeholder="Mobile"/>
                                                           </div>
                                                           <div>
                                                               <input type="submit" className="btn btn-success text-dark btn-sm text-dark" value="Update Address"/>
                                                           </div>
                                                       </form>
                                                   }
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </section>
                        }
                    </React.Fragment>
            }
        </React.Fragment>
    )
};
export default UserProfile;