import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

import "./Catalog.css";

import Item from "./Item/Item.js";
import Search from "./Search/Search.js";
import Filters from "./Filters/Filters.js";
import ItemInfo from "./Item/ItemInfo/ItemInfo.js";
import { getAllByFilters } from "../../api/Crud.js";
import Loader from "./Loader/Loader.js";

function Catalog() {

  const [items, setItems] = useState([]);
  const [producerFilter, setProducerFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState();
  const [heightFilter, setHeightFilter] = useState();
  const [colorFilter, setColorFilter] = useState('');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
        setItems(await getAllByFilters(producerFilter, priceFilter, heightFilter, colorFilter));
        setLoading(false);
    })()
}, [producerFilter, priceFilter, heightFilter, colorFilter]);

  function filterByProducer(producer) {
    if (producer !== '') {
      setLoading(false);
      setProducerFilter(producer);
      setLoading(true);
    }
  }

  function filterByPrice(price) {
    if (price > 0) {
      setLoading(false);
      setPriceFilter(price);
      setLoading(true);
    }
  }

  function filterByHeight(height) {
    if (height > 0) {
      setLoading(false);
      setHeightFilter(height);
      setLoading(true);
    }
  }

  function filterByColor(color) {
    if (color !== "") {
      setLoading(false);
      setColorFilter(color);
      setLoading(true);
    }
  }

    let match = useRouteMatch();

    return(
        <div className="catalog-block">
          <Switch>
            <Route path={`${match.path}/:itemId`}>
              <ItemInfo items_len={items.length} />
            </Route>
            <Route path={match.path}>
              <Search byProducer={filterByProducer} />
              <Filters byPrice={filterByPrice} byHeight={filterByHeight} byColor={filterByColor} />
              <div className="catalog">
                <div className="items">
                    {
                      loading ? (
                        <Loader />
                      ) : (
                        items.length !== 0 ? (
                          items.length >= 3 ? (
                          <ul className={"grid-list"}> {
                          items.map(item => (
                              <Item id={item.id} price={item.price} producer={item.producer} color={item.color} weight={item.weight} height={item.height} />
                          ))
                          } </ul>
                          ) : (
                            <ul className={"grid-less-than-three"}> {
                              items.map(item => (
                                  <Item id={item.id} price={item.price} producer={item.producer} color={item.color} weight={item.weight} height={item.height} />
                              ))
                              } </ul>
                          )) : (
                            <p className="not-found">
                              No doors found!
                            </p>
                          )
                      )
                    }
                </div>
              </div>
            </Route>
          </Switch>
        </div>
    );
  }

export default Catalog;