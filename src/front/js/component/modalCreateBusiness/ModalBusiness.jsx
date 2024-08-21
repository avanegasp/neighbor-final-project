import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";

const ModalBusiness = ({ shopName, id }) => {
  const { store, actions } = useContext(Context);
  const [price, setPrice] = useState("");
  const [schedule, setSchedule] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await actions.createBusiness(id, shopName, price, schedule);
    console.log(id, shopName, price, schedule);
    console.log(response);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#CreateBusiness"
      >
        Crear negocio
      </button>

      <form
        onSubmit={handleSubmit}
        className="modal fade"
        id="CreateBusiness"
        tabIndex="-1"
        aria-labelledby="CreateBusinessLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="CreateBusinessLabel">
                {shopName}. Your id: {id}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Precio
                  </label>
                  <input
                    type="integer"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <div id="emailHelp" className="form-text">
                    Introduce el precio solamente con números
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Horario
                  </label>
                  <input
                    type="string"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={schedule}
                    onChange={(e) => setSchedule(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button submit"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ModalBusiness;
