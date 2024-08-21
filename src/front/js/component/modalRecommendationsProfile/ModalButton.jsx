import React from "react";

const ModalButtonRecommendation = ({ recommendation, role, id }) => {
    const recommendationNumber = recommendation ? recommendation.length : 0
    // console.log("IDDDD", id)
    return (
        <>
            <button disabled={recommendationNumber === 0} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#modal-${role}-${id}`}>
                # Recomendaciones: {recommendationNumber}
            </button>
        </>
    )
}

export default ModalButtonRecommendation;