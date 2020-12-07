import React, { useState, useEffect, Link} from "react";
import ProductService from "../../services/product-service";

function ProductDetails(props) {
    const [details, setDetails] = useState({});

    const individualProduct = () =>{
        const { id } = props.match.params;
        console.log(id);
        const service = new ProductService();

        service
        .getOneProduct(id)
        .then((responseFromApi) => {
            setDetails(responseFromApi.data);
        })
      .catch((error) => console.error(error));
    }

    useEffect(individualProduct, [props.match.params]);

/*     const renderEditForm = () => {
        if (!details.productName) {
            individualProduct();
        }  else {
        return (
            <EditProductForm
              theProduct={details}
              getTheProject={individualProduct}
              {...props}
            />
          );
        } 
      };  */

  /*     const deleteProduct = () => {
        // get the 'id' from url via 'props.match.params' object
        const { id } = props.match.params;
        const service = new ProductService();
    
        service
          .removeProduct(id)
          .then(() => {
            props.history.push("/products");
          })
          .catch((error) => console.error(error));
      }; */
    

    return (
        <div className="products-list">
            <h1>Product Detail</h1>
            <h3>{details.productName}</h3>
            <p>{details.size}</p>
            <p>{details.color}</p>
            <p>{details.price}</p>
            <p>{details.category}</p>
            <p>{details.subCategory}</p>
            <br />
            <Link to="/products">Back to products</Link>
    </div>
    )
}

export default ProductDetails;
