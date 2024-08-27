import React, { useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Context } from '../store/appContext';
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
    cloud: {
        cloudName: "dysmvst60"
    }
});

const imgCloudinary = [
    'samples/people/kitchen-bar',
    'samples/breakfast',
    'samples/food/fish-vegetables',
    'samples/dessert-on-a-plate',
    'samples/food/spices',
    'samples/coffee',
    'samples/food/pot-mussels',
    'samples/food/dessert',
    'samples/balloons'
];

const Business = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getAllBusiness();
    }, []);

    return (
        <div className="text-center mt-5">
            <div className='mb-4'>
                <h1 className="text-title fw-bold font-monospace text-white business">Tienda</h1>
            </div>
            <div className="card-group">
                <div className="d-flex flex-row" style={{ width:"600px", overflow: 'scroll' }}  >
                    {store.allBusiness.length > 0 ? (
                        store.allBusiness.map((business, index) => {
                            const imageIndex = parseInt(index, 10) % imgCloudinary.length;
                            const selectedImageId = imgCloudinary[imageIndex];
                            const cldImg = cld.image(selectedImageId);

                            return (
                                <div key={index} className="card" style={{ flex: "none", margin: "10px", width: "20rem" }}>
                                    <AdvancedImage
                                        cldImg={cldImg}
                                        className="card-img-top"
                                        alt={business.name}
                                        style={{ width: '300px', height: '200px', objectFit: 'cover' }}
                                    />
                                    <div className="card-body">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="row">{business.name}</th>
                                                    
                                                   
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">Dueño</th>
                                                    <th>{business.seller_name}</th>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Precio</th>
                                                    <td>{business.price}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Horarios</th>
                                                    <td>{business.schedule}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Descripcion</th>
                                                    <td>{business.description}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <Link className="text-white fs-5 mx-1 my-1" to="/directory">
                                            <i className="text-white fs-5 mx-1 my-1 fa-solid fa-address-book"></i>{" "}
                                            Directorio
                                        </Link>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>No businesses found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Business;
