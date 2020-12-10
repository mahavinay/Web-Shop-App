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
                <h2>Christmas Offers 25% on all shirts</h2>
              </div>
              <div className="offer"><h2>Tommy Hilfiger 30-50%</h2></div>
            </div>
            
            <div className="caral">
            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
              <ol class="carousel-indicators">
                <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"></li>
                <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
                <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
              </ol>
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src="../../assets/Christmas Sale.png" class="d-block w-100" alt="chirstmassaleimage"/>
                </div>
                <div class="carousel-item">
                  <img src="../../assets/ethnic.png" class="d-block w-100" alt="..."/>
                </div>
                <div class="carousel-item">
                  <img src="../../asssets/kidscollection.png" class="d-block w-100" alt="..."/>
                </div>
              </div>
              <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </a>
              <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </a>
            </div>

            </div>
           
            

      </div>      
      
    );
  }
};

export default Navbar;
