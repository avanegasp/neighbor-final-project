import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";


const PersonalProfileDetails = ({
  nameProfile,
  lastname,
  floor,
  shopName,
  buildingName,
  email,
  phone,
  description,
  id
}) => {

  // const isValidPhone = phone && /^\+[1-9]\d{1,14}$/.test(phone);
  const params = useParams();
  const whatsappLink = phone ? `https://wa.me/${phone}` : null;
  const shopLink = shopName && params.id ? `/seller/${params.id}/shop/${shopName}` : `/seller/${id}/shop/${shopName}` 

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
            <Link to={whatsappLink} className="fs-4" target="_blank" rel="noopener noreferrer">
              {phone}
            </Link>
          </p>
        ) : null
      }
      {shopName ? (
        <p className="fs-4">
          <strong>Emprendimiento: </strong> 
          <Link to ={shopLink} className="fs-4" target>{shopName}
          </Link>
        </p>
      ) : null}
      {buildingName ? (
        <p className="fs-4">
          <strong>Edificio:</strong> {buildingName}
        </p>
      ) : null}
      {description ? (
        <p className="fs-4">
          <strong>Acerca de: </strong> 
          <Link to={shopLink} className="fs-4" target>{description}
          </Link>
        </p>
      ) : null}
      
    </div>
  );
};

export default PersonalProfileDetails;
