import axios from "axios";

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true, 
    });
  }

  signup = (username, password, email) => {
    return this.service
      .post("/api/signup", { username, password, email })
      .then((response) => response.data);
  };

  login = (username, password) => {
    return this.service
      .post("/api/login", { username, password})
      .then((response) => response.data);
  };

  isAuthenticated = () => {
    return this.service.get("/api/loggedin").then((response) => response.data);
  };

  logout = () => {
    return this.service.post("/api/logout", {}).then((response) => response.data);
  };
}

export default AuthService;
