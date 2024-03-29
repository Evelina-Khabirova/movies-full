import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({
  component: Component, ...props
}) => {
  const checkLogged = () => {
    return props.loggedIn ? <Component {...props} /> : <Navigate to="/signin" />
  }
  return(
      <>{checkLogged()}</>
  );
}

export default ProtectedRoute;