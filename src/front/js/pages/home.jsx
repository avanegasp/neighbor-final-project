// import React, { useContext } from "react";
// import { Context } from "../store/appContext";
// import { Link } from "react-router-dom";
// import "../../styles/home.css";

// export const Home = () => {
//   const { store, actions } = useContext(Context);

//   return (
//     <div className="text-center mt-5">
//       <h1>Hello Neighbors!!</h1>

//       <div>
//         <Link to={"/register"}>Register</Link>
//       </div>

//       <div>
//         <div>
//           <Link to={"/profileNeighbor"}>Perfil Vecino(a)</Link>
//         </div>
//         <div>
//           <Link to={"/profileSeller"}>Perfil Vendedora(a)</Link>
//         </div>
//         <div>
//           <Link to={"/profileAdmin"}>Perfil Admin</Link>
//         </div>
//         <div>
//           <Link to={"/login"}>Login</Link>
//           <Link to={"/directory"}>Directorio</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="home-container">
      <div className="row w-100">
        <div className="col-12 text-center">
          <h1 className="home-title">NEIGHBORS</h1>
        </div>
      </div>
      <div className="row w-100">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <p className="description">
            Neighburs is an excellent application designed to improve building
            management and organization. It simplifies communication between
            residents and building managers, streamlines maintenance requests,
            and tracks communal expenses with ease. The app helps building
            administrators efficiently manage tasks and resources, while also
            fostering a sense of community. It supports local businesses and
            encourages entrepreneurial ventures by connecting residents and
            facilitating collaboration. In essence, Neighburs is a powerful tool
            for enhancing both building operations and community engagement.
          </p>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="card p-4 shadow-sm">
            <Link to="/login" className="btn btn-login">
              Iniciar sesión/Login
            </Link>
            <Link to="/register" className="btn btn-signup">
              Crear cuenta nueva/Signup
            </Link>
            <Link to={"/profileNeighbor"}>Perfil Vecino(a)</Link>
            <Link to={"/profileSeller"}>Perfil Vendedora(a)</Link>
            <Link to={"/profileAdmin"}>Perfil Admin</Link>
            <Link to={"/Business"}> SHOP </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
