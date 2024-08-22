import React, { useContext, useEffect } from 'react';
import { Context } from "../store/appContext";

const Business = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getAllBusiness();
  }, []);

  return (
    <div className="container my-4">
      <div className="mb-4">
        <h2 className="text-center business">TIENDA</h2>
      </div>
      <div className="row">
        {store.allBusiness.map((shop) => {
          return (
            <div key={shop.id} className="col-12 col-md-6 col-lg-3 mb-3">
              <div className="card">
                <img
                  src="https://picsum.photos/200"
                  className="card-img-top"
                  alt="..."
                />
                <div className="mb-4">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Servicio</th>
                        <th scope="col">Horarios</th>
                        <th scope="col">Precio</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{shop.service}</td>
                        <td>{shop.schedule}</td>
                        <td>{shop.price}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Business;
