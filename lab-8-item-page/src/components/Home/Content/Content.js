import React, {useState} from "react";
import Text from "./Text/Text";
import Tile from "./Tile/Tile";
import "./Content.css";
import oak from "../../../img/oak.JPG";
import walnut from "../../../img/walnut.JPG";
import contemporary from "../../../img/contemporary.JPG";
import laminate from "../../../img/laminate.JPG";
import glazed from "../../../img/glazed.JPG";
import firecheck from "../../../img/firecheck.JPG";
import {
  Link
} from "react-router-dom";

function Content() {
    const[tiles] = useState([
      { heading: "OAK", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel augue velit.", image: oak },
      { heading: "WALNUT", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel augue velit.", image: walnut },
      { heading: "CONTEMPORARY", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel augue velit.", image: contemporary },
      { heading: "LAMINATE", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel augue velit.", image: laminate },
      { heading: "GLAZED", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel augue velit.", image: glazed },
      { heading: "FIRECHECK", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", image: firecheck }
    ]);

    const [border, setBorder] = useState(3);

    function showMore() {
      if (border <= tiles.length) {
        setBorder(border + 3);
        setSlicedTiles(tiles.slice(0, border + 3));
      }
    }

    const [slicedTiles, setSlicedTiles] = useState(tiles.slice(0, border));

    return(
        <div className="content-block">
            <Text />
            <div className="tiles">
              <ul className={"grid-list"}>
                {slicedTiles.map(tile => (
                  <Tile heading={tile.heading} message={tile.message} image={tile.image} />
                ))}
              </ul>
            </div>
            <div className="view-more-button">
              { border < tiles.length ? (
                  <button onClick={showMore}>View more</button>
                ) : (
                  <Link to={'/catalog'}><button>Go to catalog!</button></Link>
                )
              }
            </div>
        </div>
    );
}

export default Content;
