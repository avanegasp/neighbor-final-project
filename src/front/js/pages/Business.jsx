import React, { useContext, useEffect } from 'react';
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
                <h1 className="text-title fw-bold font-monospace text-white business">TIENDA</h1>
            </div>
            <div className="card-group">
                <div className="d-flex flex-row overflow-scroll">
                    {store.allBusiness.length > 0 ? (
                        store.allBusiness.map((business, index) => {
                            const imageIndex = parseInt(index, 10) % imgCloudinary.length;
                            const selectedImageId = imgCloudinary[imageIndex];
                            const cldImg = cld.image(selectedImageId);

                            return (
                                <div key={index} className="card" style={{ width: "18rem", flex: "none", margin: "10px" }}>
                                    <AdvancedImage
                                        cldImg={cldImg}
                                        className="card-img-top"
                                        alt={business.name}
                                    />
                                    <div className="card-body">
                                        <table className="table table-borderless">
                                            <thead>
                                                <tr>
                                                    <th scope="row">{business.name}</th>
                                                    <th scope="row">{business.seller_name}</th>
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
