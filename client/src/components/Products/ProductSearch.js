import React from 'react'
 
function ProductSearch(props) {
  const handleSearchInput = (event) =>{
    let searchString =event.target.value;
    
      props.handleFilterSearch(searchString) 
  }  

  return (
    <div>
        <span>
          <input
            name="search"
            type="text"
            placeholder="Search your product..."
            onChange={handleSearchInput} 
            />
          </span>
    </div>
)
}

export default ProductSearch
