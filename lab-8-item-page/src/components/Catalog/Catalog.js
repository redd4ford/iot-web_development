import React, { useState } from "react";
import Item from "./Item/Item.js";
import Search from "./Search/Search.js";
import Filters from "./Filters/Filters.js";
import ItemInfo from "./Item/ItemInfo/ItemInfo.js";
import "./Catalog.css";
import placeholder from "../../img/placeholder-200x200.jpg";
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

function Catalog() {

  const[items] = useState([
    { id: 1, image: placeholder, price: 20, producer: 'Ukraine', color: 'RED', weight: '20', height: '26'},
    { id: 2, image: placeholder, price: 30, producer: 'USA', color: 'CHOCOLATE', weight: '21', height: '25'},
    { id: 3, image: placeholder, price: 20, producer: 'China', color: 'GOLD', weight: '22', height: '24'},
    { id: 4, image: placeholder, price: 40, producer: 'Ukraine', color: 'GREEN', weight: '23', height: '23'},
    { id: 5, image: placeholder, price: 20, producer: 'USA', color: 'DODGERBLUE', weight: '24', height: '22'},
    { id: 6, image: placeholder, price: 50, producer: 'Chine', color: 'BLUE', weight: '25', height: '21'},
    { id: 7, image: placeholder, price: 20, producer: 'Ukraine', color: 'PURPLE', weight: '26', height: '20'},
    { id: 8, image: placeholder, price: 20, producer: 'Ukraine', color: 'MAGENTA', weight: '27', height: '19'},
  ]);

  const [searched, setLSearched] = useState(items);
  const [filtered, setLFiltered] = useState(items);

  const [isSearched, setSearched] = useState(false);
  const [isFiltered, setFiltered] = useState(false);

  function triggerSearch(searchParameter) {
    if (searchParameter !== null && searchParameter !== "") {
      let array = []
      if (isFiltered && isSearched) {
        array = filtered.filter(value => searched.includes(value));
      } else if (isFiltered) {
        array = filtered;
      } else if (isSearched) {
        array = searched;
      } else {
        array = items;
      }
      
      setLSearched(array.filter(item => item.producer === searchParameter));
      setSearched(true);
    } else {
      setLSearched(items);
      setSearched(false);
    }
  };

  function filterByPrice(price) {
    if (price > 0) {
      let array = []
      if (isFiltered && isSearched) {
        array = filtered.filter(value => searched.includes(value));
      } else if (isFiltered) {
        array = filtered;
      } else if (isSearched) {
        array = searched;
      } else {
        array = items;
      }

      setLFiltered(array.filter(item => item.price <= price));
      setFiltered(true);
    }
  }

  function filterByHeight(height) {
    if (height > 0) {
      let array = []
      if (isFiltered && isSearched) {
        array = filtered.filter(value => searched.includes(value));
      } else if (isFiltered) {
        array = filtered;
      } else if (isSearched) {
        array = searched;
      } else {
        array = items;
      }

      setLFiltered(array.filter(item => item.height <= height));
      setFiltered(true);
    }
  }

  function filterByColor(color) {
    if (color !== "") {
      let array = []
      if (isFiltered && isSearched) {
        array = filtered.filter(value => searched.includes(value));
      } else if (isFiltered) {
        array = filtered;
      } else if (isSearched) {
        array = searched;
      } else {
        array = items;
      }

      setLFiltered(array.filter(item => item.color === color));
      setFiltered(true);
    }
  }

    let match = useRouteMatch();

    return(
        <div className="catalog-block">
          <Switch>
            <Route path={`${match.path}/:itemId`}>
              <ItemInfo items={items} />
            </Route>
            <Route path={match.path}>
              <Search onSearch={triggerSearch} />
              <Filters byPrice={filterByPrice} byHeight={filterByHeight} byColor={filterByColor}/>
              <div className="catalog">
                <div className="items">
                  <ul className={"grid-list"}>
                    {
                      isSearched && isFiltered ? (
                        filtered.map(item => (
                            <Item id={item.id} image={item.image} price={item.price} producer={item.producer} color={item.color} weight={item.weight} height={item.height} />
                        ))
                      ) : (
                        isSearched ? (
                          searched.map(item => (
                            <Item id={item.id} image={item.image} price={item.price} producer={item.producer} color={item.color} weight={item.weight} height={item.height} />
                        ))) : (
                          isFiltered ? (
                          filtered.map(item => (
                            <Item id={item.id} image={item.image} price={item.price} producer={item.producer} color={item.color} weight={item.weight} height={item.height} />
                        ))) : (
                          items.map(item => (
                            <Item id={item.id} image={item.image} price={item.price} producer={item.producer} color={item.color} weight={item.weight} height={item.height} />
                        )))
                        )
                      )
                    }
                  </ul>
                </div>
              </div>
            </Route>
          </Switch>
        </div>
    );
  }

export default Catalog;