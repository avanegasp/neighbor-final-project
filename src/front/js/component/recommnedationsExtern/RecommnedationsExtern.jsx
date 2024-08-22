import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faPerson, faMobileRetro } from "@fortawesome/free-solid-svg-icons";

const RecommendationsExtern = ({ shopName, phone, name, lastname, numIndex }) => {
    const whatsappLink = `https://wa.me/${phone}`;
    return (
        <>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button
                        className="accordion-button collapsed bg-black p-2 text-white bg-opacity-75 fs-3"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#panelsStayOpen-collapseOne-${numIndex}`}
                        aria-expanded="false"
                        aria-controls={`panelsStayOpen-collapseOne-${numIndex}`}>
                        <FontAwesomeIcon icon={faBriefcase} className="me-2" />
                        {shopName}
                    </button>
                </h2>
                <div
                    id={`panelsStayOpen-collapseOne-${numIndex}`}
                    className="accordion-collapse collapse"
                    data-bs-parent={`#accordionPanelsStayOpenExample${numIndex}`}>
                    <div className="accordion-body bg-secondary-subtle">
                        <ul>

                            <li>
                                <FontAwesomeIcon icon={faPerson} className="me-2 fs-4" />
                                {name} <span> {lastname}</span></li>
                            <li>
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FontAwesomeIcon icon={faMobileRetro} className="me-2 fs-4" />
                                    <span>
                                        {phone}
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </>
    )
}

export default RecommendationsExtern;