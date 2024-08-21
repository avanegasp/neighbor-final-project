import React from "react";

const TitleProfiles = ({ title }) => {
  return (
    <div className="container-title d-flex justify-content-center align-items-center flex-grow-1">
      <h1>Información personal {title?.toLowerCase()}</h1>
    </div>
  );
};

export default TitleProfiles;
