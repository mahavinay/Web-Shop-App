import React, { useState, useEffect } from "react";
import { NavLink} from "react-router-dom";
import './Navbar.css'
import image from '../../assets/ChristmasSale.png'
import image2 from '../../assets/kidscollection.png'
import Carousel from 'react-bootstrap/Carousel'
import { Button } from 'react-bootstrap';

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

            {/* <Button onClick={logoutUser}>Logout</Button> */}
              <button className="btn-all" onClick={logoutUser}>Logout</button>
            </NavLink>
            </div>
      </nav>
    );
  } else {
    return (
      
      <div >
          <div className="nav-style">
              <div>
                <h1 className="welcome-mess">Welcome to Webshop ! Happy Selling your products!</h1>
              </div>
                    
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
          </div>

            <div className="deals">
              <div className="offer">
                  <h3>Christmas Offers 25% on all shirts</h3>
              </div>
              <div className="offer"><h3>Tommy Hilfiger 30-50%</h3></div>
            </div>
            
            <div className="my__carousel_main">
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={image}
                    alt="First slide"
                  />
               
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={image2}
                    alt="Third slide"
                  />

                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={image2}
                    alt="Third slide"
                  />

                
                </Carousel.Item>
              </Carousel>

            </div>
           
            

      </div>      
      
    );
  }
};

export default Navbar;
