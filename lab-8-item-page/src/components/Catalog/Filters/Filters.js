import React from "react";
import "./Filters.css";

function FilterByPrice(props) {  

    function doFilterByPrice(e) {
        e.preventDefault();          
        let price = document.getElementById('price').value;
        props.byPrice(price);
    };

    function doFilterByHeight(e) {
        e.preventDefault();
        let height = document.getElementById('height').value;
        props.byHeight(height);
    }

    function doFilterByColor(e) {
        e.preventDefault();
        let color = document.getElementById('color').value;
        props.byColor(color);
    }

    
    return (
        <div className="filters">
            <form className="filter filter-by-price" onSubmit={doFilterByPrice}>
                <input id="price" type="number" placeholder="Cheaper than..." min="10" max="100" step="5"/>
                <input className="button sort-button" type="submit" id="search-button" value="Filter" />
            </form>
            <form className="filter filter-by-height" onSubmit={doFilterByHeight}>
                <input id="height" type="number" placeholder="Higher than..." min="10" max="100" step="5"/>
                <input className="button sort-button" type="submit" id="search-button" value="Filter" />
            </form>
            <form className="filter filter-by-color" onSubmit={doFilterByColor}>
                <select class="form-control" id="color" placeholder="Choose color..." required>
                    <option value="" disabled selected>Select color</option>
                    <option value="RED">RED</option>
                    <option value="BLUE">BLUE</option>
                    <option value="BLACK">BLACK</option>
                    <option value="WHITE">WHITE</option>
                </select>
                <input className="button sort-button" type="submit" id="search-button" value="Filter" />
            </form>
        </div>
    );

}

export default FilterByPrice;