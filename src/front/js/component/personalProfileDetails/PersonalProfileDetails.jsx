import React from "react";

const PersonalProfileDetails = ({
  nameProfile,
  lastName,
  floor,
  hobbies,
  shopname,
  bouldingname,
}) => {
  return (
    <div className="">
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
      <p>
        <strong>Hobbies:</strong> {hobbies}
      </p>
    </div>
  );
};

export default PersonalProfileDetails;
