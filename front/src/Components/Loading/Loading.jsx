import React, { useState, useEffect } from "react";
import { Backdrop, Button, CircularProgress } from "@material-ui/core";
export const Loading = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        onClick={handleClose}
        style={{zIndex: 99999}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
