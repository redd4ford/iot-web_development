import React, { useState } from "react";
import Item from "./Item/Item.js";
import Search from "./Search/Search.js";
import "./Catalog.css";
import placeholder from "../../img/placeholder-200x200.jpg";

function Catalog() {

    const[items] = useState([
        { id: 1, image: placeholder, price: 20, producer: 'Ukraine', color: 'RED', weight: '20', height: '26'},
        { id: 2, image: placeholder, price: 30, producer: 'USA', color: 'ORANGE', weight: '21', height: '25'},
        { id: 3, image: placeholder, price: 20, producer: 'China', color: 'YELLOW', weight: '22', height: '24'},
        { id: 4, image: placeholder, price: 40, producer: 'Ukraine', color: 'GREEN', weight: '23', height: '23'},
        { id: 5, image: placeholder, price: 20, producer: 'USA', color: 'CYAN', weight: '24', height: '22'},
        { id: 6, image: placeholder, price: 50, producer: 'Chine', color: 'BLUE', weight: '25', height: '21'},
        { id: 7, image: placeholder, price: 20, producer: 'Ukraine', color: 'PURPLE', weight: '26', height: '20'}
    ]);

    return(
        <div className="catalog-block">
            <Search />

            <div className="catalog">
                <div className="items">
                    <ul className={"grid-list"}>
                      {items.map(item => (
                        <Item id={item.id} image={item.image} price={item.price} producer={item.producer} color={item.color} weight={item.weight} height={item.height} />
                      ))}
                    </ul>
                </div>
            </div>
        </div>
    );
  }

export default Catalog;