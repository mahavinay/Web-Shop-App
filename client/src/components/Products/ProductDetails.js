import React, { useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import ProductService from "../../services/product-service";
import EditProductForm from './forms/EditProductForm'

const ProductDetails = (props) => {
     const [details, setDetails] = useState({});

    const individualProduct = () =>{
        const { id } = props.match.params;
        const service = new ProductService();
      
        service
        .getOneProduct(id)
        .then((responseFromApi) => {
          setDetails(responseFromApi.data);
        })
      .catch((error) => console.error(error));
    }
    
    useEffect(individualProduct, [props.match.params]);
    
 
  const renderEditForm = () => {
 
    if (!details.productName) {
  
      individualProduct();
    } else {
     
      return (
        <EditProductForm
          theProduct={details}
          getTheProduct={individualProduct}
          {...props}
        />
      );
    }
  };

  const deleteProduct = () => {

    const { id } = props.match.params;

    const service = new ProductService();

    service
      .removeProduct(id)
      .then(() => {
   
        props.history.push("/products");
      })
      .catch((error) => console.error(error));
  };
  
  const ownershipCheck = (product) => {
    if (props.loggedInUser && product.seller === props.loggedInUser._id) {
            return (
        <div>
          <div style={{width:"50%", float: "left"}}>{renderEditForm()} </div>
          <br/>
          <div style={{width:"50%", float:"right"}}>
          <button className="btn-all" onClick={() => deleteProduct(details._id)}>
            Delete product
          </button>
          <br/>
          
          </div>
        </div>
      );
    }
  };

    return (
        <div className="products-detail">
         <h1>Product Details of {details.productName}</h1>
         <div>
            <p><b>Size:</b> {details.size}</p>
            <p><b>Color:</b> {details.color}</p>
            <p><b>Price:</b> {details.price}</p>
            <p><b>Category:</b>{details.category}</p>
            <p><b>SubCategory:</b> {details.subCategory}</p>
            <br />
            <div>{ownershipCheck(details)}</div>
            <br/>
            <br/>
            <div><Link to="/products">Back to products</Link></div>
            </div>
    </div>
    )
}

export default ProductDetails;
