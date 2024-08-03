import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import PersonalProfileDetails from "../../component/personalProfileDetails/PersonalProfileDetails.jsx";
import TagRol from "../../component/tagRol/TagRol.jsx";
import Search from "../../component/search/Search.jsx";

const Directory = () => {
  return (
    <div className="container d-flex flex-column min-vh-100">
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ minHeight: "20vh" }}
      >
        <h1>Directorio</h1>
        <div className="input-group mb-3 inputSearch w-25">
          <Search />
        </div>
      </div>

      <div className="row w-100 border border-1 border-dark">
        <div className="col-md-4 ms-4">
          <div className="card mt-5 mb-5">
            <img
              src="https://picsum.photos/200"
              className="card-img-top"
              alt="..."
            />
            <button className="btn btn-outline-warning position-relative bottom-0 end-0">
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </div>
        </div>
        <div className="col-md-7 d-flex flex-column justify-content-center position-relative mt-5">
          <TagRol rol={"Seller"} />
          <PersonalProfileDetails
            nameProfile={"Carolina"}
            lastName={"Pastrana"}
            floor={520}
            hobbies={
              "Apasionada de los números, calculadora y sacar gente del edificio"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Directory;