import React from 'react';

import "./Tile.css";

function Tile(props) {
    return(
        <div className="tile">
            <div className="tile-img">
                <img src={props.image} alt="door"></img>
            </div>
            <div className="tile-description">
                <h3>{props.heading}</h3>
                <p>{props.message}</p>
            </div>
        </div>
    );
}

export default Tile;