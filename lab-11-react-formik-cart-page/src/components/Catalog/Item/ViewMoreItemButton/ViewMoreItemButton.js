import React from 'react';
import {
  Link,
  useRouteMatch
} from "react-router-dom";

import "./ViewMoreItemButton.css";

export default function ViewMoreItemButton(props) {
    let match = useRouteMatch();

    return <Link to={`${match.url}/${props.id}`}><button className="item-view-more">View more</button></Link>;
}
