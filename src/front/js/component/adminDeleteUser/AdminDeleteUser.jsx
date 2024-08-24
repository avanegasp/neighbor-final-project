import React, { useContext } from "react";
import { Context } from "../../store/appContext.js";
import TagRol from "../tagRol/TagRol.jsx";
import PersonalProfileDetails from "../personalProfileDetails/PersonalProfileDetails.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
    cloud: {
        cloudName: "dysmvst60"
    }
})

const imgCloudinary = [
    'cld-sample-2',
    'samples/food/fish-vegetables',
    'samples/landscapes/nature-mountains',
    'samples/people/bicycle',
    'samples/animals/three-dogs',
    'samples/animals/reindeer',
    'samples/balloons'
]


const AdminDeleteUser = ({ person }) => {
    const { actions, store } = useContext(Context)
    const cldImg = cld.image('sample');
    const imageIndex = parseInt(person.id, 10) % imgCloudinary.length;
    const selectedImageId = imgCloudinary[imageIndex]
    // console.log(store.people)
    // console.log(actions.deleteNeighbor)
    // console.log(actions.deleteSeller)
    return (
        <div>
            <div key={person.id} className="people">
                <div className=" d-flex w-100 justify-content-between " >
                    <div className=" personImg col-3 col-lg-2">
                        <AdvancedImage
                            cldImg={cld.image(selectedImageId)}
                            className="card-img-top"
                            alt=""
                        />
                    </div>
                    <div className="infoPerson  col-sm  align-items-center">
                        <div className="name">
                            <div className="col-12">
                                <h2 className="pt-2 m-3">{person.name} {person.lastname} </h2>
                            </div>
                            <div className="floor m-2">
                                <div className="floor m-2">
                                    <i className="fa-solid fa-building"></i> {person.floor}
                                </div>
                                <div className="role m-2">
                                    <i className="fa-solid fa-person"></i> {person.role}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" d-flex justify-content-end">
                        <div className="trash">
                            <button onClick={() => actions.deleteUser(person.id, person.role)} className="btn btn-light col-lg-50 justify-content-lg-center" >
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AdminDeleteUser;