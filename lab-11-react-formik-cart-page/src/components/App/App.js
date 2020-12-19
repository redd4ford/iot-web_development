import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "../Common/Header/Header.js";
import Footer from "../Common/Footer/Footer.js";

import Home from "../Home/Home.js";
import Catalog from "../Catalog/Catalog.js";
import Cart from "../Cart/Cart.js";

import "../App/App.css"
import "../Common/Header/Navbar/Navbar.css";
import "../Common/Header/Header.css";

export default function App() {

  const items = useSelector(state => state);
  const [totalAmount, setTotalAmount] = useState(0);

  console.log(items);

  useEffect(() => {
    let currTotal = 0;
    for (let i = 0; i < items.length; i++) {
      currTotal += items[i].counter;
    }
    setTotalAmount(currTotal)
  }, [items])


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
                  {
                    items.length !== 0 ? (
                      <li>
                        <Link to="/cart">cart <span className="total-amount">{totalAmount}</span></Link>
                      </li>
                    ) : (
                      <li>
                        <Link to="/cart">cart</Link>
                      </li>
                    )
                  }
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
