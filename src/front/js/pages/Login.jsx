import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/index.css"; // Asegúrate de crear un archivo CSS personalizado

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
    console.log("respuesta", response);
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
          return
      }
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar sesión</h1>

      <form onSubmit={handleSubmit}>
        <div className="user-type-group" onChange={(e) => setUserType(e.target.value)}>
          <label className="user-type-option">
            <input type="radio" name="options" value="NEIGHBOR" />
            Neighbor
          </label>
          <label className="user-type-option">
            <input type="radio" name="options" value="SELLER" />
            Seller
          </label>
          <label className="user-type-option">
            <input type="radio" name="options" value="ADMINISTRATOR" />
            Admin
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="LoginEmail">Correo electrónico</label>
          <input
            type="email"
            id="LoginEmail"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <small id="emailHelp">Nunca compartiremos tu correo con nadie.</small>
        </div>

        <div className="form-group">
          <label htmlFor="LoginPassword">Contraseña</label>
          <input
            type="password"
            id="LoginPassword"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="login-button">
          Iniciar sesión
        </button>
      </form>

      <div>
        <Link to={"/register"}>¿No tienes una cuenta? Regístrate aquí!</Link>
      </div>
    </div>
  );
};

export default Login;