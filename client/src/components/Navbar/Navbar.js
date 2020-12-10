import React, { useState, useEffect } from "react";
import { NavLink} from "react-router-dom";
import './Navbar.css'
import image from '../../assets/ChristmasSale.png'
import image2 from '../../assets/kidscollection.png'
import image3 from '../../assets/kidssale.png'
import Carousel from 'react-bootstrap/Carousel'
import AuthService from "../../services/auth-service";

const Navbar = (props) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const service = new AuthService();

  useEffect(() => {
    setLoggedInUser(props.userInSession);
  }, [props.userInSession]);

  const logoutUser = () => {
    service.logout().then(() => {
      setLoggedInUser(null);
      props.getUser(null);
    });
  };

  if (loggedInUser) {
    return (
      <div className="log_list">
            <div className="logout-btn">
              <NavLink to="/products" activeStyle={{color: "blue"}} exact>
              <button className="btn-all">List Of Products</button>
              </NavLink>
            </div>
            
            <div>
              <NavLink to="/" activeStyle={{color: "blue"}} exact>    
              <button className="btn-all" onClick={logoutUser}>Logout</button>
              </NavLink>
            </div>
      </div>
    );
  } else {
    return (
      
      <div >
        <div className="nav-style"> 
        <div>
            <h2 className="welcome-mess">Welcome! Happy Selling your products!</h2>
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
                    alt="Second slide"
                  />
                </Carousel.Item>

                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={image3}
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
