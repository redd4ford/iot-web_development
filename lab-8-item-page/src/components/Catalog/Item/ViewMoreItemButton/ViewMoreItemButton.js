import React from 'react';
import "./ViewMoreItemButton.css";
import {
    Link,
    useRouteMatch
  } from "react-router-dom";

function ViewMoreItemButton(props) {
    let match = useRouteMatch();

    return <Link to={`${match.url}/${props.id}`}><button className="item-view-more">View more</button></Link>;
}

export default ViewMoreItemButton;