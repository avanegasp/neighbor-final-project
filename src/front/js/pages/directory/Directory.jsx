import React from "react";
import PersonalProfileDetails from "../../component/personalProfileDetails/PersonalProfileDetails.jsx";
import TagRol from "../../component/tagRol/TagRol.jsx";

const Directory = () => {
  return (
    <div className="container d-flex flex-column min-vh-100">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "20vh" }}
      >
        <h1>Directorio</h1>
      </div>
      <div className="row w-100 border border-1 border-dark">
        <div className="col-md-4 ms-4">
          <div className="card mt-5 mb-5">
            <img
              src="https://picsum.photos/200"
              className="card-img-top"
              alt="..."
            />
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
