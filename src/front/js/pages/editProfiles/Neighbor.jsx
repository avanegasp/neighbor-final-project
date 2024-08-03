import React from "react";
import EditProfileDetails from "../../component/editProfileDetails/EditProfileDetails.jsx";

const ProfileEditNeighbor = () => {
  return (
    <div className="container d-flex flex-column min-vh-100">
      <div>
        <h1>Editar perfil Vecinos</h1>
      </div>
      <div>
        <EditProfileDetails />
      </div>
    </div>
  );
};

export default ProfileEditNeighbor;
