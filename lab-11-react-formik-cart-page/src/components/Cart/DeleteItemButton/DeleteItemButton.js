import React from 'react';
import { useDispatch } from "react-redux";

import "./DeleteItemButton.css";

import { removeItem } from "../../../api/store/Actions.js";

export default function DeleteItemButton(props) {

    const dispatch = useDispatch();

    return <button className="cart-item-delete" onClick={() => (dispatch(removeItem(props)))}>Delete</button>;

}


