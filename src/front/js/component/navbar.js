import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Neighbors</span>
        </Link>
        <div className="ml-auto">
          <Link to="/">
            <button className="btn btn-primary">Logout</button>
          </Link>
        </div>
        <div>
          <Link to="/directory">
            <button className="btn btn-primary">Directorio</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
