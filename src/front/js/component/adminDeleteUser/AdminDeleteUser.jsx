import React, { useContext } from "react";
import { Context } from "../../store/appContext.js";
import TagRol from "../tagRol/TagRol.jsx";
import PersonalProfileDetails from "../personalProfileDetails/PersonalProfileDetails.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const AdminDeleteUser = ({ person }) => {
    const { actions, store } = useContext(Context)

    console.log(store.people)
    console.log(actions.deleteNeighbor)
    console.log(actions.deleteSeller)
    return (

        <div>

            <div key={person.id} className=" people">
                <div className="cardPeople" >
                    <div className="col-3 col-lg-2 p-2 mx-4 my-auto">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp8-7zKqxeqUgJ0SfeQ9jxZzFzU_6nTObmYQ&s" className="card-img rounded-circle" alt="..." />
                    </div>
                    <div className="infoPerson d-flex">
                        <div className="row d-flex">
                            <div className="col-12 py-3">
                                <h2 className="pt-2">{person.name}</h2>
                            </div>
                            <div className="col text-secondary">
                                <div className="d-flex align-items-center">
                                    <i className="fa-solid fa-envelope"></i> {person.email}
                                </div>
                                <div className="d-flex align-items-center">
                                    <i class="fa-solid fa-person"></i> {person.name}
                                </div>
                                <div className="d-flex align-items-center">
                                    <i className="fa-solid fa-building"></i> {person.floor}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid d-flex justify-content-end mb-2 mt-2">
                        <div className="d-flex align-items-start mt-3">
                            <button onClick={() => actions.deleteUser(person.id, person.role)} className="btn" data-bs-target="#exampleModal">
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