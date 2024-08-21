import React, { useContext, useEffect, useState } from "react";
import StarsRating from "../component/StarsRating.jsx";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Shop = ({}) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const getSingleBusiness = async () =>{
      const data = await actions.getSingleBusiness(params.seller_id, params.business_id);
      if (!data){
        navigate(`/profileSeller/${params.seller_id}`);
      }
    }
    getSingleBusiness();
  }, []);
  // console.log(store.shop);

  return (
    <>
      {store.shop && (
        <div className="App">
          <div className="container d-flex flex-column min-vh-100 mb-5">
            <h1>Emprendimiento</h1>
            <div
              className="d-flex justify-content-center align-items-start"
              style={{ minHeight: "80vh" }}
            >
              <div className="row w-100 border border-1 border-dark bg-white">
                <div className="col-md-4 ms-4">
                  <div className="card mt-5 w-50">
                    <img
                      src="https://picsum.photos/200"
                      className="card-img-top"
                      alt="..."
                    />
                  </div>
                </div>
                <div className="col-md-7 d-flex flex-column justify-content-center">
                  <p className="fs-4">
                    <strong>Nombre: </strong>{store.shop?.name}
                  </p>
                  <p className="fs-4">
                    <strong>Precio: </strong>{store.shop?.price}
                  </p>
                  <p className="fs-4">
                    <strong>Horario: </strong>{store.shop?.schedule}
                  </p>
                </div>
                {/* <div className="container-fluid text-center">
                  <StarsRating />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Shop;
