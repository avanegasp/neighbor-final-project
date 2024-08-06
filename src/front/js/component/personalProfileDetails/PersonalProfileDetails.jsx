import React from "react";

const PersonalProfileDetails = ({ nameProfile, lastName, floor, hobbies }) => {
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
      <p>
        <strong>Hobbies:</strong> {hobbies}
      </p>
    </div>
  );
};

export default PersonalProfileDetails;
