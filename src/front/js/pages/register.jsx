import React, { act, useContext, useState } from 'react';
import { Context } from "../store/appContext";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState("Neighbor");
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    const handleTitle = (event) => {
        const selectedValue = event.target.value;
        setName(selectedValue);
    };

    const { register, handleSubmit } = useForm();
    const { register: register2, handleSubmit: handleSubmit2 } = useForm()
    const { register: register3, handleSubmit: handleSubmit3 } = useForm()

    const onSubmitNeighbor = async (data) => {
        const resp = await actions.registerNeighbor(data.email, data.password, data.name, data.lastname, data.floor)
        console.log(resp)
    }

    const onSubmitSeller = async (data) => {
        const resp = await actions.registerSeller(data.email, data.password, data.name, data.lastname, data.floor, data.shopName)
        console.log(resp)
    }

    const onSubmitAdmin = async (data) => {
        const resp = await actions.registerAdmin(data.email, data.password, data.name, data.lastname, data.floor, data.buildingName)
        console.log(resp)
    }
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
                        value="Administrator"
                        type="radio"
                        className="btn-check"
                        name="btnradio"
                        id="btnradio3"
                        autoComplete="off"
                        checked={name === 'Administrator'}
                        onChange={handleTitle}
                    />
                    <label className="btn btn-outline-primary" htmlFor="btnradio3">Administration</label>
                </div>
            </div>

            {name === 'Neighbor' && (
                <form className='mt-1' onSubmit={handleSubmit(onSubmitNeighbor)}>
                    <div className="mb-3">
                        <label htmlFor="neighborName" className="form-label">Name</label>
                        <input type="text" {...register("name")} className="form-control" id="neighborName" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="neighborLastname" className="form-label">Last Name</label>
                        <input type="text" {...register("lastname")} className="form-control" id="neighborLastName" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="neighborEmail" className="form-label">Email address</label>
                        <input type="email" {...register("email")} className="form-control" id="neighborEmail" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="neighborPassword" className="form-label">Password</label>
                        <input type="password" {...register("password")} className="form-control" id="neighborPassword" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="neighborFloor" className="form-label">Floor</label>
                        <input type="text" {...register("floor")} className="form-control" id="neighborFloor" />
                    </div>
                    <button type="submit" className="btn btn-primary">Create an account</button>
                </form>
            )}

            {name === 'Seller' && (
                <form className='mt-1' onSubmit={handleSubmit2(onSubmitSeller)}>
                    <div className="mb-3">
                        <label htmlFor="sellerName" className="form-label">Name</label>
                        <input type="text" {...register2("name")} className="form-control" id="sellerName" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="sellerName" className="form-label">Last Name</label>
                        <input type="text" {...register2("lastname")} className="form-control" id="sellerLastName" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="sellerEmail" className="form-label">Email address</label>
                        <input type="email" {...register2("email")} className="form-control" id="sellerEmail" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="sellerPassword" className="form-label">Password</label>
                        <input type="password" {...register2("password")} className="form-control" id="sellerPassword" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="sellerFloor" className="form-label">Floor</label>
                        <input type="text" {...register2("floor")} className="form-control" id="sellerFloor" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="shopName" className="form-label">Shop name</label>
                        <input type="text" {...register2("shopName")} className="form-control" id="shopName" />
                    </div>
                    <button type="submit" className="btn btn-primary">Create an account</button>
                </form>
            )}

            {name === 'Administrator' && (
                <form className='mt-1' onSubmit={handleSubmit3(onSubmitAdmin)}>
                    <div className="mb-3">
                        <label htmlFor="adminName" className="form-label">Name</label>
                        <input type="text" {...register3("name")} className="form-control" id="adminName" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="adminLastname" className="form-label">Last Name</label>
                        <input type="text" {...register3("lastname")} className="form-control" id="adminLastName" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="adminEmail" className="form-label">Email address</label>
                        <input type="email" {...register3("email")} className="form-control" id="adminEmail" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="adminPassword" className="form-label">Password</label>
                        <input type="password" {...register3("password")} className="form-control" id="adminPassword" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="adminFloor" className="form-label">Floor</label>
                        <input type="text" {...register3("floor")} className="form-control" id="adminFloor" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="buildingName" className="form-label">Building name</label>
                        <input type="text" {...register3("buildingName")} className="form-control" id="buildingName" />
                    </div>
                    <button type="submit" className="btn btn-primary">Create an account</button>
                </form>
            )}
        </div>
    );
}
