import { Button, Dialog } from "@material-ui/core";
import { DeleteForeverOutlined } from "@material-ui/icons";
import React, { useState, useEffect } from "react";

export const ModalDeleteNewPuesta = (props) => {

    const deleteNewPuesta = () => {
        props.setArrPuestasPareja(props.arrPuestasPareja.filter((item) => item.id !== props.id))
        props.toggle();
    }

  return (
    <div>
         <Dialog open={props.modal} onClose={props.toggle} classes={{ paper: 'shadow-lg rounded' }}>
            <div className="text-center p-5">
                <div className="avatar-icon-wrapper rounded-circle m-0">
                    <div className="d-inline-flex justify-content-center p-0 rounded-circle btn-icon avatar-icon-wrapper bg-neutral-danger text-danger m-0 d-130">
                        <DeleteForeverOutlined />
                    </div>
                </div>
                <h4 className="font-weight-bold mt-4">¿Seguro que quieres eliminar esta puesta?</h4>
                <p className="mb-0 font-size-lg text-muted">No podrás deshacer esta operación</p>
                <div className="pt-4">
                    <Button onClick={props.toggle} className="btn-neutral-secondary btn-pill mx-1">
                        <span className="btn-wrapper--label">
                            Cancelar
                        </span>
                    </Button>
                    <Button onClick={deleteNewPuesta} className="btn-danger btn-pill mx-1">
                        <span className="btn-wrapper--label">
                            Eliminar
                        </span>
                    </Button>
                </div>
            </div>
        </Dialog>
    </div>
  )
}
