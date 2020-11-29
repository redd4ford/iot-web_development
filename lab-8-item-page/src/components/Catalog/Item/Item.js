import React from 'react';
import "./Item.css";
import ViewMoreItemButton from "./ViewMoreItemButton/ViewMoreItemButton.js";
import PurchaseItemButton from "./PurchaseItemButton/PurchaseItemButton.js";

function Item(props) {
    return(
        <div className="item" id={props.id}>
            <div className="item-img">
                <img src={props.image} alt="DOOR"></img>
            </div>
            <div className="item-description">
                <h2># {props.id}</h2>
                <p>PRODUCER: {props.producer}</p>
                <p>COLOR: {props.color}</p>
                <p>WEIGHT (KG): {props.weight} | HEIGHT (CM): {props.height}</p>
            </div>
            <div className="item-detail">
                <div className="item-price">
                    <p><strong>PRICE: </strong></p>
                    <p><strong>{props.price} UAH</strong></p>
                </div>
                <div className="item-buttons">
                    <ViewMoreItemButton id={props.id} />
                    <PurchaseItemButton />
                </div>
            </div>
        </div>
    );
}

export default Item;