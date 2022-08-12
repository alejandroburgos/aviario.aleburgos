import React, { useState, useEffect } from "react";

import { NewPair } from "./NewPair";
import { ListPair } from "./ListPair";
import { Alerts } from "../Shared/Alert/Alerts";


export const Birds = (props) => {

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    classes: "",
})

  return (
    <>
        <ListPair user={props.state.user} alert={alert} setAlert={setAlert} />
        <Alerts alert={alert} setAlert={setAlert} />
    </>
  );
};
