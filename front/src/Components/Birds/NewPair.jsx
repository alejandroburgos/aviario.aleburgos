import React, { useState, useEffect } from "react";
import {
    Button,
    Card,
    Dialog,
    DialogActions,
    Divider,
    Grid,
    ListItem,
    Slide,
    Table,
    TextField,
    Tooltip,
} from "@material-ui/core";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ModalColor } from "./ModalColor";
import moment from "moment";



export const NewPair = (props) => {
    const [numberPair, setNumberPair] = useState();

    const [anillaMale, setAnillaMale] = useState("");
    const [yearMale, setYearMale] = useState(moment().format("DD/MM/YYYY"));
    const [colorMale, setColorMale] = useState([]);
    const [procedencyMale, setProcedencyMale] = useState("");
    const [notesMale, setNotesMale] = useState("");

    const [anillaFemale, setAnillaFemale] = useState("");
    const [yearFemale, setYearFemale] = useState(moment().format("DD/MM/YYYY"));
    const [colorFemale, setColorFemale] = useState([]);
    const [procedencyFemale, setProcedencyFemale] = useState("");
    const [notesFemale, setNotesFemale] = useState("");

    const [generalNotes, setGeneralNotes] = useState("");

    const [puestas, setPuestas] = useState()
    const [numHuevos, setNumHuevos] = useState()
    const [iniIncubacion, setIniIncubacion] = useState()
    const [huevosClaros, setHuevosClaros] = useState()
    const [fechNacimiento, setFechNacimiento] = useState()
    const [numAnillas, setNumAnillas] = useState()
    const [observaciones, setObservaciones] = useState()

    const handleChangeMaleColor = (color) => {
        // set array of color hex
        setColorMale((prevState) => [...prevState, color.hex]);
    };

    const handleChangeFemaleColor = (color) => {
        // set array of color hex
        setColorFemale((prevState) => [...prevState, color.hex]);
    };

    // create modal instance
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('male')

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    // create fetch post newPair
    const createPair = () => {
        // create object to send
        const data = {
            user: props.user,
            numberPair,
            anillaMale,
            yearMale,
            colorMale,
            procedencyMale,
            notesMale,
            anillaFemale,
            yearFemale,
            colorFemale,
            procedencyFemale,
            notesFemale,
            generalNotes,
            puestas,
            numHuevos,
            iniIncubacion,
            huevosClaros,
            fechNacimiento,
            numAnillas,
            observaciones,
        };
        // send data to server
        fetch("http://localhost:3001/api/newPair", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                props.setPairs(data.pair);
                console.log(data);
            }
            // if error
            ).catch((err) => {
                console.log(err);
            }
            // if success
            );
    }


    return (
        <>
            <Dialog open={props.open} onClose={() => props.setOpen(false)} maxWidth={'lg'}>
                <div className="p-3 font-size-xl font-weight-bold">Nueva pareja</div>
                <hr />
                    <div style={{ textAlign: "center" }}>
                        <TextField
                            label="Pareja número"
                            variant="standard"
                            value={numberPair}
                            onChange={(e) => setNumberPair(e.target.value)}
                        />
                    </div>
                    <Grid container spacing={0} className="p-4">
                        <Grid item sm={12} md={12} xl={12} className="pt-3">
                            <div className="divider-v divider-v-md" />
                            <Grid container spacing={0} className="mt-2">
                                <Grid item sm={6} className="mt-4">
                                    <div className="ml-4">
                                        <h3 className="border-bottom text-center">MACHO</h3>
                                        <div className="mt-4 line-height-sm d-flex">
                                            <TextField
                                                label="Anilla"
                                                variant="outlined"
                                                value={anillaMale}
                                                onChange={(e) => setAnillaMale(e.target.value)}
                                            />
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    views={["year"]}
                                                    label="Año"
                                                    value={yearMale}
                                                    onChange={(newValue) => {
                                                        setYearMale(newValue);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            style={{ width: "8em" }}
                                                            className="ml-2"
                                                            variant="outlined"
                                                            helperText={null}
                                                        />
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                        <div className="mt-4 line-height-sm d-flex">
                                            <TextField
                                                label="Procedencia"
                                                variant="outlined"
                                                value={procedencyMale}
                                                onChange={(e) => setProcedencyMale(e.target.value)}
                                            />
                                            <TextField
                                                className="ml-2"
                                                onClick={() => {
                                                    handleOpen();
                                                    setType("male");
                                                }}
                                                //   label="Color"
                                                variant="outlined"
                                                value={
                                                    colorMale.length > 0 ? colorMale.join(", ") : "Color"
                                                }
                                                style={{ width: "11em" }}
                                            />
                                            
                                        </div>

                                        <div className="mt-4 line-height-sm">
                                            <TextField
                                                variant="outlined"
                                                fullWidth
                                                id="standard-multiline-flexible"
                                                label="Notas ..."
                                                multiline
                                                maxRows="4"
                                                value={notesMale}
                                                onChange={(e) => setNotesMale(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </Grid>

                                {/**************************  HEMBRA **************************************/}

                                <Grid item sm={6} className="mt-4 line-height-sm">
                                    <div className="ml-4">
                                        <h3 className="border-bottom text-center">HEMBRA</h3>
                                        <div className="mt-4 line-height-sm d-flex">
                                            <TextField
                                                label="Anilla"
                                                variant="outlined"
                                                value={anillaFemale}
                                                onChange={(e) => setAnillaFemale(e.target.value)}
                                            />
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    views={["year"]}
                                                    label="Año"
                                                    value={yearFemale}
                                                    onChange={(newValue) => {
                                                        setYearFemale(newValue);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            style={{ width: "8em" }}
                                                            className="ml-2"
                                                            variant="outlined"
                                                            helperText={null}
                                                        />
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                        <div className="mt-4 line-height-sm d-flex">
                                            <TextField
                                                label="Procedencia"
                                                variant="outlined"
                                                value={procedencyFemale}
                                                onChange={(e) => setProcedencyFemale(e.target.value)}
                                            />
                                            <TextField
                                                className="ml-2"
                                                onClick={() => {
                                                    handleOpen();
                                                    setType("female");
                                                }}                                                //   label="Color"
                                                variant="outlined"
                                                value={
                                                    colorFemale.length > 0
                                                        ? colorFemale.join(", ")
                                                        : "Color"
                                                }
                                                style={{ width: "11em" }}
                                            />
                                           {type === "female" ? 
                                                <ModalColor
                                                    color={colorFemale}
                                                    setColor={setColorFemale}
                                                    handleChange={handleChangeFemaleColor}
                                                    open={open}
                                                    setOpen={setOpen}
                                                    onClose={handleClose}
                                                /> :
                                                <ModalColor
                                                    color={colorMale}
                                                    setColor={setColorMale}
                                                    handleChange={handleChangeMaleColor}
                                                    open={open}
                                                    setOpen={setOpen}
                                                    onClose={handleClose}
                                                />
                                            }
                                        </div>

                                        <div className="mt-4 line-height-sm">
                                            <TextField
                                                variant="outlined"
                                                fullWidth
                                                id="standard-multiline-flexible"
                                                label="Notas ..."
                                                multiline
                                                maxRows="4"
                                                value={notesFemale}
                                                onChange={(e) => setNotesFemale(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                            <div className="divider my-3" />
                            <TextField
                                className="mt-4"
                                variant="outlined"
                                fullWidth
                                id="standard-multiline-flexible"
                                label="Notas generales de la pareja ..."
                                multiline
                                maxRows="4"
                                value={generalNotes}
                                onChange={(e) => setGeneralNotes(e.target.value)}
                            />
                            <div className="divider my-3" />
                        </Grid>
                            <Table className="table table-alternate-spaced">
                            <thead>
                                <tr>
                                    <th scope="col">Puestas</th>
                                    <th scope="col">Nº huevos</th>
                                    <th scope="col">Inicio incubación</th>
                                    <th scope="col">Huevos claros</th>
                                    <th scope="col">Fech. Nacimiento</th>
                                    <th scope="col">Nº de Anillas puestas a pollos</th>
                                    <th scope="col">Observaciones</th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="text-center text-black-50">
                                        <TextField type="number" placeholder="Puestas" style={{width: '5em'}} value={puestas} onChange={(e) => setPuestas(e.target.value) } />
                                    </td>
                                    <td>
                                        <TextField type="number" placeholder="Número de huevos" style={{width: '5em'}} value={numHuevos} onChange={(e) => setNumHuevos(e.target.value) } />
                                    </td>
                                    <td>
                                        <TextField type="date" onChange={(e) => setIniIncubacion(e.target.value)} defaultValue={iniIncubacion} />
                                    </td>
                                    <td className="font-size-lg font-weight-bold">
                                        <TextField type="number" placeholder="Huevos claros" style={{width: '5em'}} value={huevosClaros} onChange={(e) => setHuevosClaros(e.target.value) } />
                                    </td>
                                    <td className="text-warning">
                                        <TextField type="date" onChange={(e) => setFechNacimiento(e.target.value)} defaultValue={fechNacimiento} />
                                    </td>
                                    <td className="text-warning">
                                        <TextField type="number" placeholder="Anillas puestas" style={{width: '8em'}} value={numAnillas} onChange={(e) => setNumAnillas(e.target.value) } />
                                    </td>
                                    <td className="text-warning">
                                        <TextField
                                        fullWidth
                                        id="standard-multiline-flexible"
                                        multiline
                                        placeholder="observaciones"
                                        maxRows="4"
                                        value={observaciones}
                                        onChange={(e) => setObservaciones(e.target.value)}
                                    />
                                    </td>
                                   
                                </tr>
                                <tr className="divider"></tr>
                                </tbody>
                            </Table>
                    </Grid>
                <DialogActions>
                    <Button
                        onClick={() => props.setOpen(false)}
                        variant="contained"
                        className="m-2 btn-second"
                    >
                        Cerrar
                    </Button>
                    <Button
                        onClick={createPair}
                        variant="contained"
                        className="m-2 btn-success"
                    >
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
