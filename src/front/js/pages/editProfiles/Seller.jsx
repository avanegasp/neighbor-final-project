import React from "react";
import EditProfileDetails from "../../component/editProfileDetails/EditProfileDetails.jsx";

const ProfileEditSeller = () => {
  return (
    <div className="container d-flex flex-column min-vh-100">
      <div>
        <h1>Editar perfil Vendedor(a)</h1>
      </div>
      <div>
        <EditProfileDetails />
      </div>
    </div>
  );
};

export default ProfileEditSeller;
