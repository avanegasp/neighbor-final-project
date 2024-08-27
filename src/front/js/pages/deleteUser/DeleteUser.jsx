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

      <div className="container">

        <div className="mb-4">
          <h2 className="text-center people">Usuarios Activos</h2>
        </div>
        <div className="container d-flex justify-content-end">
        </div>

        <div className="container" style={{ width:"700px", height: '600px', overflow: 'scroll' }}  >
        {store.people?.neighbor.length > 0 && store.people?.neighbor.map((neighbor) => (
            neighbor.status === 'APPROVED' ? <AdminDeleteUser person={neighbor} /> : null

          ))}
          {store.people?.seller.length > 0 && store.people?.seller.map((seller) => (
            seller.status === 'APPROVED' ? <AdminDeleteUser person={seller} /> : null
          ))}
        </div>
      </div>
    </div>
  )
}
export default DeleteUser;