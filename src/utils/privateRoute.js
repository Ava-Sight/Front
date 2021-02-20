import React from "react";
import { Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  if (localStorage.getItem("jwt")) {
    return <Component {...rest} />;
  } else {
    return <Redirect to="/" noThrow />;
  }
};

export default ProtectedRoute;
