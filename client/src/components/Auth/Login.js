import React, { useState } from "react";
import { Link } from "react-router-dom";


import AuthService from "../../services/auth-service";

const initialState = { username: "", password: ""};

const Login = (props) => {
  const [loginState, setLoginState] = useState(initialState);
  const [loginErrorMsg, setLoginErrorMsg] = useState(null);

  const service = new AuthService();

  // Function to handle form submit in the input fields
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const { username, password} = loginState;

    service
      .login(username, password)
      .then((response) => {
        setLoginState(initialState);
        props.getUser(response);
        
      })
      .catch((error) => {
        const { message } = error.response.data;
        setLoginErrorMsg(message);
        
      });

  };

  // Function to handle changes in the input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginState({ ...loginState, [name]: value });
  };

  return (
    <div>
      <h2><b>Login</b></h2>
      <form onSubmit={handleFormSubmit}>
      <div className="control">
        <label className="label"><b>Username:</b></label>
        <input
          type="text"
          name="username"
          value={loginState.username}
          onChange={handleChange}
          placeholder="Enter user name"
        />
        </div>

        <div>
        <label><b>Password:</b></label>
        <input
          type="password"
          name="password"
          value={loginState.password}
          onChange={handleChange}
          placeholder="Enter password"
        />
       </div>

       <div>
         <input type="submit" value="Login" />
       </div>
        
      </form>
      <br />

      <div>
      {loginErrorMsg && <span style={{ color: "red" }}>{loginErrorMsg}</span>}
      </div>

      <div>
        Don't have account?
        <Link to={"/signup"}><b>  Signup</b></Link>
      </div>
    </div>
  );
};

export default Login;
