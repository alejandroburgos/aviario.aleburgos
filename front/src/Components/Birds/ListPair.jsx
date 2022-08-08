import React, { useState, useEffect } from "react";
import { Button, Card, LinearProgress, Table, Tooltip } from "@material-ui/core";
import { Add, Close, Delete, DeleteSharp, PlusOneOutlined, SearchSharp } from "@material-ui/icons";
import { NewPair } from "./NewPair";
import { constants } from "../../Constants";
import moment from "moment";
import 'moment/locale/es';

export const ListPair = (props) => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    // fetch getPair
    const [pairs, setPairs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            const fetchData = async () => {
            try {
                const result = await fetch(`${constants.urlLocal}pair/${props.user}`);
                const data = await result.json();
                setPairs(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    // detele pair
    const deletePair = async (id) => {
        try {
            const result = await fetch(`${constants.urlLocal}pair/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await result.json();
            setPairs(data);
        } catch (error) {
            console.log(error);
        }
    }

    // compare iniIncubacion with today and get a number
    const getDays = (iniIncubacion) => {
        const today = new Date();
        const date1 = new Date(iniIncubacion);
        const date2 = new Date(today);
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return diffDays;
    }

    return (
        <>

            <Card className="card-box mb-spacing-6-x2">
                <div className="card-header">
                    <div className="card-header--title font-size-lg">
                        Lista de parejas
                    </div>
                    <div className="card-header--actions">
                        <Tooltip title="Add new">
                            <Button size="small" className="btn-link px-1" onClick={handleClickOpen}>
                                <Add />
                            </Button>
                        </Tooltip>
                        <NewPair open={open} setOpen={setOpen} user={props.user} setPairs={setPairs} />
                        <Tooltip title="Close">
                            <Button size="small" className="btn-link px-1">
                                <Close />
                            </Button>
                        </Tooltip>
                    </div>
                </div>
                <div className="table-responsive-md p-4" >
                    <Table className="table table-hover text-nowrap mb-0 ">
                        <thead>
                        <tr>
                            <th className="text-left" style={{ width: 180 }}>Número de pareja</th>
                            <th className="text-center">Fecha incubacion</th>
                            <th className="text-center">Fecha nacimiento</th>
                            <th className="text-center">Observaciones</th>
                            <th className="text-center"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {pairs.length > 0 && pairs.map((pairs) => {
                            let dynamicMaxValue = 20;
                            let rule = parseInt(getDays(pairs.iniIncubacion) * parseInt(100)) / parseInt(dynamicMaxValue)

                            console.log(rule)

                            return (
                                <>
                                    <tr>
                                        <td className="font-weight-bold">
                                            {pairs.numberPair}
                                        </td>
                                        <td className="text-center">
                                            {moment(pairs.iniIncubacion).format('DD/MM/YYYY')}
                                        </td>
                                        <td className="text-center" style={{width: "20em"}}>
                                            {pairs.fechNacimiento}
                                        </td>
                                        <td className="text-center">
                                            {pairs.observaciones}
                                        </td>
                                        <td className="text-center">
                                            <Button size="small" className="btn-link d-30 p-0 btn-icon btn-animated-icon">
                                                <SearchSharp />
                                            </Button>
                                            <Button size="small" className="btn-link d-30 p-0 btn-icon btn-animated-icon" onClick={()=> deletePair(pairs._id)}>
                                                <Delete  />
                                            </Button>
                                        </td>
                                    </tr>
                                </>
                            )
                        })}
                        </tbody>
                    </Table>
                </div>
                <div className="card-footer py-3 text-center">
                    <Button size="small" className="btn-outline-second" variant="text">
                        ver más
                    </Button>
                </div>
            </Card>


        </>
    );
}