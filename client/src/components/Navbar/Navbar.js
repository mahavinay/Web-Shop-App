import React, { useState, useEffect } from "react";
import { NavLink} from "react-router-dom";
import './Navbar.css'


import AuthService from "../../services/auth-service";

const Navbar = (props) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const service = new AuthService();

  // Mimic lifecycle method when a component updates
  useEffect(() => {
    setLoggedInUser(props.userInSession);
  }, [props.userInSession]);

  // function to log user out
  const logoutUser = () => {
    service.logout().then(() => {
      // reset state value
      setLoggedInUser(null);

      // reset getUser value
      props.getUser(null);
    });
  };

  if (loggedInUser) {
    return (
      <nav >
            <div className="logout-btn">
            <NavLink to="/products" activeStyle={{color: "blue"}} exact>
              <button className="btn-all">List Of Products</button>
            </NavLink>
            <NavLink to="/" activeStyle={{color: "blue"}} exact>
              <button className="btn-all" onClick={logoutUser}>Logout</button>
            </NavLink>
            </div>
      </nav>
    );
  } else {
    return (
      
      <div className="nav-style">
          <h1 style={{color: "blue"}}>Welcome to Webshop ! Happy Selling your products!</h1>
          <div>
          <NavLink to="/login" activeStyle={{ color: "blue" }} exact>
           <b>Login</b>
          </NavLink>
          </div>
          <div>
          <NavLink to="/signup" activeStyle={{ color: "blue" }} exact>
          <b>Signup</b>
          </NavLink>            
          </div>
            <br/>
      </div>      
    );
  }
};

export default Navbar;
