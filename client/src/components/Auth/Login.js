import React, { useState } from "react";
import { Link } from "react-router-dom";


import AuthService from "../../services/auth-service";

const initialState = { username: "", password: "", email: "" };

const Login = (props) => {
  const [loginState, setLoginState] = useState(initialState);
  const [loginErrorMsg, setLoginErrorMsg] = useState(null);

  const service = new AuthService();

  // Function to handle form submit in the input fields
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const { username, password, email } = loginState;

    service
      .login(username, password, email)
      .then((response) => {
        setLoginState(initialState);
        props.getUser(response);
      })
      .catch((error) => {
        const { message } = error.response.data;
        setLoginErrorMsg(message);
        //console.log(error);
      });
  };

  // Function to handle changes in the input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginState({ ...loginState, [name]: value });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
      <div className="control">
        <label className="label">Username:</label>
        <input
          className="input input is-small"
          type="text"
          name="username"
          value={loginState.username}
          onChange={handleChange}
          placeholder="Enter user name"
        />
        </div>

        <label>
        Email
        </label>
        <input type="email"
        name="email"
        value={loginState.email}
        onChange={handleChange}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={loginState.password}
          onChange={handleChange}
        />
       
        <input type="submit" value="Login" />
      </form>
      <br />

      {loginErrorMsg && <span style={{ color: "red" }}>{loginErrorMsg}</span>}

      <p>
        Don't have account?
        <Link to={"/signup"}> Signup</Link>
      </p>
    </div>
  );
};

export default Login;
