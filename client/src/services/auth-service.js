import axios from "axios";

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true, 
    });
  }

  // Method to use in our SignUp component
  signup = (username, password, email) => {
    return this.service
      .post("/api/signup", { username, password, email })
      .then((response) => response.data);
  };

  // Method to use in our Login component
  login = (username, password) => {
    return this.service
      .post("/api/login", { username, password})
      .then((response) => response.data);
  };

  // Method to use to see if user is authenticated
  isAuthenticated = () => {
    return this.service.get("/api/loggedin").then((response) => response.data);
  };

  // Method to use for logging our user out
  logout = () => {
    return this.service.post("/api/logout", {}).then((response) => response.data);
  };
}

export default AuthService;
