import React from "react";

const PersonalProfileDetails = ({
  nameProfile,
  lastname,
  floor,
  shopName,
  buildingName,
  email,
  phone
}) => {

  const isValidPhone = phone && /^\+[1-9]\d{1,14}$/.test(phone);
  const whatsappLink = phone ? `https://wa.me/${phone}` : null;

  return (
    <div className="mt-5">
      <p className="fs-4">
        {" "}
        <strong>Nombre</strong> : {nameProfile}
      </p>
      <p className="fs-4">
        <strong>Apellido:</strong> {lastname}
      </p>
      <p className="fs-4">
        <strong>Piso:</strong> {floor}
      </p>
      <p className="fs-4">
        <strong>Correo:</strong> {email}
      </p>
      {
        phone ? (
          <p className="fs-4">
            <strong>Whatsapp:</strong> {" "}
            {isValidPhone ? (
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                {phone}
              </a>

            ) : (
              <span>{phone} (Revisa el # )</span>
            )
            }
          </p>
        ) : null
      }
      {shopName ? (
        <p className="fs-4">
          <strong>Emprendimiento:</strong> {shopName}
        </p>
      ) : null}
      {buildingName ? (
        <p className="fs-4">
          <strong>Edificio:</strong> {buildingName}
        </p>
      ) : null}
    </div>
  );
};

export default PersonalProfileDetails;
