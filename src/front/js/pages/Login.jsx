import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await actions.login(email, password, userType);
    console.log(email, password, userType);
    console.log(response);
    if (response) {
      switch (userType) {
        case "NEIGHBOR":
          navigate(`/profileNeighbor/${response.user.id}`);
          return;
        case "SELLER":
          navigate(`/profileSeller/${response.user.id}`);
          return;
        case "ADMINISTRATOR":
          navigate(`/profileAdmin/${response.user.id}`);
          return;
      }
    }
    else{
      alert("Login failed");
    }
  };

  return (
    <div className="container d-flex flex-column min-vh-100">
      <div className="m-2">
        <h1>Iniciar sesión</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div
          className="btn-group btn-group-toggle"
          data-toggle="buttons"
          onChange={(e) => setUserType(e.target.value)}
        >
          <label className="btn btn-secondary ">
            <input type="radio" name="options" id="option1" value="NEIGHBOR" />
            {"Neighbor"}
          </label>
          <label className="btn btn-secondary">
            <input type="radio" name="options" id="option2" value="SELLER" />
            {"Seller"}
          </label>
          <label className="btn btn-secondary">
            <input
              type="radio"
              name="options"
              id="option3"
              value="ADMINISTRATOR"
            />
            {"Admin"}
          </label>
        </div>
        <div className="form-group justify-content-center align-items-start">
          <label htmlFor="LoginEmail">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            id="LoginEmail"
            value={email}
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <small id="emailHelp" className="form-text text-muted">
            Nunca compartiremos tu correo con nadie.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="LoginPassword">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="LoginPassword"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit my-2" className="btn btn-primary">
          Iniciar sesión
        </button>
      </form>
      <div>
        {" "}
        <Link to={"/register"}>No tienes una cuenta? Regístrate aquí!</Link>
      </div>
    </div>
  );
};

export default Login;
