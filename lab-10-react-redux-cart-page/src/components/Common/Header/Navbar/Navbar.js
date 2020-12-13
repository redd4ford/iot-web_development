import React from 'react';
import "./Navbar.css";

function Navbar() {
    return(
        <nav className="navbar-container">
            <ul>
                <li><a href="#">home</a></li>
                <li><a href="#">catalog</a></li>
                <li><a href="#">cart</a></li>
                <li><a href="#">contact us</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;