import React from "react";
import EditProfileDetails from "../component/editProfileDetails/EditProfileDetails.jsx";

const ProfileEditAdmin = () => {
  return (
    <div className="container d-flex flex-column min-vh-100">
      <div>
        <h1>Editar perfil Admin</h1>
      </div>
      <div>
        <EditProfileDetails />
      </div>
    </div>
  );
};

export default ProfileEditAdmin;
