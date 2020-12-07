import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth-service";
import './signup.css';

const initialState = { username: "", password: "", email: "" };

const Signup = (props) => {
  const [regForm, setRegForm] = useState(initialState);
  const [regErrorMsg, setRegErrorMsg] = useState("");

  const service = new AuthService();

  // Form submission handler
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const { username, password, email } = regForm;

    // Use the service.signup method to make a call to the back end and sign the user up
    service
      .signup(username, password, email)
      .then((response) => {
       
        setRegForm(initialState);
        console.log(props);
        props.getUser(response);
        
      })
      .catch((error) => {
        const { message } = error.response.data;
        setRegErrorMsg(message);
              });
  };

  // Change handler
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegForm({ ...regForm, [name]: value });
  };

  return (
    <div className="form-data">
      
        <h2><b>Register Here!</b></h2>
        <br/>
        <form onSubmit={handleFormSubmit}>
        <div>
          <label><b>Username:</b></label>
          <input
            type="text"
            name="username"
            value={regForm.username}
            onChange={handleChange}
            placeholder="Enter user name"
          />
        </div>

        <br/>

        <div>
          <label><b>Email: </b></label>
          <input type="email"
          name="email"
          value={regForm.email}
          onChange={handleChange}
          placeholder="Enter valid email address"
          />
        </div>
        
        <br/>

        <div>
        <label><b>Password: </b></label>
        <input
          type="password"
          name="password"
          value={regForm.password}
          onChange={handleChange}
          placeholder="Enter password"
        />
        </div>

        <br/>

        <div>
        <input type="submit" value="Signup" />
        </div>
      </form>
      <br />

      <div>
      {regErrorMsg && <span style={{ color: "red" }}>{regErrorMsg}</span>}
      </div>
      <br/>
      <div>
        Already have account?
        <Link to={"/"}><b>  Login</b></Link>
      </div>
    </div>
  );
};

export default Signup;
