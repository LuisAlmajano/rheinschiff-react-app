/* https://javascript.plainenglish.io/how-to-set-up-protected-routes-in-your-react-application-a3254deda380 */

import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function ProtectedRoute({ Component, path }) {
  const { currentUser } = useAuth();

  return currentUser ? <Component /> : <Redirect to={{ pathname: "/login" }} />;
}

export default ProtectedRoute;
