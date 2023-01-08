import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteUnaftor = ({
  component: Component, ...props
}) => {
  const checkLogged = () => {
    return props.loggedIn ? <Navigate to="/" /> : <Component {...props} />
  }
  return(
      <>{checkLogged()}</>
  );
}

export default ProtectedRouteUnaftor;