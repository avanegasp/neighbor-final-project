import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext.js";
import { useNavigate } from "react-router-dom";
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

  console.log('HEREEE', id)

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

  console.log("ROLEEEEE", role)

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-3">
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
        <label htmlFor="lastname" className="form-label fs-3">
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
        <label htmlFor="floor" className="form-label fs-3">
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
        <label htmlFor="floor" className="form-label fs-3">
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
          <label htmlFor="shopName" className="form-label fs-3">
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
            <label htmlFor="phone" className="form-label fs-3">
              Whatsapp (+)
            </label>
            <input
              name="phone"
              onChange={handleChange}
              type="text"
              className="form-control"
              placeholder="phone"
              value={profile.phone} />
          </div>
        ) : null
      }

      {buildingName ? (
        <div className="mb-3">
          <label htmlFor="buildingName" className="form-label fs-3">
            buildingName
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
        Submit
      </button>
    </form>
  );
};

export default EditProfileDetails;

