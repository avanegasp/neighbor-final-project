import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext.js";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
// import "../../styles/inputPhone.css";
import TitleProfiles from "../../component/titleProfiles/TitleProfiles.jsx";
import PersonalProfileDetails from "../../component/personalProfileDetails/PersonalProfileDetails.jsx";


const ProfileAdmin = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);


  const [recommendation, setRecommendation] = useState({
    name: "",
    lastname: "",
    shopName: "",
    phone: ""
  })

  function handleChange(e) {
    setRecommendation({ ...recommendation, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (id) {
      await actions.createAdminRecommendation(id, recommendation)
      navigate("/recommendations")
    }
  }

  useEffect(() => {
    actions.getProfileAdmin(id)
      .then((data) => {
        if (data?.error) {
          setError(data.error || "Error fetching profile");
          if (data.error === "Unknown error") {
            navigate("/register");
          }
        }
      });
  }, []);



  if (!store.admin) return <div>Loading...</div>;

  return (
    <div className="container d-flex flex-column min-vh-100">
      <TitleProfiles title={store.admin.role} />
      <div
        className="d-flex justify-content-center align-items-start"
        style={{ minHeight: "80vh" }}
      >
        <div className="row w-100 border border-1 border-dark bg-white">
          <div className="col-md-4 ms-4">
            <div className="card mt-5 mb-5 w-50">
              <img
                src="https://picsum.photos/200"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body text-center">
                <h5 className="card-title mb-4">Libros Favoritos</h5>
                <ol className="list-unlysted">
                  <li>Lord Rings</li>
                  <li>Harry Potter</li>
                </ol>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Haz una recomendación
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Quiero recomendar a:</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                          <div className="mb-3">
                            <label htmlFor="exampleInputName" className="form-label">Nombre:</label>
                            <input
                              name="name"
                              onChange={(e) => handleChange(e)}
                              type="text"
                              className="form-control"
                              value={recommendation.name}
                              id="exampleInputName" />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="exampleInputLastname" className="form-label">Apellido:</label>
                            <input
                              name="lastname"
                              onChange={(e) => handleChange(e)}
                              type="text"
                              className="form-control"
                              value={recommendation.lastname}
                              id="exampleInputLastName" />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="exampleInputPhone" className="form-label">Whatsapp:</label>
                            <PhoneInput
                              country={'us'}
                              onChange={(phone) => setRecommendation({ ...recommendation, phone })}
                              value={recommendation.phone}
                              inputProps={{
                                name: 'phone',
                                id: 'exampleInputPhone',
                                className: 'form-control w-100',
                              }}
                              containerStyle={{ width: '100%' }}
                              inputStyle={{ width: '100%' }}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="exampleInputShopName" className="form-label">Nombre del comercio:</label>
                            <input
                              name="shopName"
                              onChange={(e) => handleChange(e)}
                              type="text"
                              className="form-control"
                              id="exampleInputShopName"
                              placeholder="Ferretería Mis llaves" />
                            <div id="exampleInputShopName" className="form-text">Colocar primero el TIPO de comercio</div>
                          </div>
                          <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" >Submit</button>
                        </form>

                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7 d-flex flex-column justify-content-center">
            <PersonalProfileDetails
              nameProfile={store.admin.name}
              lastname={store.admin.lastname}
              floor={store.admin.floor}
              buildingName={store.admin.buildingName}
              email={store.admin.email}
            />
          </div>
          <div className="mt-auto text-end mb-5">
            <Link to={"/profileEditAdmin"} className="btn btn-success me-5">
              Editar información
            </Link>
          </div>
        </div>
      </div>
    </div >
  );
};

export default ProfileAdmin;
