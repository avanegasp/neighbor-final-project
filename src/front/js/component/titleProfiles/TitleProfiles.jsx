import React from "react";

const TitleProfiles = ({ title }) => {
  return (
    <div className="text-title fw-bold font-monospace text-white business">
      <h1>Información personal {title?.toLowerCase()}</h1>
    </div>
  );
};

export default TitleProfiles;
