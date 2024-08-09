import React from "react";

const EditProfileDetails = ({ name, lastname, floor, buildingName, shopName }) => {
  return (
    <form>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-3">
          Nombre: {name}
        </label>
        <input type="text" className="form-control" id="name" />
      </div>
      <div className="mb-3">
        <label htmlFor="lastname" className="form-label fs-3">
          Apellido: {lastname}
        </label>
        <input type="text" className="form-control" id="lastname" />
      </div>
      <div className="mb-3">
        <label htmlFor="floor" className="form-label fs-3">
          Piso: {floor}
        </label>
        <input type="text" className="form-control" id="floor" />
      </div>
      {shopName ? (
        <div className="mb-3">
          <label htmlFor="shopName" className="form-label fs-3">
            shopName: {shopName}
          </label>
          <input type="text" className="form-control" id="shopName" />
        </div>
      ) : null}
      {buildingName ? (
        <div className="mb-3">
          <label htmlFor="buildingName" className="form-label fs-3">
            buildingName: {buildingName}
          </label>
          <input type="text" className="form-control" id="buildingName" />
        </div>
      ) : null}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default EditProfileDetails;

