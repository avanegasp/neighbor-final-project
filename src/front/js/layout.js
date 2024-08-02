import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import ProfileNeighbor from "./pages/ProfileNeighbor.jsx";
import ProfileSeller from "./pages/ProfileSeller.jsx";
import ProfileAdmin from "./pages/ProfileAdmin.jsx";

import ProfileEditAdmin from "./pages/ProfileEditAdmin.jsx";
import ProfileEditNeighbor from "./pages/ProfileEditNeighbor.jsx";
import ProfileEditSeller from "./pages/ProfileEditSeller.jsx";

import Login from "./pages/Login.jsx";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";


//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<ProfileNeighbor />} path="/profileNeighbor" />
            <Route element={<ProfileSeller />} path="/profileSeller" />
            <Route element={<ProfileAdmin />} path="/profileAdmin" />
            <Route
              element={<ProfileEditNeighbor />}
              path="/profileEditNeighbor"
            />
            <Route element={<ProfileEditSeller />} path="/profileEditSeller" />
            <Route element={<ProfileEditAdmin />} path="/profileEditAdminr" />
            <Route element={<Login />} path="/login" />

            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
