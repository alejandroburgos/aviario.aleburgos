import React from 'react'
import { Avatar, Button, Dialog, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import { FiberManualRecord } from '@material-ui/icons'
import { SwatchesPicker } from 'react-color';

export const ModalColor = (props) => {
    const handleClose = () => {
        props.setOpen(false);
    }
  return (
    <div>
        <Dialog onClose={props.handleClose} fullWidth maxWidth="md" classes={{ paper: 'modal-content rounded-lg' }} 
                aria-labelledby="simple-dialog-title" open={props.open}>
            <div className="p-3 font-size-xl font-weight-bold">Color</div>
            <Divider />
            <List>
            <div style={{width: '100%', height: '100%'}}>
                <SwatchesPicker value={props.color} onChange={props.handleChange}/>
            </div>

                <div className="table-responsive-md">
                <ListItem>
                    {props.color.length > 0 && <small>Click en el color para eliminar:</small>}
                    {props.color.length > 0 && props.color.map((color) => {
                        return (
                            <>
                                <ListItem 
                                    // delete onclick from array on click
                                    onClick={() => { 
                                        props.setColor(props.color.filter((item) => item !== color))
                                    }}
                                    style={{cursor: 'pointer'}}
                                >
                                    <FiberManualRecord style={{
                                        color: color, 
                                        border: color === '#ffffff' && '1px solid black', 
                                        borderRadius: color === '#ffffff' &&  '100%'
                                    }} />
                                </ListItem>
                            </>
                        )
                    })}
                </ListItem>
                    </div>
            </List>
            <Divider />
            <div className="d-flex justify-content-end p-3">
                <Button onClick={handleClose} variant="contained" color="primary">
                    Cerrar
                </Button>
            </div>
        </Dialog>
    </div>
  )
}