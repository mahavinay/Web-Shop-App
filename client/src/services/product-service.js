import axios from "axios";


class ProductService {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:5000/api",
      withCredentials: true, // indicates whether or not cross-site Access-Control requests should be made using credentials
    });
  }

  
  createProduct = (data) => {
    return this.service
      .post("/products", data)
      .then((response) => response);
  };

  
  getProducts = () => {
    return this.service.get("/products").then((response) => response);
  };

  
  getOneProduct = (id) => {
    return this.service.get(`/products/${id}`).then((response) => response);
  };

 
  updateProduct = (id, data) => {
    return this.service
      .put(`products/${id}`, data)
      .then((response) => response);
  };

  
  removeProduct = (id) => {
    return this.service
      .delete(`/products/${id}`)
      .then((response) => response);
  };

  sortProduct= () => {
    return this.service
    .post("/products").then((response) => 
    
    response.sort((a, b) => a.color.localeCompare(b.color))
    )
  }
}

export default ProductService;
