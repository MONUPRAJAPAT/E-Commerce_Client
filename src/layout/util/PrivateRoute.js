import React from "react";
import {Navigate} from 'react-router-dom';
import * as userUtil from '../util/userUtil';

const PrivateRoute = ({children}) => {
    return userUtil.isLoggedIn() ? children : <Navigate to="/users/login" />;
};

export default PrivateRoute;