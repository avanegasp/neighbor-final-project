import React from "react";


const Business = () => {
  return (
    <div className="container my-4">
      <div className="mb-4">
        <h2 className="text-center business">TIENDA</h2>
      </div>
      <div className="row">
        <div className="col-12 col-md-6 col-lg-3 mb-3">
          <div className="card">
            <img
              src="https://ideogram.ai/assets/progressive-image/balanced/response/BdP2GwLfRwWh39dRX-d1UA"
              className="card-img-top"
              alt="Business"
            />
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3 mb-3">
          <div className="card">
            <img
              src="https://ideogram.ai/assets/image/lossless/response/xtU_6kplThiPK6v7BrgSjA"
              className="card-img-top"
              alt="Business"
            />
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3 mb-3">
          <div className="card">
            <img
              src="https://ideogram.ai/assets/progressive-image/balanced/response/txYlg76OTTuVv5luURoaUA"
              className="card-img-top"
              alt="Business"
            />
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3 mb-3">
          <div className="card">
            <img
              src="https://ideogram.ai/assets/progressive-image/balanced/response/JOr5PovPTdywjf3E9BzkhQ"
              className="card-img-top"
              alt="Business"
            />
          </div>
        </div>
      </div>
      <div className="mb-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Foto
              </th>
              <th scope="col">Servicio</th>
              <th scope="col">Horarios</th>
              <th scope="col">Pecio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Paseador de Perros</td>
              <td>L,M,V de 8am a 10am, 19pm a 21pm</td>
              <td>$10</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Galletas chicas exploradoras</td>
              <td>Luego de la escuela </td>
              <td>$10 la caja </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Mecanico</td>
              <td>A Servicio</td>
              <td>Segun el Problema del auto</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Pepostera</td>
              <td>A Servicio</td>
              <td>Segun su pedido</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mb-4">
        <div className="review">
          <h2>Reseña del Producto</h2>
          <p>
            Este producto es excelente. La calidad es muy buena y el servicio al cliente fue excepcional.
            En general, estoy muy satisfecho con mi compra.
          </p>
        </div>
      </div>
      <div className="text-center">
        <button className="btn btn-edit">Editar info</button>
      </div>
    </div>
  );
};

export default Business;
