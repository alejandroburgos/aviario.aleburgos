import React, { useState, useEffect } from "react";
import { Button, Card, LinearProgress, Table, Tooltip } from "@material-ui/core";
import { Add, Close, Delete, DeleteSharp, Edit, PlusOneOutlined, SearchSharp } from "@material-ui/icons";
import { NewPair } from "./NewPair";
import { constants } from "../../Constants";
import moment from "moment";
import 'moment/locale/es';
import { ModalDeletePair } from "./Modal/ModalDeletePair";
import { ModalEditPair } from "./Modal/ModalEditPair";

export const ListPair = (props) => {

    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [idForEdit, setIdForEdit] = useState()
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClickOpenEdit = (id) => {
        setOpenEdit(true);
        setIdForEdit(id);
      };

      
    const [modalDelete, setModalDelete] = useState(false)
    const [idForDelete, setIdForDelete] = useState()
    const toggleModalDelete = (id) => {
        setIdForDelete(id)
        setModalDelete(!modalDelete)
    }
  
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
                    </div>
                </div>
                <div className="table-responsive-md p-4" >
                    <Table className="table table-hover text-nowrap mb-0 ">
                        <thead>
                        <tr>
                            <th className="text-left" style={{ width: 180 }}>Número de pareja</th>
                            <th className="text-center">Inicio incubacion</th>
                            <th className="text-center">Fecha nacimiento</th>
                            <th className="text-center">Observaciones</th>
                            <th className="text-center"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {pairs.length > 0 && pairs.map((pairs, i) => {
                            return (
                                <>
                                    <tr>
                                        <td className="font-weight-bold">
                                            {pairs.numberPair}
                                        </td>
                                        <td className="text-center">
                                            {pairs.arrPuestasParejas.length > 0 && moment(pairs.arrPuestasParejas[0]?.iniIncubacion).format('DD/MM/YYYY')}
                                        </td>
                                        <td className="text-center" style={{width: "20em"}}>
                                        {pairs.arrPuestasParejas.length > 0 && moment(pairs.arrPuestasParejas[0]?.iniIncubacion).format('DD/MM/YYYY')}
                                        </td>
                                        <td className="text-center">
                                            {pairs.observaciones}
                                        </td>
                                        <td className="text-center">
                                            <Button size="small" className="btn-link d-30 p-0 btn-icon btn-animated-icon" onClick={() => handleClickOpenEdit(pairs._id)}>
                                                <Edit />
                                            </Button>
                                            <Button size="small" className="btn-link d-30 p-0 btn-icon btn-animated-icon" onClick={() => toggleModalDelete(pairs._id)}>
                                                <Delete  />
                                            </Button>
                                        </td>
                                    </tr>
                                </>
                            )
                        })}
                        <ModalDeletePair setPairs={setPairs} toggle={toggleModalDelete} modal={modalDelete} user={props.user} id={idForDelete} />
                        <ModalEditPair setPairs={setPairs} open={openEdit} setOpen={setOpenEdit} user={props.user} id={idForEdit} />
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