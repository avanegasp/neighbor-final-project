import React from "react";

const PersonalProfileDetails = ({
  nameProfile,
  lastName,
  floor,
  shopname,
  bouldingname,
}) => {
  return (
    <div className="mt-5">
      <p>
        {" "}
        <strong>Nombre</strong> : {nameProfile}
      </p>
      <p>
        <strong>Apellido:</strong> {lastName}
      </p>
      <p>
        <strong>Piso:</strong> {floor}
      </p>
      {shopname ? (
        <p>
          <strong>Shopname:</strong> {shopname}
        </p>
      ) : null}
      {bouldingname ? (
        <p>
          <strong>bouldingname:</strong> {bouldingname}
        </p>
      ) : null}
    </div>
  );
};

export default PersonalProfileDetails;
