import React, { useContext, useEffect } from 'react'
import { Context } from "../../store/appContext.js";
function BuildingUsers() {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        actions.getAllDirectory();
    }, []);

    if (!store.users) return <div>Loading...</div>;

    const ApprovedStatus = async (user) => {
        const status = "APPROVED"
        const resp = await actions.changeStatus(user.id, user.role, status)
    }

    const RejectedStatus = async (user) => {
        const status = "REJECTED"
        const resp = await actions.changeStatus(user.id, user.role, status)
    }

    return (

        <div className="d-fle container justify-content-center align-content-center flex-column business ">
            <h1 className='text-white fs-1 pt-3'>Lista de vecinos</h1>
            {store.users.neighbor && store.users.neighbor.length > 0 ? (
                <div style={{ maxHeight: '200px', overflowY: 'auto', overflowX: 'auto' }}>
                    <table className="table">
                        <thead className='bg-black'>
                            <tr className='' style={{ position: "sticky", top: 0, zIndex: 1,background: "inherit" }}>
                                <th scope="col" className="text-white fs-5">Nombre</th>
                                <th scope="col" className="text-white fs-5">Apellido</th>
                                <th scope="col" className="text-white fs-5">Piso</th>
                                <th scope="col" className="text-white fs-5">Email</th>
                                <th scope="col" className="text-white fs-5">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {store.users.neighbor.map((user) => (
                                <tr className='border border-secondary' key={user.id}>
                                    <td className="text-white fs-5">{user.name}</td>
                                    <td className="text-white fs-5">{user.lastname}</td>
                                    <td className="text-white fs-5">{user.floor}</td>
                                    <td className="text-white fs-5">{user.email}</td>
                                    {user.status === "PENDING" && (
                                        <td>
                                            <button type="button" className="btn btn-success m-2" onClick={() => ApprovedStatus(user)}>Aceptar</button>
                                            <button type="button" className="btn btn-danger m-2" onClick={() => RejectedStatus(user)}>Rechazar</button>
                                        </td>
                                    )}
                                    {(user.status === "APPROVED" || user.status === "REJECTED") && (
                                        <td>
                                            <button type="button"
                                                className={`btn ${user.status === "APPROVED" ? "btn-success" : "btn-danger"} m-2`} disabled
                                            >
                                                {user.status}
                                            </button>
                                        </td>
                                    )}

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) :
                <p className='text-white'>No hay vecinos registrados</p>
            }

            <h1 className='text-white fs-1 mt-5'>Lista de vendedores</h1>
            {store.users.seller && store.users.seller.length > 0 ? (
                <div style={{ maxHeight: '200px', overflowY: 'auto', overflowX: 'auto' }}>
                    <table className='table'>
                        <thead className='bg-black'>
                            <tr className='' style={{ position: "sticky", top: 0, zIndex: 1, background: "inherit" }}>
                                <th scope="col" className="text-white fs-5">Nombre</th>
                                <th scope="col" className="text-white fs-5">Apellido</th>
                                <th scope="col" className="text-white fs-5">Piso</th>
                                <th scope="col" className="text-white fs-5">Email</th>
                                <th scope="col" className="text-white fs-5">Shopname</th>
                                <th scope="col" className="text-white fs-5">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {store.users.seller.map((user) => (
                                <tr className='border border-secondary' key={user.id}>
                                    <td className="text-white fs-5">{user.name}</td>
                                    <td className="text-white fs-5">{user.lastname}</td>
                                    <td className="text-white fs-5">{user.floor}</td>
                                    <td className="text-white fs-5">{user.email}</td>
                                    <td className="text-white fs-5">{user.shopName}</td>
                                    {user.status === "PENDING" && (
                                        <td>
                                            <button type="button" className="btn btn-success m-2" onClick={() => ApprovedStatus(user)}>Aceptar</button>
                                            <button type="button" className="btn btn-danger m-2" onClick={() => RejectedStatus(user)}>Rechazar</button>
                                        </td>
                                    )}
                                    {(user.status === "APPROVED" || user.status === "REJECTED") && (
                                        <td>
                                            <button type="button"
                                                className={`btn ${user.status === "APPROVED" ? "btn-success" : "btn-danger"} m-2`} disabled
                                            >
                                                {user.status}
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className='text-white'>No hay vendedores registrados</p>
            )}
        </div>
    );
};

export default BuildingUsers