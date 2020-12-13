import React from 'react';
import { useDispatch } from 'react-redux';

import { addItem } from "../../../../api/store/Actions.js";

import "./PurchaseItemButton.css";

export default function PurchaseItemButton(props) {

    const dispatch = useDispatch();

    return <button onClick={() => dispatch(addItem(props))} className="item-purchase">Purchase</button>;
}
