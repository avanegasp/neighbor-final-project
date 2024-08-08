import React from "react";

const PersonalProfileDetails = ({
  nameProfile,
  lastname,
  floor,
  shopName,
  buldingName,
}) => {
  return (
    <div className="mt-5">
      <p>
        {" "}
        <strong>Nombre</strong> : {nameProfile}
      </p>
      <p>
        <strong>Apellido:</strong> {lastname}
      </p>
      <p>
        <strong>Piso:</strong> {floor}
      </p>
      {shopName ? (
        <p>
          <strong>Shopname:</strong> {shopName}
        </p>
      ) : null}
      {buldingName ? (
        <p>
          <strong>buldingName:</strong> {buldingName}
        </p>
      ) : null}
    </div>
  );
};

export default PersonalProfileDetails;
