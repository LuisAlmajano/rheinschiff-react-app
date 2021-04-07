import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";

import "./Login.css";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      console.log("Login was successful!!", currentUser.email);
      history.push("/");
    } catch (error) {
      setError("Failed to log in");
    }

    setLoading(false);
  };

  return (
    <form className="form-login" onSubmit={handleSubmit}>
      <img
        src="/favicon.png"
        alt=""
        height="92"
        width="92"
        className="login-icon"
      />
      <h1 className="h3 mb-3 font-weigth-normal">Rheinschiff-App Login</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <label htmlFor="inputEmail" className="sr-only">
        Username
      </label>
      <input
        type="email"
        id="inputEmail"
        ref={emailRef}
        className="form-control mb-2 ip-4"
        placeholder="Username"
        required
        autoFocus
      />
      <label htmlFor="inputPassword" className="sr-only">
        Password
      </label>
      <input
        type="password"
        id="inputPassword"
        ref={passwordRef}
        className="form-control mb-2 ip-2"
        placeholder="Password"
        required
      />
      <button
        disabled={loading}
        className="btn btn-lg btn-primary btn-block"
        type="submit"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
