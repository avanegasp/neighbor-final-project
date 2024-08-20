import React, { useContext, useEffect } from 'react'
import { Context } from "../../store/appContext.js";
function BuildingUsers() {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getAllDirectory();
    }, []);

    if (!store.users) return <div>Loading...</div>;

    const acceptUser = () => {

    }
    const declineUser = () => {

    }
    return (
        <div className="d-flex flex-column min-vh-100" style={{ height: '200px', overflow: 'scroll' }}>
            <h3 className='text-white pt-3'>Lista de vecinos</h3>
            {store.users.neighbor && store.users.neighbor.length > 0 ? (
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col" className="text-white">Nombre</th>
                            <th scope="col" className="text-white">Apellido</th>
                            <th scope="col" className="text-white">Piso</th>
                            <th scope="col" className="text-white">Email</th>
                            <th scope="col" className="text-white">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.users.neighbor.map((user) => (
                            <tr key={user.id}>
                                <td className="text-white">{user.name}</td>
                                <td className="text-white">{user.lastname}</td>
                                <td className="text-white">{user.floor}</td>
                                <td className="text-white">{user.email}</td>
                                <td>
                                    <button type="button" className="btn btn-primary m-2" onClick={acceptUser}>Aceptar</button>
                                    <button type="button" className="btn btn-danger m-2" onClick={declineUser}>Rechazar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) :
                <p className='text-white'>No hay vendedores registrados</p>
            }
            <h3 className='text-white'>Lista de vendedores</h3>
            {store.users.seller && store.users.seller.length > 0 ? (
                <table className='table table-dark'>
                    <thead>
                        <tr>
                            <th scope="col" className="text-white">Nombre</th>
                            <th scope="col" className="text-white">Apellido</th>
                            <th scope="col" className="text-white">Piso</th>
                            <th scope="col" className="text-white">Email</th>
                            <th scope="col" className="text-white">Shopname</th>

                        </tr>
                    </thead>
                    <tbody>
                        {store.users.seller.map((user) => (
                            <tr key={user.id}>
                                <td className="text-white">{user.name}</td>
                                <td className="text-white">{user.lastname}</td>
                                <td className="text-white">{user.floor}</td>
                                <td className="text-white">{user.email}</td>
                                <td className="text-white">{user.shopName}</td>
                                <td>
                                    <button type="button" className="btn btn-primary m-2" onClick={acceptUser}>Aceptar</button>
                                    <button type="button" className="btn btn-danger m-2" onClick={declineUser}>Rechazar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            ) : (
                <p className='text-white'>No hay vendedores registrados</p>
            )}
        </div>
    );
};

export default BuildingUsers