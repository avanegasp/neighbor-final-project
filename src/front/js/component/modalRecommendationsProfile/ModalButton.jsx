import React from "react";

const ModalButtonRecommendation = ({ recommendation, role }) => {
    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#modal-${role}`}>
                # Recomendaciones: {recommendation ? recommendation.length : 0}
            </button>
        </>
    )
}

export default ModalButtonRecommendation;