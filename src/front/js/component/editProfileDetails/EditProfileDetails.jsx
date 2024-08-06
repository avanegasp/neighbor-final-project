import React from "react";

const EditProfileDetails = ({ name, lastName, floor, hobbies }) => {
  return (
    <form>
      <div className="mb-3">
        <label for="" className="form-label">
          nombre:{name}
        </label>
        <input type="text" className="form-control" />
      </div>
      <div className="mb-3">
        <label for="" className="form-label">
          Apellido:{lastName}
        </label>
        <input type="text" className="form-control" />
      </div>
      <div className="mb-3">
        <label for="" className="form-label">
          Piso:{floor}
        </label>
        <input type="text" className="form-control" />
      </div>
      <div className="mb-3">
        <label for="" className="form-label">
          Hobbies:{hobbies}
        </label>
        <input type="text" className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default EditProfileDetails;
