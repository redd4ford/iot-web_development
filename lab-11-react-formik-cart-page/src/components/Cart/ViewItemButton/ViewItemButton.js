import React from 'react';
import {
  Link,
  useRouteMatch
} from "react-router-dom";

import "./ViewItemButton.css";

export default function ViewItemButton(props) {
    let match = useRouteMatch();

    return <Link to={`../catalog/${props.id}`}><button className="cart-item-view">View</button></Link>;
}
