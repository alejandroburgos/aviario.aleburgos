import { Badge, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemText } from '@material-ui/core';
import { AdjustOutlined } from '@material-ui/icons';

import React, { useState } from 'react'
import { constants } from '../../../Constants';

export const Updates = (props) => {

    
    const handleClose3 = () => {
        props.setModalUpdates(false);
    };
    const readUpdate = async () => {
        await fetch(`${constants.urlLocal}readUpdate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: props.state.user,
                token: props.state.token,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if(data.ok){
                    props.setRead_update(data.read_update)
                    handleClose3()
                }
            });
    };
    return (
        <div>
            <Dialog
                open={props.modal}
                onClose={handleClose3}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Actualizaciones de la aplicación <br />
                <small>a 12 de Agosto de 2022</small>

                </DialogTitle>
                <DialogContent dividers={'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        tabIndex={-1}
                    >
                        <List component="div" className="list-group-flush mb-2">
                            <ListItem className="py-3 border-0">
                                    <div className="align-box-row w-100">
                                        <div>
                                            <div className="font-weight-bold d-block opacity-8">General</div>
                                            <div className="text-dark opacity-5 mt-2">
                                                Añadido alertas cuando se añade o elimina algun elemento
                                            </div>
                                        </div>
                                    </div>
                                </ListItem>
                                <ListItem className="py-3 border-0">
                                    <div className="align-box-row w-100">
                                        <div>
                                            <div className="font-weight-bold d-block opacity-8">Crianza de pájaros</div>
                                            <div className="text-dark opacity-5 mt-2">
                                                Se ha añadido la opción de subir una foto <br />
                                                Se ha añadido la el campo de <i>Nº de isabelita</i>
                                            </div>
                                        </div>
                                    </div>
                                </ListItem>
                                <ListItem className="py-3 border-0">
                                    <div className="align-box-row w-100">
                                        <div>
                                            <div className="font-weight-bold d-block opacity-8">Calendario <Badge className='m-1 badge badge-success'>Nuevo</Badge> </div>
                                            <div className="text-dark opacity-5 mt-2">
                                                Añadido en el menú una nueva funcionalidad de Calendario para llevar el control de todo los tratamientos 
                                                <br /> <Badge className='m-1 badge badge-warning'>en desarollo, no está funcional</Badge>
                                            </div>
                                        </div>
                                    </div>
                                </ListItem>
                        </List>
                            </DialogContentText>
                </DialogContent>
                <DialogActions className="bg-secondary p-4">
                    <Button onClick={readUpdate} className="btn-success">
                        Recibido
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
