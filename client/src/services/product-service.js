import axios from "axios";


class ProductService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true, // indicates whether or not cross-site Access-Control requests should be made using credentials
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

 /*  sortProduct= () => {
    return this.service
    .post("/api/products").then((response) => 
    
    response.sort((a, b) => a.color.localeCompare(b.color))
    )
  } */
}

export default ProductService;
