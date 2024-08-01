import React from "react";

const Search = () => {
  return (
    <>
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
