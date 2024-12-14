import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

function LandingPage() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default LandingPage;
