import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext.js";
import { useNavigate } from "react-router-dom";
import Search from "../../component/search/Search.jsx";
import AllUsersInfo from "../../component/directory/AllUsersInfo.jsx";
import ModalBodyRecommendation from "../../component/modalRecommendationsProfile/ModalBody.jsx";
const Directory = () => {
  const { store, actions } = useContext(Context);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    actions.getAllDirectory()
      .then((data) => {
        if (data?.error) {
          setError(data.error || "Error fetching profile");
          if (data.error === "Unauthorized access") {
            navigate("/register");
          }
        }
      });
    console.log('data', store)
  }, []);

  if (!store.users) return <div>Loading...</div>;


  return (
    <div className="">
      <div className="container d-flex flex-column flex-grow-1">
        <div
          className="d-flex justify-content-between align-items-center mb-3" style={{ marginTop: "100px" }}

        >
          <h1 className="text-title fw-bold font-monospace text-white business">Directorio</h1>

          <div className="input-group mb-3 inputSearch w-25">
            <Search />
          </div>
        </div>

        <div
          className="flex-grow-1 overflow-auto border border-white p-3"
          style={{ maxHeight: 'calc(80vh - 100px)' }}
        >
          {store.users.administrator.map((user) => {
            return (
              <div
                className="ps-4 col-md-7 d-flex flex-column justify-content-center position-relative w-auto mb-5"
                key={user.id}
              >
                <AllUsersInfo
                  role={user.role}
                  nameProfile={user.name}
                  lastname={user.lastname}
                  floor={user.floor}
                  buildingName={user.buildingName}
                  email={user.email}
                  id={user.id}
                  recommendation={user.recommendations}
                />
                <div className="modal fade" id={`modal-${user.role}-${user.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <ModalBodyRecommendation
                    user={user}
                    recommendations={user.recommendations} />
                </div>
              </div>
            );
          })}
          {store.users.neighbor.map((user) => {
            return (
              <div
                className="ps-4 col-md-7 d-flex flex-column justify-content-center position-relative w-auto mb-5"
                key={user.id}
              >
                <AllUsersInfo
                  role={user.role}
                  nameProfile={user.name}
                  lastname={user.lastname}
                  floor={user.floor}
                  email={user.email}
                  id={user.id}
                  recommendation={user.recommendations}
                />
                <div className="modal fade" id={`modal-${user.role}-${user.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <ModalBodyRecommendation
                    user={user}
                    recommendations={user.recommendations} />
                </div>
              </div>
            );
          })}
          {store.users.seller.map((user) => {
            return (
              <div
                className="ps-4 col-md-7 d-flex flex-column justify-content-center position-relative w-auto mb-5"
                key={user.id}
              >
                <AllUsersInfo
                  role={user.role}
                  nameProfile={user.name}
                  lastname={user.lastname}
                  floor={user.floor}
                  shopName={user.shopName}
                  email={user.email}
                  phone={user.phone}
                  id={user.id}
                  recommendation={user.recommendations}
                />
                <div className="modal fade" id={`modal-${user.role}-${user.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <ModalBodyRecommendation
                    user={user}
                    recommendations={user.recommendations} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Directory;
