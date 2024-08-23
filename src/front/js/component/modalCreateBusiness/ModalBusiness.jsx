import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";

const ModalBusiness = ({ shopName, id }) => {
  const { store, actions } = useContext(Context);
  const [price, setPrice] = useState("");
  const [schedule, setSchedule] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    console.log("funciona");
    e.preventDefault();
    const response = await actions.createBusiness(
      id,
      shopName,
      price,
      schedule,
      description
    );
    console.log(id, shopName, price, schedule, description);
    console.log(response);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"

        data-bs-target="#createBusiness"

      >
        Crear negocio
      </button>

      <form
        onSubmit={handleSubmit}
        className="modal fade"

        id="createBusiness"

        tabIndex="-1"
        aria-labelledby="CreateBusinessLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="CreateBusinessLabel">
                {shopName} Your id: {id}
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
                  <label htmlFor="priceInput" className="form-label text-black">
                    Precio
                  </label>
                  <input
                    type="integer"
                    className="form-control"
                    id="priceInput"
                    aria-describedby="emailHelp"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <div id="emailHelp" className="form-text">
                    Introduce el precio solamente con números
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="scheduleInput" className="form-label text-black">
                    Horario
                  </label>
                  <input
                    type="string"
                    className="form-control"
                    id="scheduleInput"
                    value={schedule}
                    onChange={(e) => setSchedule(e.target.value)}
                  />
                  <label htmlFor="descriptionInput" className="form-label text-black">
                    Añade una descripción
                  </label>
                  <textarea
                    className="form-control mb-3"
                    id="descriptionInput"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button submit"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleSubmit}
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
