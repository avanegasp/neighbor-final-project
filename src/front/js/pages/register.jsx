import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext";
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import "../../styles/index.css";
export default function Register() {
    const [role, setRole] = useState("Neighbor");
    const { actions } = useContext(Context);
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
        <div className='register-container'>
            <h1 className='text-center text-white'>Registro {role} </h1>
            <div className=''>
                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input
                        type="radio"
                        value="Neighbor"
                        name="btnradio"
                        id="btnradio1"
                        autoComplete="off"
                        checked={role === 'Neighbor'}
                        onChange={handleRoleChange}
                    />

                    <label className="btn btn-outline-white text-white" htmlFor="btnradio1">Vecinor</label>


                    <input
                        value="Seller"
                        type="radio"
                        name="btnradio"
                        id="btnradio2"
                        autoComplete="off"
                        checked={role === 'Seller'}
                        onChange={handleRoleChange}
                    />

                    <label className="btn btn-outline-white text-white" htmlFor="btnradio2">Vendedor</label>


                    <input
                        value="Administrator"
                        type="radio"
                        name="btnradio"
                        id="btnradio3"
                        autoComplete="off"
                        checked={role === 'Administrator'}
                        onChange={handleRoleChange}
                    />

                    <label className="btn btn-outline-white text-white" htmlFor="btnradio3">Administrador</label>

                </div>
            </div>
            <form className='mt-1' onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-2">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input type="text" {...register("name")} className="form-control" id="name" />
                </div>
                <div className="mb-2">
                    <label htmlFor="lastname" className="form-label">Apellido</label>
                    <input type="text" {...register("lastname")} className="form-control" id="lastname" />
                </div>
                <div className="mb-2">
                    <label htmlFor="email" className="form-label">Correo</label>
                    <input type="email" {...register("email")} className="form-control" id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-2">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input type="password" {...register("password")} className="form-control" id="password" />
                </div>
                <div className="mb-2">
                    <label htmlFor="floor" className="form-label">Piso</label>

                    <input type="text" {...register("floor")} className="form-control" id="floor" />
                </div>
                {role === 'Seller' && (
                    <>
                        <div className="mb-2">
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
                        <div className="mb-2">

                            <label htmlFor="shopName" className="form-label">Emprendimiento</label>

                            <input type="text" {...register("shopName")} className="form-control" id="shopName" />
                        </div>
                    </>
                )}
                {role === 'Administrator' && (
                    <div className="mb-3">
                        <label htmlFor="buildingName" className="form-label">Edificio</label>
                        <input type="text" {...register("buildingName")} className="form-control" id="buildingName" />
                    </div>
                )}
                <button type="submit" className="register-button">Crea una cuenta</button>
            </form>
            <div >
                {" "}
                <Link className='text-white' to={"/login"}>Ya te registraste? Ingresa por acá.</Link>
            </div>
        </div >
    );
}