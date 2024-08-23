import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import RecommendationsExtern from "../../component/recommnedationsExtern/RecommnedationsExtern.jsx";


const Recommendations = () => {
    const { store, actions } = useContext(Context)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    // console.log("recommendations", store.recommendations)

    useEffect(() => {
        actions.getAllRecommendations()
            .then((data) => {
                // console.log('hereee', data)
                setError(data?.error || "Error fetching profile")
                if (data?.error && data.error === 'No token found') {
                    navigate("/register")
                }
            })
    }, [])

    if (!store.recommendations) return <div>Loading...</div>

    return (
        <div className="container justify-content-center align-content-start flex-column min-vh-100">
            <div className="container d-flex flex-column flex-grow-1">
                <div
                    className="d-flex justify-content-between align-items-center mb-3"
                    style={{ minHeight: "20vh" }}
                >
                    <h1 className="d-flex justify-context-center">Recomendaciones de mis vecinos</h1>
                </div>
                <div
                    className="flex-grow-1 overflow-auto border border-white p-3"
                    style={{ maxHeight: 'calc(80vh - 100px)' }}
                >
                    {store.recommendations.map((recommendation, index) => {

                        return (

                            <div className="accordion" key={index} id={`accordionPanelsStayOpenExample${index}`}>

                                <RecommendationsExtern name={recommendation.name}
                                    lastname={recommendation.lastname}
                                    shopName={recommendation.shopName}
                                    phone={recommendation.phone}
                                    numIndex={index} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div >
    )
}

export default Recommendations;