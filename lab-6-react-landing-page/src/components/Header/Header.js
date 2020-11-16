import React from 'react';
import Navbar from "./Navbar/Navbar";
import Hero from "./Hero/Hero";
import "../Header/Header.css";

function Header() {
    return(
        <header className="header-container">
            <div>
                <Navbar />
            </div>
            <div>
                <Hero />
            </div>
        </header>
    );
}

export default Header;