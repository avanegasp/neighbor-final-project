import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import "../../styles/index.css";
import Favorite from "./favorite/Favorite.jsx";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  const handleLogout = (event) => {
    event.preventDefault();
    setIsAuthenticated(false);
  };

  return (
    <nav className="navbar">

      <Link className="navbar-brand" to="/">
        <span className="icon-n">N</span>
      </Link>


      <div className="d-flex justify-content-center flex-grow-1">
        <div className="btn-group dropstart">
          <button
            className="favNavbar btn btn-light"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Favs{" "}
            <span className="favNumNavbar">{store.favorites.length}</span>
          </button>
          <ul className="dropdown-menu">
            <li>
              <div className="bg-white">
                <Favorite favorites={store.favorites}
                  removeToFavorite={actions.removeToFavorite} />
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="dropdown dropstart">
        <button
          className="btn text-white fs-1"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <ul
          className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start"
          aria-labelledby="dropdownMenuButton"
        >
          <li>
            <div className="dropdown-item">
              <Link className="text-success fs-5 mx-1 my-1" to="/directory">
                <i className="text-success fs-5 mx-1 my-1 fa-solid fa-address-book"></i>{" "}
                Directorio
              </Link>
            </div>
            <div className="dropdown-item">
              <Link className="text-success fs-5 mx-1 my-1" to="/business">
                <i className="text-success fs-5 mx-1 my-1 fa-solid fa-store"></i>{" "}
                Tienda
              </Link>
            </div>
            <div className="dropdown-item">
              <Link className="text-success fs-5 mx-1 my-1" to="/adminDeleteUser">
                <i className="text-success fs-5 mx-1 my-1 fa-solid fa-trash"></i>{" "}
                Administración de usuarios
              </Link>
            </div>
            <div className="dropdown-divider"></div>
            <div className="dropdown-item">
              <a
                className="text-success fs-5 mx-1 my-1"
                href="#"
                onClick={handleLogout}
              >
                <i className="text-success fs-5 mx-1 my-1 fa-solid fa-right-from-bracket"></i>{" "}
                Cerrar Sesión
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;



