import React, { useState } from "react";
import ProductService from "../../../services/product-service";
import UploadService from "../../../services/upload-service";

const EditProductForm = (props) => {
  const [formState, setFormState] = useState({
    productName: props.theProduct.productName,
    size: props.theProduct.description,
    color: props.theProduct.color,
    price: props.theProduct.price,
    category: props.theProduct.category,
    subCategory: props.theProduct.subCategory,
    imageUrl:props.theProduct.imageUrl

  });

  const service = new UploadService();

  const handleFileUpload = (event) => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", event.target.files[0]);

     service
      .upload(uploadData)
      .then((response) => {
         setFormState({ ...formState, imageUrl: response.cloudinaryUrl });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
    };

    const handleFormSubmit = (event) => {
    event.preventDefault();

      const { productName, size, color, price, category, subCategory, imageUrl} = formState;

    const service = new ProductService();

    service
      .updateProduct(props.theProduct._id, {
        productName,
        size,
        color,
        price,
        category,
        subCategory,
        imageUrl
      })
      .then(() => {
         props.getTheProduct();
      })
      .catch((error) => console.error(error));

  };

   const handleInputChange = (event) => {
     const { name, value } = event.target;

    setFormState({ ...formState, [name]: value });
  };

  return (
    <div className="form-data">
      
      <h3>Edit the Product</h3>
      <form onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="productName"><b>Product Name:</b></label>
                <input
                  type="text"
                  name="productName"
                  value={formState.productName}
                  onChange={handleInputChange}
                  placeholder="Enter the product name"
                />
              </div>

              <div>
                <label htmlFor="size">Size:</label>
                <select id="select" name="size" value={formState.size} onChange={handleInputChange}>
                    <option value="SELECT">Select</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select>
              </div>

              <div>
                <label htmlFor="color">Color:</label>
                <select id="select" name="color" value={formState.color} onChange={handleInputChange}>
                    <option value="SELECT">Select</option>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="white">White</option>
                    <option value="black">Black</option>
                    <option value="orange">Orange</option>
                    <option value="grey">Grey</option>
                </select>
              </div>

              <div>
                <label htmlFor="Price">Price:</label>
                <input className="price-input"
                  type="number"
                  name="price"
                  value={formState.price}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="category">Category:</label>
                <select id="select" name="category" value={formState.category} onChange={handleInputChange}>
                    <option value="SELECT">Select</option>
                    <option value="Clothes">Clothes</option>
                    <option value="Furniture">Furniture</option>
                </select>
              </div>

              <div>
                <label htmlFor="sub-category">Sub-Category:</label>
                <select id="select" name="subCategory" value={formState.category} onChange={handleInputChange}>
                    <option value="Kids">Kids</option>
                    <option value="Women">Women</option>
                    <option value="Men">Men</option>
                </select>
              </div>

              
              <label htmlFor="imageUrl">Display Picture</label>
              <input type="file" name="imageUrl" onChange={handleFileUpload} />

              
              {formState.imageUrl ? (
                <button className="btn-all" type="submit"><b>Submit</b></button>
              ) : (
                <button disabled type="submit" className="btn-all">
                  <b>Submit</b>
                </button>
              )}
          
          </form>
    </div>
  );
};

export default EditProductForm;
