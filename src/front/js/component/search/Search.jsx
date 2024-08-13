import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const { store } = useContext(Context);
  const users = [...store.users.administrator, ...store.users.seller, ...store.users.neighbor];

  const handleChange = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);


    if (searchValue) {
      const filteredResults = users.filter((user) =>
        user.name.toLowerCase().startsWith(searchValue.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const foundElement = users.find(
      (user) => user.name.toLowerCase() === search.toLowerCase()
    );

    if (foundElement) {
      let path = "/";
      const id = foundElement.id;

      if (foundElement.role === "NEIGHBOR") {
        path = `/profileNeighbor/${id}`;
      } else if (foundElement.role === "SELLER") {
        path = `/profileSeller/${id}`;
      } else if (foundElement.role === "ADMINISTRATOR") {
        path = `/profileAdmin/${id}`;
      }

      navigate(path);
    } else {
      console.log("No se encontró ningún elemento con ese nombre.");
    }
  };

  const handleResultClick = (user) => {
    let path = "/";
    const id = user.id;

    if (user.role === "NEIGHBOR") {
      path = `/profileNeighbor/${id}`;
    } else if (user.role === "SELLER") {
      path = `/profileSeller/${id}`;
    } else if (user.role === "ADMINISTRATOR") {
      path = `/profileAdmin/${id}`;
    }

    navigate(path);
  };

  return (
    <>
      <span className="input-group-text">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </span>
      <input
        type="text"
        onChange={handleChange}
        className="form-control"
        placeholder="Search"
        aria-label="search"
        aria-describedby="basic-addon1"
      />
      <button className="ms-1 btn btn-light buttonSearch" onClick={handleSearch}>
        Buscar
      </button>
      <div>
        {results.length > 0 && (
          <ul className="list-group">
            {results.map((user, index) => (
              <li
                key={index.id}
                className="list-group-item"
                onClick={() => handleResultClick(user)}
              >
                {user.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Search;
