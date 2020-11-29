import React from "react";
import "./ItemInfo.css";
import {
    useParams,
    Link
  } from "react-router-dom";

import placeholderBig from "../../../../img/placeholder-500x500.jpg";
import PurchaseItemButton from "../PurchaseItemButton/PurchaseItemButton.js";

function ItemInfo(props) {
    let { itemId } = useParams();
    
    let item = props.items[itemId-1];

    let linkBack = '';
    if (itemId > 1) {
        linkBack = Number(itemId) - 1;
    } else {
        linkBack = '../catalog';
    }

    let linkTo = '';
    if (itemId < props.items.length) {
        linkTo = Number(itemId) + 1;
    } else {
        linkTo = '../catalog';
    }

    return (
        <div className="info-block">
            <div className="go-back">
                <Link to={`${linkBack}`}>❰❰❰ Go back</Link> | <Link to={`${linkTo}`}>Next ❱❱❱</Link>
                <hr></hr>
            </div>
            <div className="info-container">
                <div className="img-big">
                    <img src={placeholderBig} alt="DOOR"></img>
                </div>
                <div className="item-info">
                    <div className="item-info-header">
                        <div className="item-info-price">{item.price} UAH</div>
                        <h1 className="item-info-id"># {itemId}</h1>
                    </div>
                    <div className="item-info-parameters">
                        <div className="item-info-key"><span style={{color: item.color}}>{item.color}</span>
                        <span> | {item.producer}</span></div>
                        <div>WEIGHT: {item.weight} KG</div>
                        <div>HEIGHT: {item.height} CM</div>
                    </div>
                    <hr></hr>
                    <div className="item-info-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ultrices volutpat aliquam.<br></br><br></br>
                    Donec metus ex, maximus sed rhoncus a, elementum et urna. Vivamus quis tempor nisi. Duis posuere nisl ut semper fringilla. Pellentesque facilisis, erat et rutrum lacinia, felis odio dignissim risus, vitae euismod dui arcu sit amet ante.<br></br><br></br>
                    In rhoncus. Elit. Et felis viverra luctus. 
                    </div>
                    <div className="purchase-button">
                        <PurchaseItemButton />
                    </div>
                </div>
            </div>
        </div>
      );
  }

export default ItemInfo;