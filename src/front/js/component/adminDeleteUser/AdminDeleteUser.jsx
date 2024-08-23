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
                <div className=" d-flex gap-2 w-100 justify-content-between " >
                    <div className=" personImg col-3 col-lg-2 border">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp8-7zKqxeqUgJ0SfeQ9jxZzFzU_6nTObmYQ&s" className="card-img  " alt="..." />
                    </div>
                    <div className="infoPerson  col-sm  align-items-center">
                        <div className="name">
                            <div className="col-12 py-3">
                                <h2 className="pt-2">{person.name} {person.lastname} </h2>
                            </div>
                            <div className="floor">
                                <div className="floor">
                                    <i class="fa-solid fa-building"></i> {person.floor}
                                </div>
                                <div className="role">
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