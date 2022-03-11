//PublicRouter
 
import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router';
 
 
export const PrivateRoute = ({isAuth,  children }) => {
    return isAuth ? children : <Navigate to="/login"/>;
};
 

