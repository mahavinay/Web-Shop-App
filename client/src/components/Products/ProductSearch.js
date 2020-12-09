import React, {useState} from 'react'

function ProductSearch(props) {

    const [prodSearch, setProdSearch]=useState("")

    const handleSearchHandler = (event) =>{
        event.preventDefault();
        let inputValue = event.target.value;
        
    }
    return (
        <div>
            <form onChange={handleSearchHandler}>
            <input 
            name="search"
            type="text"
            placeholder="Enter what you want to search for"
            
            value={prodSearch}
            />
            </form>
        </div>
    )
}

export default ProductSearch
