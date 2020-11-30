import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Header from "../Common/Header/Header.js";
import Footer from "../Common/Footer/Footer.js";

import Home from "../Home/Home.js";
import Catalog from "../Catalog/Catalog.js";
import Cart from "../Cart/Cart.js";

import "../App/App.css"
import "../Common/Header/Navbar/Navbar.css";
import "../Common/Header/Header.css";

function App() {

  return (
    <Router>  
      <div className="app">
          <nav className="navbar-container">
              <ul>
                  <li>
                    <Link to="/">home</Link>
                  </li>
                  <li>
                    <Link to="/catalog">catalog</Link>
                  </li>
                  <li>
                    <Link to="/cart">cart</Link>
                  </li>
              </ul>
          </nav>
          <Header />
          
          <Switch>
            <Route path="/catalog">
              <Catalog />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
          <Footer />
      </div>
    </Router>
  );
}

export default App;
