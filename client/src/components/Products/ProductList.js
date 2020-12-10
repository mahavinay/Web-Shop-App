import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddProductForm from "./forms/AddProductForm";
import ProductService from "../../services/product-service";
import './productList.css'
import ProductSearch from "../Products/ProductSearch"

const ProductList = () => {
    const [listOfProducts, setListOfProducts] = useState([]);
    const [filter, setfilter]=useState([])
    
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
        if (b.price > a.price){
          return -1
      } 
      if (b.price < a.price){
         return 1
      }
      return 0
      })
      
      setListOfProducts(allProducts)
    }

    const handleFilterProducts = (searchString) => {
      const stateCopy= [...listOfProducts]
      const filteredProductList = stateCopy.filter((eachProduct) =>
      eachProduct.productName.toLowerCase().includes(searchString.toLowerCase())
    );
    setfilter(filteredProductList)
    }

     useEffect(getAllProducts, []);

     return(
        <div>
          <div style={{ width: "60%", float: "left" , height: "500px"}}>    
            <span><button className="btn-all btn-sort"  onClick={()=>sortAllProductByColor()}>Sort By Color</button>
            <button className="btn-all" onClick={()=>sortAllProductByPrice()}>Sort By Price</button></span>
            <ProductSearch handleFilterSearch={handleFilterProducts}/>
            <br/>
            <br/>
            <div className="display-prod">
            {filter.length > 0 ? filter.map((item) => {
              return (
              <div key={item._id} className="products-card">
                  <Link to={`/products/${item._id}`}>
                  <h4>{item.productName}</h4>
                  </Link>
                  <img src={item.imageUrl} alt="product_image"/>
                  <p>Size:{item.size} </p>
                  <p>Color: {item.color}</p>
                  <p>Price: {item.price} euros</p>
                  <p>Category: {item.category}</p>
                  <p>Sub-Category: {item.subCategory}</p>
              
                  <br/>
                  <br/>
                
              </div>
                )
            })
            : listOfProducts.map((item) => {
              return (
              <div key={item._id} className="products-card">
                <Link to={`/products/${item._id}`}>
                <h4>{item.productName}</h4>
                </Link>
                <img src={item.imageUrl} alt="product_image"/>
                <p>Size:{item.size} </p>
                <p>Color: {item.color}</p>
                <p>Price: {item.price} euros</p>
                <p>Category: {item.category}</p>
                <p>Sub-Category: {item.subCategory}</p>
              </div>
                )
              })}
        </div>
        </div>
        <div style={{ width: "40%", float: "right", height: "1000px"}}>
          <AddProductForm getData={getAllProducts} />
        </div>
    </div>
      
    )
}

export default ProductList;