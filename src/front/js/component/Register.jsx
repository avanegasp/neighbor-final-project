import React, { useState } from 'react';


export default function Register() {
    const [name, setName] = useState("Neighbor");

    const handleTitle = (event) => {
        const selectedValue = event.target.value;
        setName(selectedValue);
    };

    const Submit = () => {
        // Manejo de la lógica de envío del formulario aquí
    };

    return (
        <div className='container-fluid w-50'>
            <h1 className='text-center p-2'>Register {name} </h1>
            <div className='w-100 d-flex justify-content-center'>
                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input
                        value="Neighbor"
                        type="radio"
                        className="btn-check"
                        name="btnradio"
                        id="btnradio1"
                        autoComplete="off"
                        checked={name === 'Neighbor'}
                        onChange={handleTitle}
                    />
                    <label className="btn btn-outline-primary" htmlFor="btnradio1">Neighbor</label>

                    <input
                        value="Seller"
                        type="radio"
                        className="btn-check"
                        name="btnradio"
                        id="btnradio2"
                        autoComplete="off"
                        checked={name === 'Seller'}
                        onChange={handleTitle}
                    />
                    <label className="btn btn-outline-primary" htmlFor="btnradio2">Seller</label>

                    <input
                        value="Administration"
                        type="radio"
                        className="btn-check"
                        name="btnradio"
                        id="btnradio3"
                        autoComplete="off"
                        checked={name === 'Administration'}
                        onChange={handleTitle}
                    />
                    <label className="btn btn-outline-primary" htmlFor="btnradio3">Administration</label>
                </div>
            </div>

            {name === 'Neighbor' && (
                <form className='mt-1' onSubmit={Submit}>
                    <div className="mb-3">
                        <label htmlFor="neighborName" className="form-label">Name | Lastname</label>
                        <input type="text" className="form-control" id="neighborName" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="neighborEmail" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="neighborEmail" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="neighborPassword" className="form-label">Password</label>
                        <input type="password" className="form-control" id="neighborPassword" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="neighborFloor" className="form-label">Floor</label>
                        <input type="text" className="form-control" id="neighborFloor" />
                    </div>
                    <button type="submit" className="btn btn-primary">Create an account</button>
                </form>
            )}

            {name === 'Seller' && (
                <form className='mt-1' onSubmit={Submit}>
                    <div className="mb-3">
                        <label htmlFor="sellerName" className="form-label">Name | Lastname</label>
                        <input type="text" className="form-control" id="sellerName" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="sellerEmail" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="sellerEmail" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="sellerPassword" className="form-label">Password</label>
                        <input type="password" className="form-control" id="sellerPassword" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="sellerFloor" className="form-label">Floor</label>
                        <input type="text" className="form-control" id="sellerFloor" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="shopName" className="form-label">Shop name</label>
                        <input type="text" className="form-control" id="shopName" />
                    </div>
                    <button type="submit" className="btn btn-primary">Create an account</button>
                </form>
            )}

            {name === 'Administration' && (
                <form className='mt-1' onSubmit={Submit}>
                    <div className="mb-3">
                        <label htmlFor="adminName" className="form-label">Name | Lastname</label>
                        <input type="text" className="form-control" id="adminName" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="adminEmail" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="adminEmail" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="adminPassword" className="form-label">Password</label>
                        <input type="password" className="form-control" id="adminPassword" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="adminFloor" className="form-label">Floor</label>
                        <input type="text" className="form-control" id="adminFloor" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="buildingName" className="form-label">Building name</label>
                        <input type="text" className="form-control" id="buildingName" />
                    </div>
                    <button type="submit" className="btn btn-primary">Create an account</button>
                </form>
            )}
        </div>
    );
}
