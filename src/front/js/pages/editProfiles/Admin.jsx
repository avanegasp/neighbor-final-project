import React, { useContext } from "react";
import { Context } from "../../store/appContext.js";
import EditProfileDetails from "../../component/editProfileDetails/EditProfileDetails.jsx";

const ProfileEditAdmin = () => {
  const { store } = useContext(Context)
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-10 text-center">
        <EditProfileDetails
          name={store.admin.name}
          lastname={store.admin.lastname}
          floor={store.admin.floor}
          email={store.admin.email}
          id={store.admin.id}
          buildingName={store.admin.buildingName}
          role="ADMINISTRATOR" />
      </div>
    </div>
  );
};


export default ProfileEditAdmin;
