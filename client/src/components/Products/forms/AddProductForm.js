import React, { useState } from "react";
import ProductService from "../../../services/product-service";

const initialState = { productName: "", size: "", color: "", price:0, category:"", subCategory:""};

const AddProductForm = (props) => {
    const [formState, setFormState] = useState(initialState);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
      };

      const handleFormSubmit = (event) => {
        // Prevent default form action
        event.preventDefault();
    
        // Extract values to use with axios call
        const { productName, size, color, price, category,subCategory} = formState;
    
        const service = new ProductService();
    
        // Make api call to the backend to save form data
        service
          .createProduct({ productName, size, color, price, category, subCategory })
          .then(() => {
            props.getData();
            setFormState(initialState);
          })
          .catch((error) => console.error(error));
      };
      
    return (
        <div className="form-data">
            <h2>Add New Product</h2>
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

              <div>
                <button className="btn-all" type="submit">
                  Submit
                </button>
              </div>
          
            </form>
        </div>
    )
}

export default AddProductForm
