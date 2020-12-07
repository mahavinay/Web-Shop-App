import React, { useState } from "react";
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom' 
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import AuthService from "./services/auth-service";
import Navbar from './components/Navbar/Navbar'
import ProductList from './components/Products/ProductList'
import ProductDetails from './components/Products/ProductDetails'
import Notfound from './components/Notfound'

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
    
  return (
    <section className="App">
        <h1>Welcome User {loggedInUser.username}</h1>
        <Navbar userInSession={loggedInUser} getUser={getLoggedInUser} />
        <Route 
          getUser={loggedInUser}
          exact path="/products/:id"
          component ={ProductDetails}
          />
        <Switch>
          <Route exact path="/products"
          component ={ProductList}/>
          
          <Route path="/login" component={() =>(<Redirect to="/products"/>)}/>
          <Route component={Notfound}/> 
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
