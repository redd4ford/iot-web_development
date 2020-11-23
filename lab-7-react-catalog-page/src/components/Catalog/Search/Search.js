import React, { useState } from "react";
import "./Search.css";

function Search() {
    return (
        <div className="catalog-search-block">
        <form className="search-form" onSubmit="">
            <input id="search-producer" type="text" placeholder="Search by producer..." />
            <input className="button search-button" type="submit" id="search-button" value="Search" />
            <button className="button cancel-button" onclick="">Cancel</button>
            <input className="button sort-button" type="button" id="bubble-sort" onclick="" value="Sort" />
        </form>
        </div>
    );
}

export default Search;