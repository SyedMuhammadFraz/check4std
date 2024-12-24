import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import Ribbon from "./Ribbon";
import Footer from "./Footer";

function LandingPage() {
  return (
    <>
      <NavBar />
      <Ribbon/>
      <Outlet />
      <Footer/>
    </>
  );
}

export default LandingPage;
