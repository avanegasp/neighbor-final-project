import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../store/appContext";


const PersonalProfileDetails = ({
  nameProfile,
  lastname,
  floor,
  shopName,
  buildingName,
  email,
  phone,
  description
}) => {

  // const isValidPhone = phone && /^\+[1-9]\d{1,14}$/.test(phone);
  const params = useParams();
  const {store, actions} = useContext(Context);
  const whatsappLink = phone ? `https://wa.me/${phone}` : null;
  const shopLink = shopName && params.id ? `/seller/${params.id}/shop/${shopName}` : null

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
            <a className="fs-4 text" href={whatsappLink} target="_blank" rel="noopener noreferrer">
              {phone}
            </a>
          </p>
        ) : null
      }
      {shopName ? (
        <p className="fs-4">
          <strong>Emprendimiento: </strong> 
          <a className="fs-4" href = {shopLink} target>{shopName}
          </a>
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
          <a className="fs-4" href = {shopLink} target>{description}
          </a>
        </p>
      ) : null}
      
    </div>
  );
};

export default PersonalProfileDetails;
