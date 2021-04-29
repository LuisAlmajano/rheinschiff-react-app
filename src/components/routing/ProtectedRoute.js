/* https://javascript.plainenglish.io/how-to-set-up-protected-routes-in-your-react-application-a3254deda380 */

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();

  if (currentUser !== null) {
    console.log("CurrentUser Email: ", currentUser.email);
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser !== null ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
