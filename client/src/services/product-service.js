import axios from "axios";

class ProductService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true,
    });
  }

createProduct = (data) => {
    return this.service
      .post("/api/products", data)
      .then((response) => response);
  };
  
  getProducts = () => {
    return this.service.get("/api/products").then((response) => response);
  };
  
  getOneProduct = (id) => {
    return this.service.get(`/api/products/${id}`).then((response) => response);
  };
 
  updateProduct = (id, data) => {
    return this.service
      .put(`/api/products/${id}`, data)
      .then((response) => response);
  };

  removeProduct = (id) => {
    return this.service
      .delete(`/api/products/${id}`)
      .then((response) => response);
  };
}

export default ProductService;
