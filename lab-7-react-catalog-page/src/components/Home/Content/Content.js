import React, {useState} from "react";
import Text from "./Text/Text";
import Tile from "./Tile/Tile";
import ViewMore from "./ViewMore/ViewMore";
import "./Content.css";
import oak from "../../../img/oak.JPG";
import walnut from "../../../img/walnut.JPG";
import contemporary from "../../../img/contemporary.JPG";

function Content() {
    const[tiles] = useState([
        { heading: "OAK DOORS", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel augue velit.", image: oak },
        { heading: "WALNUT", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel augue velit.", image: walnut },
        { heading: "CONTEMPORARY", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel augue velit.", image: contemporary },
    ]);

    return(
        <div className="content-block">
            <Text />
            <div className="tiles">
              {tiles.map(tile => (
                <Tile heading={tile.heading} message={tile.message} image={tile.image} />
              ))}
            </div>
            <ViewMore />
        </div>
    );
}

export default Content;
