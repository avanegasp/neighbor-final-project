import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';

const Business = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getAllBusiness();
    }, []);

    return (
        <div className="text-center mt-5">
            <div className='mb-4'>
            <h1 className="text-title fw-bold font-monospace text-white business">TIENDA</h1>
            </div>
            <div className="card-grup">
                <div className="d-flex flex-row overflow-scroll">
                    {store.allBusiness.length > 0 ? (
                        store.allBusiness.map((business, index) => (
                            <div key={index} className="card" style={{ width: "18rem", flex: "none", margin: "10px" }}>
                                <img
                                    src="https://picsum.photos/200"
                                    className="card-img-top"
                                    alt={business.name}
                                />
                                <div className="card-body">
                                    <table className="table table-borderless">
                                        <thead>
                                            <tr>
                                            <th scope="row">{business.name}</th>
                                            </tr>
                                            <tr>
                                                <th scope="row">Precio</th>
                                                <th scope="row">Horarios</th>
                                                <th scope="row">Descripcion</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{business.price}</td>
                                                <td>{business.schedule}</td>
                                                <td>{business.description}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No businesses found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
export default Business;