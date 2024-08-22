import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext.js";
import { useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-input-2';
import "../../../styles/inputPhone.css";
const EditProfileDetails = ({ name = "", lastname = "", floor = "", buildingName = "", shopName = "", email = "", id, role = "", phone = "" }) => {

  const { actions } = useContext(Context)

  const [profile, setProfile] = useState({
    name,
    lastname,
    floor,
    email,
    buildingName,
    shopName,
    phone
  })

  const navigate = useNavigate()

  // console.log('HEREEE', id)

  function handleChange(e) {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (role === "NEIGHBOR") {
      await actions.editNeighbor(id, profile)
      navigate(`/profileNeighbor/${id}`)

    } else if (role === "SELLER") {
      await actions.editSeller(id, profile)
      navigate(`/profileSeller/${id}`)

    } else {
      await actions.editAdmin(id, profile)
      navigate(`/profileAdmin/${id}`)
    }
  }

  // console.log("ROLEEEEE", role)

  return (
    <div className="d-flex justify-content-center align-items-center flex-column min-vh-100"
      style={{ minHeight: "100vh" }}>
      <form
        className="container card"
        style={{ width: "100%", maxWidth: "500px" }}
        onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label fs-5 text-light text-start d-block">
            Nombre
          </label>
          <input
            name="name"
            onChange={(e) => handleChange(e)}
            type="text"
            className="form-control"
            placeholder="Nombre"
            value={profile.name} />
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label fs-5 text-light text-start d-block">
            Apellido
          </label>
          <input name="lastname"
            onChange={handleChange}
            type="text"
            className="form-control"
            placeholder="Apellido"
            value={profile.lastname} />
        </div>
        <div className="mb-3">
          <label htmlFor="floor" className="form-label fs-5 text-light text-start d-block">
            Piso
          </label>
          <input
            name="floor"
            onChange={handleChange}
            type="text"
            className="form-control"
            placeholder="Piso"
            value={profile.floor} />
        </div>
        <div className="mb-3">
          <label htmlFor="floor" className="form-label fs-5 text-light text-start d-block">
            Correo
          </label>
          <input
            name="email"
            onChange={handleChange}
            type="text"
            className="form-control"
            placeholder="floor"
            value={profile.email} />
        </div>
        {shopName ? (
          <div className="mb-3">
            <label htmlFor="shopName" className="form-label fs-5 text-light text-start d-block">
              shopName
            </label>
            <input
              name="shopName"
              onChange={handleChange}
              type="text"
              className="form-control"
              placeholder="shopName"
              value={profile.shopName} />
          </div>
        ) : null}
        {
          phone ? (
            <div className="mb-3">
              <label htmlFor="phone" className="form-label fs-5 text-light text-start d-block">
                Whatsapp
              </label>
              <PhoneInput
                country={'us'}
                value={profile.phone}
                onChange={(phone) => {
                  setProfile((prevProfile) => ({
                    ...prevProfile,
                    phone: phone
                  }));
                }}
                inputProps={{
                  name: 'phone',
                  required: true,
                  autoFocus: true
                }}
                containerClass="form-control p-0 phone-input"
                inputClass="form-control w-100"
              />
            </div>
          ) : null
        }



        {buildingName ? (
          <div className="mb-3">
            <label htmlFor="buildingName" className="form-label fs-5 text-light text-start d-block">
              Edificio
            </label>
            <input
              name="buildingName"
              onChange={handleChange}
              type="text"
              className="form-control"
              placeholder="buildingName"
              value={profile.buildingName} />
          </div>
        ) : null}
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default EditProfileDetails;

