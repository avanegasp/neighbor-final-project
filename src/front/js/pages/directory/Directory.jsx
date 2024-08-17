import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext.js";
import Search from "../../component/search/Search.jsx";
import AllUsersInfo from "../../component/directory/AllUsersInfo.jsx";

const Directory = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getAllDirectory();
  }, []);

  if (!store.users) return <div>Loading...</div>;

  // console.log("Daaataaaaaa", store.users);


  return (
    <div className="d-flex flex-column min-vh-100" style={{ height: '200px', overflow: 'scroll' }}>
      <div className="container d-flex flex-column flex-grow-1">
        <div
          className="d-flex justify-content-between align-items-center mb-3"
          style={{ minHeight: "20vh" }}
        >
          <h1 className="d-flex justify-context-center">Directorio</h1>

          <div className="input-group mb-3 inputSearch w-25">
            <Search />
          </div>
        </div>

        <div
          className="flex-grow-1 overflow-auto border border-white p-3"
          style={{ maxHeight: 'calc(80vh - 100px)' }}
        >
          {store.users.administrator.map((user) => {
            // console.log("USERRRRR", user);
            return (
              <div
                className="col-md-7 d-flex flex-column justify-content-center position-relative w-auto mb-5"
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
                />
              </div>
            );
          })}
          {store.users.neighbor.map((user) => {
            // console.log("USERRRRR", user);
            return (
              <div
                className="col-md-7 d-flex flex-column justify-content-center position-relative w-auto mb-5"
                key={user.id}
              >
                <AllUsersInfo
                  role={user.role}
                  nameProfile={user.name}
                  lastname={user.lastname}
                  floor={user.floor}
                  email={user.email}
                  id={user.id}
                />
              </div>
            );
          })}
          {store.users.seller.map((user) => {
            // console.log("USERRRRR", user);
            return (
              <div
                className="col-md-7 d-flex flex-column justify-content-center position-relative w-auto mb-5"
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
                />
              </div>
            );
          })}
        </div>
      </div>

      <footer className="bg-dark text-white text-center py-3">
        <p>Footer Content Here</p>
      </footer>
    </div>
  );
};

export default Directory;
