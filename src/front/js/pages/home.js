import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h1>Hello Neighbors!!</h1>
      <Link to={"/profileNeighbor"}>Profile Neighbor</Link>
    </div>
  );
};
