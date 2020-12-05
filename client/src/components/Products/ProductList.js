import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AddProductForm from "./forms/AddProductForm";

import ProductService from "../../services/product-service";


const ProductList = () => {
    const [listOfProducts, setListOfProducts] = useState([]);

    const getAllProducts = () => {
        const service = new ProductService();

    service
      .getProducts()
      .then((responseFromApi) => {
        setListOfProducts(responseFromApi.data);
      })
      .catch((error) => console.error(error));
    }

    useEffect(getAllProducts, []);

    return(
        <div>
      <div style={{ width: "60%", float: "left" }}>
        <h2>List of Products</h2>
        {listOfProducts
          ? listOfProducts.map((product) => {
              return (
                <div key={product._id} className="products-list">
                  <Link to={`/products/${product._id}`}>
                    <h3>{product.productName}</h3>
                  </Link>
                  <p>Size:{product.size} </p>
                  <p>Color: {product.color}</p>
                  <p>Price: {product.price}</p>
                  <p>Category: {product.category}</p>
                  <p>Sub-Category: {product.subcategory}</p>
                </div>
              );
            })
          : `Loading...`}
      </div>
      <div style={{ width: "40%", float: "right" }}>
        <AddProductForm getData={getAllProducts} />
      </div>
    </div>

    )
}

export default ProductList;