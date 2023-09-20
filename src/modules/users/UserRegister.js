import React, {useState} from "react";
import brand from '../../assets/img/brand.png';
import {Link, useNavigate} from "react-router-dom";
import * as userActions from '../../redux/users/users.actions';
// import * as alertActions from '../../redux/alert/alert.actions';
import {useDispatch} from "react-redux";
import Alert from "../../layout/util/alert/Alert";
import {toast} from "react-toastify";

let UserRegister=()=>{
    let dispatch=useDispatch();
    let navigate=useNavigate();
    let [user,setUser]=useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    });
    let [userError,setUserError]=useState({
       nameError:'',
       emailError:'',
       passwordError:'',
       confirmPasswordError:''
    });
    let validateName=(event)=>{
        setUser({...user,[event.target.name]:event.target.value});
        let regExpression= /^[A-Za-z][A-Za-z0-9_]{4,29}$/ ;
      ( !regExpression.test(event.target.value)) ? setUserError({...userError, nameError: 'Enter a proper name'}):
          setUserError({...userError, nameError: ''});
    };
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
    let validateConfirmPassword=(event)=>{
        setUser({...user,[event.target.name]:event.target.value});
         ((user.password !== event.target.value)) ? setUserError({...userError, confirmPasswordError: 'Password not Matched'}):
             setUserError({...userError, confirmPasswordError: ''});
    }
    let submitRegister=(event)=>{
        event.preventDefault();
      if (user.name !=='' && user.email !== '' && user.password !=='' && user.confirmPassword !==''){
          dispatch(userActions.registerUser(user,navigate));
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
                            <h5 className="font-weight-bold"><i className="fa fa-user-cog"/> Register a User</h5>
                        </div>
                    </div>
                </div>
            </section>
            <Alert/>
            <section>
               {/* <pre>{JSON.stringify(user)}</pre>
                <pre>{JSON.stringify(userError)}</pre>*/}
                <div className="container mt-5 mb-5">
                    <div className="row">
                        <div className="col-md-4 m-auto">
                            <div className="card">
                                <div className="card-header bg-info">
                                    <h5 className="font-weight-bold text-white">Register Here</h5>
                                </div>
                                <div className="card-body bg-light">
                                    <form action="" onSubmit={submitRegister}>
                                        <div className="form-group">
                                            <input
                                                name="name"
                                                value={user.name}
                                                onChange={validateName}
                                                type="text" className={`form-control ${userError.nameError.length >0 ? 'is-invalid':''}`} placeholder="Name"/>
                                          <small className="text-danger">{ userError.nameError}</small>
                                        </div>
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
                                        <div className="form-group">
                                            <input
                                                name="confirmPassword"
                                                value={user.confirmPassword}
                                                onChange={validateConfirmPassword}
                                                type="password" className={`form-control ${userError.confirmPasswordError.length >0 ? 'is-invalid':''}`} placeholder="Confirm Password"/>
                                            <small className="text-danger">{ userError.confirmPasswordError}</small>
                                        </div>
                                        <div>
                                            <input type="submit" className="btn btn-success btn-sm" value="Register"/>
                                        </div>
                                    </form>
                                    <small>Already have an account?
                                        <Link to={'/users/login'} className="font-weight-bold text-primary"> Login</Link></small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </React.Fragment>
    )
};
export default UserRegister;