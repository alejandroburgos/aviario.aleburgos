import React, { useState, useEffect } from "react";

import { NewPair } from "./NewPair";
import { ListPair } from "./ListPair";


export const Birds = (props) => {
  return (
    <>
        <ListPair user={props.state.user} />
        {/* <NewPair /> */}
    </>
  );
};
