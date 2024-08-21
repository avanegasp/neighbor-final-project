import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext";
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import "../../styles/inputPhone.css";

export default function Register() {
    const [role, setRole] = useState("Neighbor");
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const { register, setValue, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        // console.log("SELER FAB", data)
        let response
        if (role === 'Neighbor') {
            response = await actions.registerNeighbor(data.email, data.password, data.name, data.lastname, data.floor);
        } else if (role === 'Seller') {
            response = await actions.registerSeller(data.email, data.password, data.name, data.lastname, data.floor, data.phone, data.shopName);
        } else if (role === 'Administrator') {
            response = await actions.registerAdmin(data.email, data.password, data.name, data.lastname, data.floor, data.buildingName);
        }
        if (response && response.user && response.user.id) {
            switch (role) {
                case "Neighbor":
                    navigate(`/profileNeighbor/${response.user.id}`);
                    return;
                case "Seller":
                    navigate(`/profileSeller/${response.user.id}`);
                    return;
                case "Administrator":
                    navigate(`/profileAdmin/${response.user.id}`);
                    return;
            }
        }
    };

    return (

        <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
            <div className='container-fluid w-50'>
                <h1 className='text-center p-2'>Registro {role} </h1>
                <div className='w-100 d-flex justify-content-center align-items-center'>
                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input
                            value="Neighbor"
                            type="radio"
                            className="btn-check"
                            name="btnradio"
                            id="btnradio1"
                            autoComplete="off"
                            checked={role === 'Neighbor'}
                            onChange={handleRoleChange}
                        />
                        <label className="btn btn-outline-primary" htmlFor="btnradio1">Neighbor</label>

                        <input
                            value="Seller"
                            type="radio"
                            className="btn-check"
                            name="btnradio"
                            id="btnradio2"
                            autoComplete="off"
                            checked={role === 'Seller'}
                            onChange={handleRoleChange}
                        />
                        <label className="btn btn-outline-primary" htmlFor="btnradio2">Seller</label>

                        <input
                            value="Administrator"
                            type="radio"
                            className="btn-check"
                            name="btnradio"
                            id="btnradio3"
                            autoComplete="off"
                            checked={role === 'Administrator'}
                            onChange={handleRoleChange}
                        />
                        <label className="btn btn-outline-primary" htmlFor="btnradio3">Administration</label>
                    </div>
                </div>

                <form className='mt-1' onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" {...register("name")} className="form-control" id="name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastname" className="form-label">Last Name</label>
                        <input type="text" {...register("lastname")} className="form-control" id="lastname" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" {...register("email")} className="form-control" id="email" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" {...register("password")} className="form-control" id="password" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="floor" className="form-label">Floor</label>
                        <input type="text" {...register("floor")} className="form-control" id="floor" />
                    </div>

                    {role === 'Seller' && (
                        <>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Whatsapp</label>
                                <PhoneInput
                                    onChange={(phone) => {
                                        // console.log('hhhh', phone)
                                        setValue('phone', phone)
                                    }
                                    }
                                    inputProps={{
                                        name: 'phone',
                                        required: true,
                                        autoFocus: true
                                    }}
                                    containerClass="form-control p-0 phone-input"
                                    inputClass="form-control w-100"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="shopName" className="form-label">Shop name</label>
                                <input type="text" {...register("shopName")} className="form-control" id="shopName" />
                            </div>
                        </>
                    )}

                    {role === 'Administrator' && (
                        <div className="mb-3">
                            <label htmlFor="buildingName" className="form-label">Building name</label>
                            <input type="text" {...register("buildingName")} className="form-control" id="buildingName" />
                        </div>
                    )}


                    <button type="submit" className="btn btn-primary">Crea una cuenta</button>
                </form>
                <div className=''>
                    {" "}
                    <Link className='text-primary' to={"/login"}>Ya te registraste? Ingresa por acá!</Link>
                </div>
            </div>
        </div >
    );
}
