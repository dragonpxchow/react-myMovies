import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  const user = auth.getCurrentUser();
  return (
    <Route
      {...rest} // other props
      //path={path}  // simpifly  with ... rest
      render={(props) => {
        console.log(props);
        // if invalid/anonymous user, redirect to LoginForm or current locaiton before redirect to LoginForm, so pass in object
        if (!user)
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        // either component or render function (more props)
        return Component ? <Component {...props} /> : render(props);
      }}
    ></Route>
  );
};

export default ProtectedRoute;
