import axios from "axios";

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:5000/api",
      withCredentials: true, 
    });
  }

  // Method to use in our SignUp component
  signup = (username, password, email) => {
    return this.service
      .post("/signup", { username, password, email })
      .then((response) => response.data);
  };

  // Method to use in our Login component
  login = (username, password, email) => {
    return this.service
      .post("/login", { username, password, email })
      .then((response) => response.data);
  };

  // Method to use to see if user is authenticated
  isAuthenticated = () => {
    return this.service.get("/loggedin").then((response) => response.data);
  };

  // Method to use for logging our user out
  logout = () => {
    return this.service.post("/logout", {}).then((response) => response.data);
  };
}

export default AuthService;