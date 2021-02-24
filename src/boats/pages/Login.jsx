import React from 'react';

const Login = () => {

    return(

        <form class="form-login">
      <img
        src="/node_modules/bootstrap-icons/icons/bootstrap.svg"
        alt=""
        height="72"
        width="72"
        class="mb-4"
      />
      <h1 class="h3 mb-3 font-weigth-normal">Rheinschiff App Login</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control mb-2 ip-4"
        placeholder="Email address"
        required
        autofocus
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control mb-2 ip-2"
        placeholder="Password"
        required
      />
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">
        Login
      </button>
    </form>

    );

}

export default Login;
