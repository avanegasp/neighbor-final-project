import React, { useContext } from 'react';
import { Context } from "../store/appContext";

const Business = () => {
  // const { store, actions } = useContext(Context);

  // useEffect(() => {
  //   actions.getAllBusiness()
  // }, []);
  
  return (
    <div className="container my-4">
      <div className="mb-4">
        <h2 className="text-center business">TIENDA</h2>
      </div>
      <div className="row">

        {/* 
      {store.allBusiness.map((busines)=>{
        return(
        <div className="col-12 col-md-6 col-lg-3 mb-3">
          <div className="card">
            <img
              src="https://ideogram.ai/assets/progressive-image/balanced/response/BdP2GwLfRwWh39dRX-d1UA"
              className="card-img-top"
              alt="Business"
            />
            <div className="mb-4">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Servicio</th>
                    <th scope="col">Horarios</th>
                    <th scope="col">Pecio</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Paseador de Perros</td>
                    <td>L,M,V de 8am a 10am, 19pm a 21pm</td>
                    <td>$10</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        )
        })} 
      */}

        {/* de acaaa */}
        <div className="col-12 col-md-6 col-lg-3 mb-3">
          <div className="card">
            <img
              src="https://ideogram.ai/assets/progressive-image/balanced/response/BdP2GwLfRwWh39dRX-d1UA"
              className="card-img-top"
              alt="Business"
            />
            <div className="mb-4">
              <table className="table">
                <thead>
                  <tr>

                    <th scope="col">Servicio</th>
                    <th scope="col">Horarios</th>
                    <th scope="col">Pecio</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Paseador de Perros</td>
                    <td>L,M,V de 8am a 10am, 19pm a 21pm</td>
                    <td>$10</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* de acaa  */}
        <div className="col-12 col-md-6 col-lg-3 mb-3">
          <div className="card">
            <img
              src="https://ideogram.ai/assets/image/lossless/response/xtU_6kplThiPK6v7BrgSjA"
              className="card-img-top"
              alt="Business"
            />
            <div className="mb-4">
              <table className="table">
                <thead>
                  <tr>

                    <th scope="col">Servicio</th>
                    <th scope="col">Horarios</th>
                    <th scope="col">Pecio</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Galletas chicas exploradoras</td>
                    <td>Luego de la escuela </td>
                    <td>$10 la caja </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3 mb-3">
          <div className="card">
            <img
              src="https://ideogram.ai/assets/progressive-image/balanced/response/txYlg76OTTuVv5luURoaUA"
              className="card-img-top"
              alt="Business"
            />
            <div className="mb-4">
              <table className="table">
                <thead>
                  <tr>

                    <th scope="col">Servicio</th>
                    <th scope="col">Horarios</th>
                    <th scope="col">Pecio</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mecanico</td>
                    <td>A Servicio</td>
                    <td>Segun el Problema del auto</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3 mb-3">
          <div className="card">
            <img
              src="https://ideogram.ai/assets/progressive-image/balanced/response/JOr5PovPTdywjf3E9BzkhQ"
              className="card-img-top"
              alt="Business"
            />
            <div className="mb-4">
              <table className="table">
                <thead>
                  <tr>

                    <th scope="col">Servicio</th>
                    <th scope="col">Horarios</th>
                    <th scope="col">Pecio</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Pepostera</td>
                    <td>A Servicio</td>
                    <td>Segun su pedido de dulces.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Business;
