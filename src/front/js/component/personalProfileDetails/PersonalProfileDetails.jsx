import React from "react";
import { useParams } from "react-router-dom";

const PersonalProfileDetails = ({
  nameProfile,
  lastname,
  floor,
  shopName,
  buildingName,
  email,
  phone
}) => {

  // const isValidPhone = phone && /^\+[1-9]\d{1,14}$/.test(phone);
  const params = useParams();

  const whatsappLink = phone ? `https://wa.me/${phone}` : null;
  const shopLink = shopName ? `/seller/${params.id}/shop/${shopName}` : null

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
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              {phone}
            </a>
          </p>
        ) : null
      }
      {shopName ? (
        <p className="fs-4">
          <strong>Emprendimiento: </strong> 
          <a href = {shopLink} target>{shopName}
          </a>
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
