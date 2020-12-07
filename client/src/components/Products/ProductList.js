import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AddProductForm from "./forms/AddProductForm";

import ProductService from "../../services/product-service";
import './productList.css'


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

   const sortAllProducts = () => {
    const service = new ProductService();
    service
    .sortProduct()
    .then((responseFromApi) => {
      setListOfProducts(responseFromApi.data);
    })
    .catch((error) => console.error(error)); 
   }
    
  /*   const sortAllProductByColor = () => {
      
      listOfProducts.sort((a, b) => a.color.localeCompare(b.color))
      console.log(listOfProducts);
      setListOfProducts(listOfProducts)
    } */

/*     const sortAllProductByPrice = () => {
      listOfProducts.sort((a, b) => {
        if (a.price > b.price){
          return -1
      } 
      if (a.price < b.price){
         return 1
      }
      return 0
      })
      console.log(listOfProducts);
      setListOfProducts(listOfProducts)
    } */

    useEffect(getAllProducts, []);
    
  

    return(
        <div>
      <div style={{ width: "60%", float: "left" }}>
        <h2>List of Products</h2>
        <button onClick={()=>sortAllProducts()}>Sort By Color</button>
        <br/>
        {/* <button onClick={()=>sortAllProductByPrice()}>Sort By Price</button> */}
        {listOfProducts
          ? listOfProducts.map((product) => {
              return (
                <div key={product._id} className="products-card">
                  <div>
                    <Link to={`/products/${product._id}`}>
                      <h3>{product.productName}</h3>
                    </Link>
                    <p>Size:{product.size} </p>
                    <p>Color: {product.color}</p>
                    <p>Price: {product.price} euros</p>
                    <p>Category: {product.category}</p>
                    <p>Sub-Category: {product.subCategory}</p>
                  </div>

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