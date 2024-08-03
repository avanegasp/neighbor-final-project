import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="home-container ">
      <div className="row w-100">
        <div className="col-12 text-center">
          <h1 className="home-title">
            NEIGHBORS
          </h1>
        </div>
      </div>
      <div className="row w-100">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <p className="description">
            Neighburs is an excellent application designed to improve building management and organization. It simplifies communication between residents and building managers, streamlines maintenance requests, and tracks communal expenses with ease.

            The app helps building administrators efficiently manage tasks and resources, while also fostering a sense of community. It supports local businesses and encourages entrepreneurial ventures by connecting residents and facilitating collaboration.

            In essence, Neighburs is a powerful tool for enhancing both building operations and community engagement.
          </p>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="card p-4 shadow-sm mb-3">
            <Link to="/login" className="btn btn-login mb-3">Iniciar sesión/Login</Link>
            <Link to="/Register" className="btn btn-signup">Crear cuenta nueva/Signup</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

