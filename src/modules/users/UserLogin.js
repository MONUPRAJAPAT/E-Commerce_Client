import React, {useState} from "react";
import brand from "../../assets/img/brand.png";
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import * as userActions from "../../redux/users/users.actions";
import {toast} from "react-toastify";

let UserLogin=()=>{
    let dispatch=useDispatch();
    let navigate=useNavigate();
    let [user,setUser]=useState({
        email:'',
        password:''
    });
    let [userError,setUserError]=useState({
        emailError:'',
        passwordError:''
    });

    let validateEmail=(event)=>{
        setUser({...user,[event.target.name]:event.target.value});
        let regExpression= /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/ ;
        ( !regExpression.test(event.target.value)) ? setUserError({...userError, emailError: 'Enter a proper email'}):
            setUserError({...userError, emailError: ''});
    };
    let validatePassword=(event)=>{
        setUser({...user,[event.target.name]:event.target.value});
        let regExpression= /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ ;
        ( !regExpression.test(event.target.value)) ? setUserError({...userError, passwordError: 'Enter a proper password'}):
            setUserError({...userError, passwordError: ''});
    };
    let submitLogin=(event)=>{
        event.preventDefault();
        if (user.email !== '' && user.password !==''){
            dispatch(userActions.loginUser(user,navigate));
        }
        else {
            // dispatch(alertActions.setAlert('Please fill all the fields','danger'));
            toast.error('Please fill all the fields');
        }
    };
    return(
        <React.Fragment>
            <section className="bg-brown-single p-2">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h5 className="font-weight-bold"><i className="fa fa-sign-in-alt"/> Login a User</h5>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                {/*<pre>{JSON.stringify(user)}</pre>
                <pre>{JSON.stringify(userError)}</pre>*/}
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-4 m-auto">
                            <div className="card">
                                <div className="card-header bg-info text-white">
                                    <h5 className="font-weight-bold">Login Here</h5>
                                </div>
                                <div className="card-body bg-light">
                                    <form action="" onSubmit={submitLogin}>
                                        <div className="form-group">
                                            <input
                                                name="email"
                                                value={user.email}
                                                onChange={validateEmail}
                                                type="email" className={`form-control ${userError.emailError.length >0 ? 'is-invalid':''}`} placeholder="Email"/>
                                            <small className="text-danger">{ userError.emailError}</small>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                name="password"
                                                value={user.password}
                                                onChange={validatePassword}
                                                type="password" className={`form-control ${userError.passwordError.length >0 ? 'is-invalid':''}`} placeholder="Password"/>
                                            <small className="text-danger">{ userError.passwordError}</small>
                                        </div>
                                        <div>
                                            <input type="submit" className="btn btn-success btn-sm" value="Login"/>
                                        </div>
                                    </form>
                                    <small>Don't have an account?
                                    <Link to={'/users/register'} className="font-weight-bold text-primary"> Register</Link></small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </React.Fragment>
    )
};
export default UserLogin;