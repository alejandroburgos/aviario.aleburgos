import React, { useEffect, useState } from 'react'
import { Dialog, Button, DialogContent, TextField, InputAdornment, DialogActions, DialogTitle, FormControlLabel, Checkbox, Select, MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { CalendarToday } from '@material-ui/icons';
import { LocalizationProvider, MobileDatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AlphaPicker, BlockPicker, ChromePicker, CirclePicker } from 'react-color';

import { constants } from '../../../Constants';
import moment from 'moment';
import 'moment/locale/es';
import es from "date-fns/locale/es";
import { Icon } from '@mui/material';

export const ModalNewEvent = (props) => {

    const [title, setTitle] = useState("");
    const [start, setStart] = useState(moment().toDate());
    const [end, setEnd] = useState(moment().toDate());
    const [color, setColor] = useState("");

    const [categorySelected, setCategorySelected] = useState({
        id: "",
        title: "",
        color: ""
    });

    const handleChangeColor= (color, event) => {
        setColor(color.hex );
    };
    const [checked, setChecked] = useState(true);
    const handleChecked = (checked) => {
        setChecked(checked);
    };

    const handleChange = (event) => {
        setCategorySelected(event.target.value);
        console.log(categorySelected)
        console.log(event)

    };

    const createEvent = async (id) => {
        try {
            const result = await fetch(`${constants.urlLocal}newCalendar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: Math.random().toString(36),
                    user: props.user.user,
                    title: title,
                    start: moment(start).toDate(),
                    end: moment(end).toDate(),
                    allDay:checked,
                    color: categorySelected.color
                })
            });
            const data = await result.json();
            props.setEvents(data.calendar);
            props.toggle();
            props.setAlert({
                open: true,
                message: "Evento creado correctamente",
                classes: "success"
            })
            console.log(props.alert)
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
            <DialogTitle id="scroll-dialog-title">Nuevo evento</DialogTitle>
                <DialogContent className="p-0">
                    <div>
                        <div className="bg-secondary border-0">
                            <div className="card-body px-lg-5 py-lg-5">
                                <div className="mb-3">
                                    <TextField fullWidth
                                        variant="outlined"
                                        size="small"
                                        placeholder="Título ... (Medicinas, etc)"
                                        id="textfield-Título"
                                        label="Título"
                                        onChange={(e) => setTitle(e.target.value)}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <CalendarToday />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <div className="mb-3">
                                <LocalizationProvider dateAdapter={AdapterDateFns}  adapterLocale={es}>
                                    <DatePicker
                                        label="Comienzo"
                                        value={start}
                                        onChange={(newValue) => {
                                            setStart(newValue);
                                        }}
                                        renderInput={(params) => <TextField className="mr-3" {...params} />}
                                    />
                                    <DatePicker
                                        label="Fin"
                                        value={end}
                                        onChange={(newValue) => {
                                            setEnd(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    </LocalizationProvider>
                                </div>
                                {/* <div className="d-flex justify-content-between align-items-center font-size-md">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checked}
                                                onChange={() => handleChecked(!checked)}
                                                value={checked}
                                                color="primary"
                                            />
                                        }
                                        label="Todo el dia"
                                    />
                                </div> */}
                                <div className="justify-content-center">
                                    <Select
                                        fullWidth
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        onChange={handleChange}
                                        value={categorySelected}
                                        label={categorySelected ? categorySelected.title : "Categoría"}
                                    >
                                    <MenuItem value="" disabled>
                                        <ListItemIcon style={{minWidth: "30px"}}>
                                            <div className="badge badge-circle-inner shadow-none mr-1" style={{backgroundColor: `#000`}}>1</div>
                                        </ListItemIcon>
                                        <ListItemText primary="Selecciona categoría"  />
                                    </MenuItem>
                                    {props.categories && props.categories.map((category) => {
                                            return (
                                                    <MenuItem key={category._id} value={category} style={{display: 'flex !important'}} >
                                                        <ListItemIcon style={{minWidth: "30px"}}>
                                                            <div className="badge badge-circle-inner shadow-none mr-1" style={{backgroundColor: `${category.color}`}}>1</div>
                                                        </ListItemIcon>
                                                        <ListItemText primary={category.title} />
                                                    </MenuItem>
                                            )
                                    })}
                                </Select>
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
