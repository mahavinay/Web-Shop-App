import axios from "axios";


class ProductService {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:5000/api",
      withCredentials: true, // indicates whether or not cross-site Access-Control requests should be made using credentials
    });
  }

  // Create a project
  createProduct = (data) => {
    return this.service
      .post("/products", data)
      .then((response) => response);
  };

  // Method to retrieve all projects
  getProducts = () => {
    return this.service.get("/products").then((response) => response);
  };

  // Method to retrieve a project
  getOneProduct = (id) => {
    return this.service.get(`/products/${id}`).then((response) => response);
  };

  // Method to update a project
  updateProduct = (id, data) => {
    return this.service
      .put(`products/${id}`, data)
      .then((response) => response);
  };

  // Method to delete a project
  removeProduct = (id) => {
    return this.service
      .delete(`/products/${id}`)
      .then((response) => response);
  };
}

export default ProductService;
