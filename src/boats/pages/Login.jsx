import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

import "./Login.css";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      console.log("Login was successful!!", currentUser.email);
      history.push("/");
    } catch (error) {
      console.log({ error });

    }

    setLoading(false);
  };

  return (
    <form class="form-login" onSubmit={handleSubmit}>
      <img
        src="/favicon.png"
        alt=""
        height="92"
        width="92"
        class="login-icon"
      />
      <h1 class="h3 mb-3 font-weigth-normal">Rheinschiff-App Login</h1>
      <label for="inputEmail" class="sr-only">
        Username
      </label>
      <input
        type="email"
        id="inputEmail"
        ref={emailRef}
        class="form-control mb-2 ip-4"
        placeholder="Username"
        required
        autofocus
      />
      <label for="inputPassword" class="sr-only">
        Password
      </label>
      <input
        type="password"
        id="inputPassword"
        ref={passwordRef}
        class="form-control mb-2 ip-2"
        placeholder="Password"
        required
      />
      <button
        disabled={loading}
        class="btn btn-lg btn-primary btn-block"
        type="submit"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
