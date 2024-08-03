import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  return (
    <>
      <span className="input-group-text">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </span>
      <input
        type="text"
        className="form-control"
        placeholder="Search"
        aria-label="search"
        aria-describedby="basic-addon1"
      />
      <button className="ms-1 btn btn-light buttonSearch">Search</button>
    </>
  );
};

export default Search;
