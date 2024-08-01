import React from "react";
import { Link } from "react-router-dom";
import TitleProfiles from "../../component/titleProfiles/TitleProfiles.jsx";
import PersonalProfileDetails from "../../component/personalProfileDetails/PersonalProfileDetails.jsx";

const ProfileAdmin = () => {
  return (
    <div className="container d-flex flex-column min-vh-100">
      <TitleProfiles title={"Admin"} />
      <div
        className="d-flex justify-content-center align-items-start"
        style={{ minHeight: "80vh" }}
      >
        <div className="row w-100 border border-1 border-dark">
          <div className="col-md-4 ms-4">
            <div className="card mt-5 mb-5">
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
          <div className="col-md-7 d-flex flex-column justify-content-center">
            <PersonalProfileDetails
              nameProfile={"Carolina"}
              lastName={"Pastrana"}
              floor={520}
              hobbies={
                "Apasionada de los números, calculadora y sacar gente del edificio"
              }
            />
          </div>
          <div className="mt-auto text-end mb-5">
            <Link to={"/profileEditAdminr"} className="btn btn-success me-5">
              Editar información
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAdmin;
