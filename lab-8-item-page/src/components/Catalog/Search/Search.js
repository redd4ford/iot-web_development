import React from "react";
import "./Search.css";

function Search(props) {  
    
    function doSearch(e) {
      e.preventDefault();          
      let param = document.getElementById('search-producer').value;
      props.onSearch(param);
    };

    function cancelSearch() {
       window.location.reload();
    }

    return (
        <div className="catalog-search-block">
        <form className="search-form" onSubmit={doSearch}>
            <input id="search-producer" type="text" placeholder="Search by producer..." />
            <input className="button search-button" type="submit" id="search-button" value="Search" />
            <button className="button cancel-button" onClick={cancelSearch}>Cancel</button>
        </form>
        </div>
    );
}

export default Search;