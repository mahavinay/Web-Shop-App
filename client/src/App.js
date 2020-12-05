import React, { useState } from "react";
import './App.css';
import {Switch, Route} from 'react-router-dom' 
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import AuthService from "./services/auth-service";
import Navbar from './components/Navbar/Navbar'
import ProductList from './components/Products/ProductList'

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const service = new AuthService();

  // Function to help fetch a logged in user
  const fetchUser = () => {
    if (loggedInUser === null) {
      service
        .isAuthenticated()
        .then((response) => {
          setLoggedInUser(response);
        })
        .catch((err) => {
          setLoggedInUser(false);
        });
    }
  };
  
    // Function to help get the loggedIn user
  const getLoggedInUser = (userObject) => {
    setLoggedInUser(userObject);
  };

  // Run to check if user is authenticated
  fetchUser();
  
  if (loggedInUser) {
    console.log(loggedInUser);
  return (
    <section className="App">
        <h1>Welcome User {loggedInUser.username}</h1>
        <Switch>
          <Route path="/products"
         component ={ProductList}/>

         
        </Switch>
    </section>
  );
  } else {
    return (
      <section className="App">
      <Navbar userInSession={loggedInUser} getUser={getLoggedInUser} />

    <Switch>
    <Route
        exact
        path="/signup"
        render={() => <Signup getUser={getLoggedInUser} />}
      />
     <Route
        exact
        path="/login"
        render={() => <Login getUser={getLoggedInUser} />}
      />

    </Switch>  
  </section>
    )
  }
}

export default App;
