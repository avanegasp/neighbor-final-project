import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../store/appContext.js";
import TitleProfiles from "../../component/titleProfiles/TitleProfiles.jsx";
import PersonalProfileDetails from "../../component/personalProfileDetails/PersonalProfileDetails.jsx";

const ProfileSeller = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    actions.getProfileSeller(id);
  }, [id]);

  if (!store.seller) return <div>Loading...</div>;
  return (
    <div className="container d-flex flex-column min-vh-100">
      <TitleProfiles title={store.seller.role} />
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
                  <p className="card-text">
                    <li>Lord Rings</li>
                    <li>Harry Potter</li>
                  </p>
                </ol>
                <a href="#" className="btn btn-secondary mt-4">
                  Do a recommendation!
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-7 d-flex flex-column justify-content-center">
            <PersonalProfileDetails
              nameProfile={store.seller.name}
              lastname={store.seller.lastname}
              floor={store.seller.floor}
              shopName={store.seller.shopName}
              email={store.seller.email}
            />
          </div>
          <div className="mt-auto text-end mb-5">
            <Link to={"/profileEditSeller"} className="btn btn-success me-5">
              Editar información
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSeller;
