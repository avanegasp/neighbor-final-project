import React from "react";

const TagRol = ({ role }) => {
  return (
    <>
      <button
        type="button"
        className="btn btn-outline-info position-absolute top-0 end-0 mt-5 me-5"
      >
        {role}
      </button>
    </>
  );
};

export default TagRol;
