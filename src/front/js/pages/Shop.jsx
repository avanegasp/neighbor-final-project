import React, { useContext, useEffect, useState } from "react";
import StarsRating from "../component/StarsRating.jsx";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dysmvst60"
  }
});

const imgCloudinary = [
  'samples/people/kitchen-bar',
  'samples/breakfast',
  'samples/food/fish-vegetables',
  'samples/dessert-on-a-plate',
  'samples/food/spices',
  'samples/coffee',
  'samples/food/pot-mussels',
  'samples/food/dessert',
  'samples/balloons'
];

const Shop = ({ }) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("id");


  useEffect(() => {
    const getSingleBusiness = async () => {
      const data = await actions.getSingleBusiness(params.seller_id, params.business_id);
      if (!data) {
        navigate(`/directory`);
      }
    }
    getSingleBusiness();
  }, []);
  console.log(id)

  const imageIndex = parseInt(id, 10) % imgCloudinary.length;
  const selectedImageId = imgCloudinary[imageIndex];
  const cldImg = cld.image(selectedImageId);

  return (
    <>
      {store.shop && (
        <div className="App">
          <div className="container">
            <h1 className="text-title fw-bold font-monospace text-white business">Emprendimiento</h1>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "40vh" }}
            >
              <div className="row w-100 rounded-1 border-dark bg-dark">
                <div className="col-md-4 ms-4">
                  <div className="card mt-5 mb-5 w-100">
                    <AdvancedImage
                      cldImg={cldImg}
                      className="card-img-top"
                      alt="..."
                    />
                  </div>
                </div>
                <div className="col-md-7 mt-3 d-flex flex-column justify-content-center">
                  <p className="fs-4 text-white">
                    <strong>Nombre: </strong>{store.shop?.name}
                  </p>
                  <p className="fs-4 text-white">
                    <strong>Precio: </strong>{store.shop?.price}
                  </p>
                  <p className="fs-4 text-white">
                    <strong>Horario: </strong>{store.shop?.schedule}
                  </p>
                  <p className="fs-4 text-white">
                    <strong>Descripción: </strong>{store.shop?.description}
                  </p>
                </div>
                {/* <div className="container-fluid text-center">
                  {role == 'NEIGHBOR' ? <StarsRating/> : null }
                </div>  */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Shop;
