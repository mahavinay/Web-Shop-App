import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AddProductForm from "./forms/AddProductForm";

import ProductService from "../../services/product-service";
import './productList.css'


const ProductList = () => {
    const [listOfProducts, setListOfProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);

    const getAllProducts = () => {  
        const service = new ProductService();

    service
      .getProducts()
      .then((responseFromApi) => {
        setListOfProducts(responseFromApi.data);
      })
      .catch((error) => console.error(error));  
    }

    const sortAllProductByColor = () => {
      const allProducts = [...listOfProducts]
      allProducts.sort((a, b) => {
       return a.color.localeCompare(b.color)
      })
    
      setListOfProducts(allProducts)
    }

    const sortAllProductByPrice = () => {
      const allProducts = [...listOfProducts]
      allProducts.sort((a, b) => {
        if (a.price > b.price){
          return -1
      } 
      if (a.price < b.price){
         return 1
      }
      return 0
      })
      console.log(listOfProducts);
      setListOfProducts(allProducts)
    }

   /*  const renderProducts = () => listOfProducts.map((product) => {
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
    }) */

   /*  const renderSortedProducts = () => sortedProducts.map((product) => {
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
    }) */

    useEffect(getAllProducts, []);
  
  

    return(
        <div>
        <div style={{ width: "60%", float: "left" , height: "500px"}}>
          <h2>List of Products</h2>
          <button onClick={()=>sortAllProductByColor()}>Sort By Color</button>
          <br/>
          <button onClick={()=>sortAllProductByPrice()}>Sort By Price</button>
        
          {listOfProducts ? listOfProducts.map((item) => {
                return (
                <div key={item._id} className="products-card">
                  <div>
                    <Link to={`/products/${item._id}`}>
                    <h3>{item.productName}</h3>
                    </Link>
                    <p>Size:{item.size} </p>
                    <p>Color: {item.color}</p>
                    <p>Price: {item.price} euros</p>
                    <p>Category: {item.category}</p>
                    <p>Sub-Category: {item.subCategory}</p>
                  </div>
                </div>
                  )
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