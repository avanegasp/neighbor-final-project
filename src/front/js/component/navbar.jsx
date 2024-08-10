import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";

export const Navbar = () => {
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
      {/* {isAuthenticated && ( */}
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
            {/* <div className="dropdown-item">
                <i className="text-success fs-5 mx-1 my-1 fa-solid fa-user"></i>
                <Link className="text-success fs-5 mx-1 my-1" to="/profileNeighbor:id">
                  Perfil Vecino(a)
                </Link>
              </div>
              <div className="dropdown-item">
                <i className="text-success fs-5 mx-1 my-1 fa-solid fa-user-tie"></i>
                <Link className="text-success fs-5 mx-1 my-1" to="/profileSeller">
                  Perfil Vendedora(a)
                </Link>
              </div>
              <div className="dropdown-item">
                <i className="text-success fs-5 mx-1 my-1 fa-solid fa-hammer"></i>
                <Link className="text-success fs-5 mx-1 my-1" to="/profileAdmin">
                  Perfil Admin
                </Link>
              </div> */}
            <div className="dropdown-item">
              <Link className="text-success fs-5 mx-1 my-1" to="/directory">
                <i className="text-success fs-5 mx-1 my-1 fa-solid fa-address-book"></i> Directorio
              </Link>
            </div>
            <div className="dropdown-item">
              <Link className="text-success fs-5 mx-1 my-1" to="/business">
                <i className="text-success fs-5 mx-1 my-1 fa-solid fa-store"></i> Tienda
              </Link>
            </div>
            <div className="dropdown-divider"></div>
            <div className="dropdown-item">
              <a
                className="text-success fs-5 mx-1 my-1"
              href="#"
              onClick={handleLogout}
              >
                <i className="text-success fs-5 mx-1 my-1 fa-solid fa-right-from-bracket"></i> Cerrar Sesión
              </a>
            </div>
          </li>
        </ul>
      </div>
      {/* // )} */}
    </nav>
  );
};

export default Navbar;


