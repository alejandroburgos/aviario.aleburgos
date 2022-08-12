import { CheckCircleTwoTone } from '@material-ui/icons'
import { Alert, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'

export const Alerts = ({alert, setAlert}) => {

    const vertical = "bottom"
    const horizontal = "center"

    useEffect(() => {
        setTimeout(() => {
            setAlert({ ...alert, open: false });
        }, 7000);
    }, [alert])
    
    const handleClose = () => {
        setAlert({ ...alert, open: false });
    };

  return (
    <div>
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={alert.open}
            classes={{root: 'toastr-' + alert.classes}}
            onClose={handleClose}
            message={alert.message}
        />
    </div>
  )
}
