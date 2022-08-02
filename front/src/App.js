import React, { useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import "./assets/base.scss";

import { Home } from "./Components/Home.jsx";
import { Login } from "./Components/login/Login";
import HomeIcon from "@material-ui/icons/Home";
import { useEffect } from "react";
import { Header } from "./Components/header/Header";
import { CountPage } from "./Components/Contador/CountPage";

// dont appear nav if login dont have token
export const App = () => {
  // get token localStorage
  const token = localStorage.getItem("token");
  const userData = JSON.parse(token)
  const location = useLocation();
  
  return (
    <>
    
      {location.state && <Header />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contador" element={<CountPage state={userData} />} />
      </Routes>
    </>
  );
};
