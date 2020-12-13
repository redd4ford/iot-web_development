import React from 'react';
import Hero from "./Hero/Hero.js";

import "./Header.css";

export default function Header() {
    return(
        <header className="header-container">
            <Hero />
        </header>
    );
}
