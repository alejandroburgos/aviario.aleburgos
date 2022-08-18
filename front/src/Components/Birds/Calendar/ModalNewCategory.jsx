import React, { useState } from 'react'
import { Dialog, Button, DialogContent, TextField, InputAdornment, DialogActions, DialogTitle, FormControlLabel, Checkbox } from "@material-ui/core";
import { CalendarToday, Category } from '@material-ui/icons';
import { LocalizationProvider, MobileDatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AlphaPicker, BlockPicker, ChromePicker, CirclePicker } from 'react-color';

import { constants } from '../../../Constants';
import moment from 'moment';
import 'moment/locale/es';
import es from "date-fns/locale/es";

export const ModalNewCategory = (props) => {

    const [title, setTitle] = useState("");
    const [color, setColor] = useState("");
    const handleChangeColor= (color, event) => {
        setColor(color.hex );
    };
    
    const createEvent = async (id) => {
        try {
            const result = await fetch(`${constants.urlLocal}newCategory`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: Math.random().toString(36),
                    user: props.user.user,
                    title: title,
                    color: color
                })
            });
            const data = await result.json();
            props.setCategories(data.category);
            props.toggle();
            props.setAlert({
                open: true,
                message: "Categoría creada correctamente",
                classes: "success"
            })
        } catch (error) {
            props.setAlert({
                open: true,
                message: error,
                classes: "danger"
            })
        }
    }

    return (
        <>
            <Dialog open={props.modal} onClose={props.toggle} classes={{ paper: 'modal-content rounded border-0 bg-white p-3 p-xl-0' }}>
            <DialogTitle id="scroll-dialog-title">Nuevo categoría</DialogTitle>
                <DialogContent className="p-0">
                    <div>
                        <div className="bg-secondary border-0">
                            <div className="card-body px-lg-5 py-lg-5">
                                <div className="mb-3">
                                    <TextField fullWidth
                                        variant="outlined"
                                        size="small"
                                        id="textfield-Título"
                                        placeholder="Categoría... (Vitaminas, Alimentos, etc.)"
                                        label="Título"
                                        onChange={(e) => setTitle(e.target.value)}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Category style={{color:`${color}`}} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <div className="p-2">
                                    <CirclePicker className="m-auto" onChangeComplete={handleChangeColor} />
                                </div>
                                <DialogActions className="p-4">
                                    <Button onClick={props.toggle} variant="text" className="bg-white-10 text-white mr-3 shadow-none">
                                        Cancelar
                                    </Button>
                                    <Button onClick={createEvent} className="btn-success shadow-none">
                                        Guardar
                                    </Button>
                                </DialogActions>

                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
