import React, { useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import ProductService from "../../services/product-service";
import EditProductForm from './forms/EditProductForm'

const ProductDetails = (props) => {
     const [details, setDetails] = useState({});

    const individualProduct = () =>{
        const { id } = props.match.params;
        const service = new ProductService();
        console.log(id);

        service
        .getOneProduct(id)
        .then((responseFromApi) => {
          console.log(responseFromApi);
            setDetails(responseFromApi.data);
        })
      .catch((error) => console.error(error));
    }
    console.log(details);
    console.log(details.size);
    useEffect(individualProduct, [props.match.params]);
    
      // function to render the edit form.
  const renderEditForm = () => {
    // Check if there is some value in the details state
    if (!details.productName) {
      // run the api call if the state isn't filled
      individualProduct();
    } else {
      // render the edit form
      // pass down the details from state as props to form, in order to edit
      // pass down the project
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
    // get the 'id' from url via 'props.match.params' object
    const { id } = props.match.params;

    const service = new ProductService();

    // api call to the delete route in the backend
    service
      .removeProduct(id)
      .then(() => {
        // after submitting the form, 'props.history.push' can be used to redirect to 'projects'
        props.history.push("/products");
      })
      .catch((error) => console.error(error));
  };
/* 
  const ownershipCheck = (product) => {
    if (props.loggedInUser && product.owner === props.loggedInUser._id) {
      return (
        <div>
          <div>{renderEditForm()} </div>
          <button onClick={() => deleteProduct(details._id)}>
            Delete product
          </button>
        </div>
      );
    }
  }; */

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
            <div>{renderEditForm()}</div>
            <br/>
            <div><button className="btn-all" onClick={()=>deleteProduct()}>Delete product</button></div>
            <br/>
            <div><Link to="/products">Back to products</Link></div>
            </div>
    </div>
    )
}

export default ProductDetails;
