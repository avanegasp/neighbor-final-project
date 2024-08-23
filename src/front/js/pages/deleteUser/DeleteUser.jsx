import React, { useState, useContext, useEffect } from "react";
import AdminDeleteUser from "../../component/adminDeleteUser/AdminDeleteUser.jsx";
import { Context } from "../../store/appContext.js";
const DeleteUser = () => {
  const { store, actions } = useContext(Context);
  //   if (store.people.neighbor?.length > 0 || store.people.seller?.length == 0) return <div>Loading...</div>;
  useEffect(() => {
    actions.getAllUser();
    // console.log("no sirve")
  }, []);
  //  console.log(store.people)
  return (
    <div >
      <div className="container my-13">
        <div className="mb-4">
          <h2 className="text-center people">USUARIOS ACTIVOS</h2>
        </div>
        <div className="container-fluid d-flex justify-content-end">
        </div>
        <div className="container-fluid border border-dark" style={{ height: '1000px', overflow: 'scroll' }}  >
          {store.people?.neighbor.length > 0 && store.people?.neighbor.map((neighbor) => (
            <AdminDeleteUser person={neighbor} />
          ))}
          {store.people?.seller.length > 0 && store.people?.seller.map((seller) => (
            <AdminDeleteUser person={seller} />
          ))}
        </div>
      </div>
    </div>
  )
}
export default DeleteUser;