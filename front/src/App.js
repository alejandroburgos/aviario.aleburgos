import React, { useEffect, useState } from "react";
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
import { CountGolf } from "./Components/Contador copy/CountPage";
import { Birds } from "./Components/Birds/Birds";
import { CalendarBirds } from "./Components/Birds/Calendar/CalendarBirds";
import { Updates } from "./Components/Shared/Modal/Updates";

// dont appear nav if login dont have token
export const App = () => {
  // get token localStorage
  const token = localStorage.getItem("token");
  const userData = JSON.parse(token)
  const location = useLocation();
  
  const [read_update, setRead_update] = useState(userData?.read_update)

  const [modalUpdates, setModalUpdates] = useState(false);
  const handleClickOpen = () => {
    setModalUpdates(true);
  };

  useEffect(() => {
    if (read_update === false) {
      handleClickOpen();
    }
  }, [read_update])
  

  return (
    <>
    
      {location.state && <Header state={userData}/>}
      <Updates state={userData} modal={modalUpdates} setModalUpdates={setModalUpdates} setRead_update={setRead_update}/>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contador" element={<CountPage state={userData} />} />
        <Route path="/contador-golf" element={<CountGolf state={userData} />} />
        <Route path="/crianza-de-pajaros" element={<Birds state={userData}/>} />
        <Route path="/calendario" element={<CalendarBirds state={userData}/>} />
      </Routes>
    </>
  );
};
