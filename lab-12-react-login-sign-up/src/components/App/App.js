import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { removeItem, decrement } from '../../api/store/Actions.js';
import Header from "../Common/Header/Header.js";
import Footer from "../Common/Footer/Footer.js";

import Home from "../Home/Home.js";
import Catalog from "../Catalog/Catalog.js";
import Cart from "../Cart/Cart.js";
import LoginPage from "../Auth/Login/LoginPage.js";
import SignUpPage from "../Auth/SignUp/SignUpPage.js";

import "../App/App.css"
import "../Common/Header/Navbar/Navbar.css";
import "../Common/Header/Header.css";

export default function App() {
  
  const dispatch = useDispatch();

  const items = useSelector(state => state);
  const [totalAmount, setTotalAmount] = useState(0);

  const [isAuthenticated, setAuthenticated] = useState(false);

  console.log(items);

  useEffect(() => {
    let currTotal = 0;
    for (let i = 0; i < items.length; i++) {
      currTotal += items[i].counter;
    }
    setTotalAmount(currTotal)
  }, [items])

  function signIn() {
    setAuthenticated(true);
  }

  function signOut() {
    window.alert('Come back soon!');
    setAuthenticated(false);
    for (let i = 0; i < items.length; i++) {
      for (let j = 0; j <= items[i].counter; j++) {
        dispatch(decrement(items[i]));
      }
      dispatch(removeItem(items[i]));
    }
  }

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
              {
                isAuthenticated ? (
                  <li>
                    <button className="btn logout-button" onClick={signOut}>Log out</button>
                  </li>
                ) : (
                  <li>
                    <Link to='/auth/signup'><button className="btn signup-button">Sign up</button></Link>
                  </li> )
              }
          </ul>
      </nav>
      <Header />
      
      <Switch>
        <Route path="/catalog">
          { isAuthenticated ? <Catalog/> : <Redirect to="/auth/login" /> }
        </Route>
        <Route path="/cart">
          { isAuthenticated ? <Cart/> : <Redirect to="/auth/login" /> }
        </Route>
        <Route path="/auth/login">
          <LoginPage auth={setAuthenticated} signIn={signIn} signOut={signOut} />
        </Route>
        <Route path="/auth/signup">
          <SignUpPage />
        </Route>
        <Route path="/">
          { isAuthenticated ? <Home/> : <Redirect to="/auth/login" /> }
        </Route>
      </Switch>
      <Footer />
      </div>
    </Router>
  );
}
