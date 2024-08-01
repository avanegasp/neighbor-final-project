import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h1>Hello Neighbors!!</h1>
      <div>
        <div>
          <Link to={"/profileNeighbor"}>Perfil Vecino(a)</Link>
        </div>
        <div>
          <Link to={"/profileSeller"}>Perfil Vendedora(a)</Link>
        </div>
        <div>
          <Link to={"/profileAdmin"}>Perfil Admin</Link>
        </div>
        <div>
          <Link to={"/directory"}>Directorio</Link>
        </div>
      </div>
    </div>
  );
};
