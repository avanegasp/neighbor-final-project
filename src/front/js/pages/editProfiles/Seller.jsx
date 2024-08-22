import React, { useContext } from "react";
import { Context } from "../../store/appContext.js";
import EditProfileDetails from "../../component/editProfileDetails/EditProfileDetails.jsx";


const ProfileEditSeller = () => {
  const { store } = useContext(Context)
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-12 text-center">
        <EditProfileDetails
          name={store.seller.name}
          lastname={store.seller.lastname}
          floor={store.seller.floor}
          email={store.seller.email}
          id={store.seller.id}
          phone={store.seller.phone}
          shopName={store.seller.shopName}
          role="SELLER"
        />
      </div>
    </div>
  );
};


export default ProfileEditSeller;
