import React from "react";
import TagRol from "../tagRol/TagRol.jsx";
import PersonalProfileDetails from "../personalProfileDetails/PersonalProfileDetails.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const AllUsersInfo = ({
  role,
  nameProfile,
  lastname,
  shopName,
  buildingName,
  floor,
}) => {
  console.log("allusersINFO...", shopName)
  return (
    <div className="row w-100 border border-1 border-dark justify-content-center bg-white">
      <div className="col-md-4">
        <div className="card mt-5 mb-5 w-50">
          <img
            src="https://picsum.photos/200"
            className="card-img-top"
            alt="..."
          />
          <button className="btn btn-outline-warning position-relative bottom-0 end-0 mt-3">
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
      </div>
      <div className="col-md-7 mt-5 mb-5">
        <TagRol role={role} />
        <PersonalProfileDetails
          nameProfile={nameProfile}
          lastname={lastname}
          floor={floor}
          shopName={shopName}
          buildingName={buildingName}
        />
      </div>
    </div>
  );
};

export default AllUsersInfo;
