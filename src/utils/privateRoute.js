import React from "react";
import { Redirect, Route } from "react-router-dom";

//need to check is auth enpoint
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("jwt") ? (
        <Component {...props} />
      ) : (
        <Redirect to="/dashboard" />
      )
    }
  />
);

export default ProtectedRoute;
