import React, { useEffect, useState } from "react";
import {
  Link,
  useRouteMatch
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { increment, decrement } from "../../api/store/Actions.js";
import DeleteItemButton from "./DeleteItemButton/DeleteItemButton.js";
import ViewItemButton from "./ViewItemButton/ViewItemButton.js";

import "./Cart.css";
import placeholder from "../../img/placeholder-100x100.jpg";

export default function Cart() {
    let match = useRouteMatch();

    const dispatch = useDispatch();
    const items = useSelector(state => state);
    const [totalPrice, setTotalPrice] = useState(0);

    console.log(items);
    console.log(totalPrice);

    useEffect(() => {
        setTotalPrice(items.reduce((counter, item) =>
            (counter + item.item.price * item.counter), 0))
    }, [items])

    return (
      <div className="cart-block">
        {
        totalPrice === 0 ? (
          <p className="total-price">
            Your cart is empty. Try purchasing one of those pretty doors! All of them will appear here.
          </p>
        ) : (
          <div>
          <ul className={"cart-items"}>
              {items.map(item => (
                <li className="cart-item">
                  <div className="cart-item-info">
                    <div className="cart-item-preview">
                      <img src={placeholder} alt="DOOR"></img>
                      <div className="cart-item-tags">
                      <span className="cart-tag">{item.item.id}</span>
                      <span className="cart-tag">{item.item.producer}</span>
                      <span className="cart-tag">{item.item.color}</span>
                      <span className="cart-tag">{item.item.height}x{item.item.weight}</span>
                      </div>
                    </div>
                    <div className="cart-item-lower">
                      <div className="cart-item-view-buttons">
                        <DeleteItemButton item={item} />
                        <ViewItemButton id={item.item.id} />
                      </div>
                      <div className="cart-item-counters">
                        <p className="cart-item-price-text">
                        <strong>{item.item.price * item.counter} UAH</strong>
                        , {item.counter}
                        </p>
                        <button className="cart-item-increment" onClick={() => (dispatch(increment(item)))}>+</button>
                        <button className="cart-item-decrement" onClick={() => (dispatch(decrement(item)))}>-</button>
                      </div>
                    </div>
                  </div>
                </li>
                )
              )}
            </ul>
            
              <div className="cart-proceed">
              <h1 className="total-price">Total: {totalPrice} UAH</h1>
                <Link to={`../cart/form`}><button className="cart-proceed-button">Proceed</button></Link>
                <button className="cart-clear-button" onClick={() => (window.location.reload())}>Clear</button>
              </div>
            </div>
          )
        }
        </div>
        );
    
  }