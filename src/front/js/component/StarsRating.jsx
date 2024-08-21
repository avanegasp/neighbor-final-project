import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Context } from "../store/appContext";

const StarsRating = () => {
  const { store, actions } = useContext(Context);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const { neighbor_id, business_id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await actions.createReview(neighbor_id, business_id)
    // console.log(neighbor_id, business_id);
    // console.log(response);
    if (response) {
      alert("Reseña creada");
    }
  }
  return (
    <div className="d-flex m-5">
    <form onSubmit={handleSubmit}>
      <div className="d-flex m-5">
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;
          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
                style={{ display: "none" }}
              />
              <FaStar
                className="star"
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                size={50}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
      <div className="form-group fs-2">
        <label htmlFor="reviewText">Añade un comentario</label>
        <textarea
          className="form-control"
          id="reviewText"
          rows="3"
          value={comment}
          placeholder="Añade un comentario"
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <button type="submit my-2" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default StarsRating;
