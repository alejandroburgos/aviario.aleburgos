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

// dont appear nav if login dont have token
export const App = () => {
  // get token localStorage
  const token = localStorage.getItem("token");
  return (
    <>
      {token && <Navigation token={token} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

const Navigation = ({token}) => {
  return (
    <nav className="sidebar-navigation">
      <ul>
        <li className="active">
          <HomeIcon />
          <span className="tooltip">Home</span>
        </li>
        {/* <li>
        <i className="fa fa-hdd-o"></i>
        <span className="tooltip">Devices</span>
      </li>
      <li>
        <i className="fa fa-newspaper-o"></i>
        <span className="tooltip">Contacts</span>
      </li>
      <li>
        <i className="fa fa-print"></i>
        <span className="tooltip">Fax</span>
      </li>
      <li>
        <i className="fa fa-sliders"></i>
        <span className="tooltip">Settings</span>
      </li> */}
      </ul>
    </nav>
  );
};
