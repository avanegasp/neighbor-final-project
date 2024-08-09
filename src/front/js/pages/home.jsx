import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="home-container bg-withe">
      <div className="row w-100">
        <div className="col-12 text-center">
          <h1 className="home-title">NEIGHBORS</h1>
        </div>
      </div>
      <div className="row w-100">
        <div className="col-md-6 d-flex align-items-center justify-content-center bg-withe">
          <p className="description">
            Neighburs es una aplicación excelente que mejora la gestión y organización de edificios, simplifica la comunicación entre residentes y administradores, optimiza solicitudes de mantenimiento, y fomenta la comunidad y el apoyo a negocios locales.
          </p>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="card p-4 shadow-sm">
            <Link to="/login" className="btn btn-login">
              Iniciar sesión
            </Link>
            <Link to="/register" className="btn btn-signup">
              Crear cuenta nueva
            </Link>
            <Link to={"/profileSeller"}>Perfil Vendedora(a)</Link>
            <Link to={"/profileAdmin"}>Perfil Admin</Link>
            <Link to={"/profileNeighbor"}>Perfil Vecino(a)</Link>

            {/* <Link to={"/Business"}> SHOP </Link>
            <Link to={"/directory"}>Directorio</Link> */}

          </div>
        </div>
      </div>
    </div>
  );
};
