import React from 'react';
import Navbar from "./Navbar/Navbar";
import Hero from "./Hero/Hero";
import "./Header.css";

function Header() {
    return(
        <header className="header-container">
            <Hero />
        </header>
    );
}

export default Header;