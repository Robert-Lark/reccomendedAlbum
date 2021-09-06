// this is a wrapper for routes that need to be secured.

import React from "react";
import {Redirect, Route} from "react-router-dom";

function PrivateRoute({component: Component, ...rest}) {
  let user = localStorage.getItem("userID");
  console.log(user);
  return (
    <Route
      {...rest}
      render={(props) => {
        //if we have a current user we want to render the secured component - if we dont take the user to login.
        return user ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    ></Route>
  );
}

export default PrivateRoute;
