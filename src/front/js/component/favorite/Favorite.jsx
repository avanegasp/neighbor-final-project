import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Favorite = ({ favorites, removeToFavorite }) => {
    return (
        <>
            {favorites.length > 0 ? (favorites.map((favorite, index) => {
                let path = "/";
                if (favorite.role === "NEIGHBOR") {
                    path = "/profileNeighbor";
                } else if (favorite.role === "SELLER") {
                    path = "/profileSeller";
                } else {
                    path = "/profileAdmin";
                }
                return (
                    <div className="d-flex" key={index}>
                        <Link to={`${path}/${favorite.id}`} className="dropdown-item text-black">
                            {favorite.name}
                        </Link>
                        <span
                            className="me-3 mb-3 fs-3"
                            onClick={() => removeToFavorite(favorite.name)}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                    </div>
                );
            })) : (
                <p className="d-flex justify-content-center ">No tienes fav</p>
            )}
        </>
    );
};

export default Favorite;
