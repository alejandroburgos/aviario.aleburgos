import React, { useState } from 'react'
import { Dialog, Button} from "@material-ui/core";
import { Close, DeleteTwoTone } from '@material-ui/icons';
import { constants } from '../../../Constants';
export const ModalDeleteCategory = (props) => {

  return (
    <>    
        <Dialog open={props.modal} onClose={props.toggle} classes={{ paper: 'modal-content rounded border-0 bg-white p-3 p-xl-0' }}>
        <div className="text-center p-5">
            <div className="avatar-icon-wrapper rounded-circle m-0">
                <div className="d-inline-flex justify-content-center p-0 rounded-circle btn-icon avatar-icon-wrapper bg-neutral-danger text-danger m-0 d-130">
                    <DeleteTwoTone />
                </div>
            </div>
            <h4 className="font-weight-bold mt-4">¿Seguro que quieres eliminar esta categoría?</h4>
            <p className="mb-0 font-size-lg text-muted">No podrás deshacer esta acción</p>
            <div className="pt-4">
                <Button onClick={props.toggle} className="btn-neutral-secondary btn-pill mx-1">
                    <span className="btn-wrapper--label">
                        Cancelar
                    </span>
                </Button>
                <Button onClick={props.deleteCategory} className="btn-danger btn-pill mx-1">
                    <span className="btn-wrapper--label">
                        Eliminar
                    </span>
                </Button>
            </div>
        </div>
    </Dialog>
    </>
  )
}
