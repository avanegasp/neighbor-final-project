import React from "react";
import { Link } from "react-router-dom";

const ProfileNeighbor = () => {
  return (
    <div className="container">
      <div className="text-center my-4 mt-5">
        <h1>Neighbors Personal Details</h1>
      </div>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="row w-100 border border-1 border-dark">
          <div className="col-md-4">
            <div className="card mt-5">
              <img
                src="https://picsum.photos/200"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body text-center">
                <h5 className="card-title mb-4">Libros Favoritos</h5>
                <ol className="list-unlysted">
                  <p className="card-text">
                    <li>Lord Rings</li>
                    <li>Harry Potter</li>
                  </p>
                </ol>
                <a href="#" className="btn btn-secondary mt-4">
                  Do a recommendation!
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-8 d-flex flex-column justify-content-center">
            <div className="">
              <p>
                {" "}
                <strong>Nombre</strong> :
              </p>
              <p>
                <strong>Apellido:</strong>
              </p>
              <p>
                <strong>Piso:</strong>
              </p>
              <p>
                <strong>Hobbies:</strong> Lorem ipsum dolor sit, amet
                consectetur adipisicing elit. Minus quibusdam omnis adipisci
                ipsa, nostrum possimus? Totam temporibus unde corporis error id
                fuga, fugit veniam accusamus eligendi vitae aspernatur quam
                quae.
              </p>
            </div>
          </div>
          <div className="mt-auto text-end mb-5">
            <Link to={"/"} className="btn btn-success me-5">
              Editar información
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileNeighbor;
