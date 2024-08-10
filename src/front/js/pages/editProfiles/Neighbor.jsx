import React, { useContext } from "react";
import { Context } from "../../store/appContext.js";
import EditProfileDetails from "../../component/editProfileDetails/EditProfileDetails.jsx";

const ProfileEditNeighbor = () => {
  const { store } = useContext(Context)
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-10 text-center">
        <EditProfileDetails
          name={store.neighbor.name}
          lastname={store.neighbor.lastname}
          floor={store.neighbor.floor}
          email={store.neighbor.email}
          id={store.neighbor.id}
          role="NEIGHBOR"
        />
      </div>
    </div>
  );
};

export default ProfileEditNeighbor;
