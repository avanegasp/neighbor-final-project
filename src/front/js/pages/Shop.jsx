import React, { useContext, useEffect } from "react";
import StarsRating from "../component/StarsRating.jsx";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const Shop = (shop) => {
  const { store, actions } = useContext(Context)
  const params = useParams()
  const shop_name = store.shop.name;

  useEffect(() => {
    actions.getSingleBusiness(params.seller_id, params.business_id);
  }, []);
  // console.log(store.shop);

  return (
    <div className="App">

      <h2>Añade una reseña</h2>
      <StarsRating />
    </div>
  );
};

export default Shop;
