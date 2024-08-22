import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";
import "../../styles/index.css";
import Favorite from "./favorite/Favorite.jsx";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const name = localStorage.getItem("name");
  function roleLink() {
    const role = localStorage.getItem("role");
    const id = localStorage.getItem("id");

    if (role && id) {
      switch (role) {
        case "NEIGHBOR":
          return `/profileNeighbor/${id}`;
        case "SELLER":
          return `/profileSeller/${id}`;
        case "ADMINISTRATOR":
          return `/profileAdmin/${id}`;
        default:
          return "/";
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    actions.clearFavorites()
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/">
        <span className="icon-n">N</span>
      </Link>

      <div className="d-flex justify-content-end align-items-center flex-grow-1">
        {location.pathname === "/login" ||
        location.pathname === "/register" ||
        location.pathname === "/" ? null : (
          <>
            <div className="d-flex justify-content-center flex-grow-1">
              <span>
                <strong className="fs-2 text">Sesión de :</strong>
              </span>
              <span className="ms-3">
                <Link className="fs-2 text" to={roleLink()}>
                  {name}
                </Link>
              </span>
            </div>
            <div className="btn-group me-5">
              <button
                className="btn text-white fs-1"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa-regular fa-thumbs-up"></i>{" "}
                <span className="favNumNavbar">{store.favorites.length}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <div className="bg-white">
                    <Favorite
                      favorites={store.favorites}
                      removeToFavorite={actions.removeToFavorite}
                    />
                  </div>
                </li>
              </ul>
            </div>

            <div className="dropdown-item">
              <Link
                className="text-success fs-5 mx-1 my-1"
                to="/adminDeleteUser"
              >
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
              >Cerrar Sesión</a>
            </div>

            <div className="dropdown">
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
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <Link className="dropdown-item text-success fs-5 mx-1 my-1" to="/directory">
                    <i className="text-success fs-5 mx-1 my-1 fa-solid fa-address-book"></i>{" "}
                    Directorio
                  </Link>
                  <Link className="dropdown-item text-success fs-5 mx-1 my-1" to="/business">
                    <i className="text-success fs-5 mx-1 my-1 fa-solid fa-store"></i>{" "}
                    Tienda
                  </Link>
                  <Link className="dropdown-item text-success fs-5 mx-1 my-1" to="/recommendations">
                    <i className="text-success fs-5 mx-1 my-1 fa-solid fa-comments"></i>{" "}
                    Recomendaciones
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item text-success fs-5 mx-1 my-1" onClick={handleLogout}>
                    <i className="text-success fs-5 mx-1 my-1 fa-solid fa-right-from-bracket"></i>{" "}
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
