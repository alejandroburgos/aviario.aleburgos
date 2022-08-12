import React, { useState, useEffect } from "react";
import { Button, Card, FormControl, Input, InputAdornment, InputLabel, LinearProgress, MenuItem, Select, Table, TextField, Tooltip } from "@material-ui/core";
import { Add, Close, Delete, DeleteSharp, Edit, PlusOneOutlined, SearchSharp, SearchTwoTone } from "@material-ui/icons";
import { NewPair } from "./NewPair";
import { constants } from "../../Constants";
import moment from "moment";
import 'moment/locale/es';
import { ModalDeletePair } from "./Modal/ModalDeletePair";
import { ModalEditPair } from "./Modal/ModalEditPair";
import Pagination from '@material-ui/lab/Pagination';
import usePagination from "../usePagination/usePagination";

    const ITEM_HEIGHT = 24;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 6.5,
                width: 200,
            },
        },
    };

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

    let [page, setPage] = useState(1);
    const PER_PAGE = 5;

    
    const [search, setSearch] = useState("");
    const [filteredPairs, setFilteredPairs] = useState(pairs);
    const count = Math.ceil(filteredPairs.length / PER_PAGE);
    const _DATA = usePagination(filteredPairs, PER_PAGE);
    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };
    useEffect(() => {
        // search numbers
        setFilteredPairs(pairs.filter(pair =>
            pair.numberPair.toString().toLowerCase().includes(search.toLowerCase())
        ));
    }, [search, pairs]);

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
                <div className="search-wrapper">
                    <TextField
                        className="mt-3 ml-4"
                        variant="outlined"
                        placeholder="Nº de parejas ..."
                        size="small"
                        id="input-search"
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchTwoTone />
                                </InputAdornment>
                            ),
                        }}
                    />
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
                        {_DATA.currentData().length > 0 && _DATA.currentData().map((pairs, i) => {

                            return (
                                <>
                                    <tr>
                                        <td className="font-weight-bold">
                                            {pairs.numberPair}
                                        </td>
                                        <td className="text-center">
                                            {pairs.arrPuestasParejas.length > 0 && moment(pairs.arrPuestasParejas[pairs.arrPuestasParejas.length-1]?.iniIncubacion).format('DD/MM/YYYY')}
                                        </td>
                                        <td className="text-center" style={{width: "20em"}}>
                                            {pairs.arrPuestasParejas.length > 0 && moment(pairs.arrPuestasParejas[pairs.arrPuestasParejas.length-1]?.fechNacimiento).format('DD/MM/YYYY')}
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
                <div className="p-4 d-flex justify-content-center">
                    { _DATA.currentData().length > 0 && 
                        <Pagination
                            count={count}
                            className="pagination-first"
                            size="medium"
                            page={page}
                            variant="outlined"
                            shape="rounded"
                            onChange={handleChange}
                        />}
                </div>
            </Card>


        </>
    );
}