import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home.jsx";
import ProfileNeighbor from "./pages/profiles/Neighbor.jsx";
import ProfileSeller from "./pages/profiles/Seller.jsx";
import ProfileAdmin from "./pages/profiles/Admin.jsx";
import Business from "./pages/Business.jsx";

import ProfileEditAdmin from "./pages/editProfiles/Admin.jsx";
import ProfileEditNeighbor from "./pages/editProfiles/Neighbor.jsx";
import ProfileEditSeller from "./pages/editProfiles/Seller.jsx";

import Directory from "./pages/directory/Directory.jsx";

import Recommendations from "./pages/recommendations/Recommendations.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/register.jsx";
import Shop from "./pages/Shop.jsx"
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar.jsx";
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
            <Route element={<ProfileNeighbor />} path="/profileNeighbor/:id" />
            <Route element={<ProfileSeller />} path="/profileSeller/:id" />
            <Route element={<ProfileAdmin />} path="/profileAdmin/:id" />
            <Route
              element={<ProfileEditNeighbor />}
              path="/profileEditNeighbor" />
            <Route element={<ProfileEditSeller />} path="/profileEditSeller" />
            <Route element={<ProfileEditAdmin />} path="/profileEditAdmin" />
            <Route element={<Recommendations />} path="/recommendations" />
            <Route element={<Login />} path="/login" />
            <Route element={<Directory />} path="/directory" />
            <Route element={<Register />} path="/register" />
            <Route element={<Shop />} path="seller/:seller_id/shop/:business_id" />
            <Route element={<Business />} path="/business" />

            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
