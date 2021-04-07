/* https://javascript.plainenglish.io/how-to-set-up-protected-routes-in-your-react-application-a3254deda380 */

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = ({ Component, ...rest }) => {
  const { currentUser } = useAuth();

  console.log("CurrentUser: ", currentUser);

  return (
    <Route
      {...rest}
      render={(props) =>
        !currentUser ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

export default ProtectedRoute;
