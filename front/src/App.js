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
import "./assets/index.scss";

import { Home } from "./Components/Home.jsx";
import { Login } from "./Components/login/Login";
import { Header } from "./Components/header/Header";
import { CountPage } from "./Components/Contador/CountPage";
import { Birds } from "./Components/Birds/Birds";

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
        <Route path="/crianza-de-pajaros" element={<Birds state={userData}/>} />
      </Routes>
    </>
  );
};
