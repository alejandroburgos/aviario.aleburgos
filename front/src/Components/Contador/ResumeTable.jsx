import React, { useState, useEffect } from 'react'
import { InputAdornment, Grid, Card, Menu, Button, FormControl, List, ListItem, Table, Select, InputLabel, MenuItem, TextField } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';

import moment from 'moment';
import {  MoneyOff, AttachMoney, BarChartOutlined } from '@material-ui/icons';

export const ResumeTable = (props) => {

    const [anchorEl, setAnchorEl] = useState(null);

    const [anchorElFilter, setAnchorElFilter] = useState(null);

    const handleClick = event => {
        // if mode is chart, change to table
        if (props.modeCard === "chart") {
            props.setModeCard("table");
        } else {
            props.setModeCard("chart");
        }
    };

    const handleCloseFilter = () => {
        setAnchorElFilter(null);
    };

    const [status, setStatus] = useState('');

    const handleStatus = event => {
        setStatus(event.target.value);
    };

    const [type, setType] = useState('');

    const handleType = event => {
        setType(event.target.value);
    };


    const [searchOpen, setSearchOpen] = useState(false);

    const openSearch = () => setSearchOpen(true);
    const closeSearch = () => setSearchOpen(false);

    return (
        <>
            <div className="mb-spacing-6">

            <Card className="card-box mb-spacing-6">
                <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-4">
                    <div>
                        <h6 className="font-weight-bold font-size-lg mb-0 text-black">Tabla</h6>
                    </div>
                    <div className="d-flex align-items-center">
                        <div>
                            <Button onClick={handleClick} variant="text" className="btn-outline-primary d-flex align-items-center justify-content-center d-40 mr-2 p-0 rounded-pill">
                                <BarChartOutlined className="w-50" />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="divider" />
                <div className="pt-4 px-4">
                    {props.dataMoney.length > 0 ? <Table className="table table-alternate-spaced text-nowrap mb-0">
                        <thead className="bg-white font-size-sm text-uppercase">
                            <tr>
                                <th className="bg-white text-left px-4">Tipo</th>
                                <th className="bg-white text-center">Fecha</th>
                                <th className="bg-white text-center">Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                        {props.dataMoney && props.dataMoney.map((data) => {
                            return (
                                <>
                                    <tr>
                                        <td className="px-4">
                                            <div className="d-flex align-items-center">
                                                <div className={`d-30 text-white d-flex align-items-center justify-content-center rounded-pill mr-3 ${data.type === 'revenue' ? 'bg-success' : 'bg-danger'}`}>
                                                {data.type === 'revenue' ? <AttachMoney /> : <MoneyOff />}
                                                </div>
                                                <div>
                                                <div className={`px-4 py-1 h-auto border-1 
                                                    ${data.type === 'revenue' ? 'text-success border-success badge badge-neutral-success' : 'text-danger border-danger badge badge-neutral-danger'}`
                                                    }>{data.type === 'revenue' ? 'Retirada a banco' : 'Ingresos'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <span>{moment(data.date).format("DD-MM-YYYY HH:mm:ss")}</span>
                                        </td>
                                        <td className="text-right px-4">
                                            <div className={`font-size-lg pr-2  ${data.type === 'revenue' ? 'text-success ' : 'text-danger'}`}>{data.money}€</div>
                                            {/* <div className="text-black-50 pr-2">- 26,349 USD</div> */}
                                        </td>
                                    </tr>
                                </>
                            )
                        })} 
                        </tbody>
                    </Table> : <div className="text-center">No hay datos</div>}
                </div>
                <div className="p-4 d-flex justify-content-center">
                  { props.dataMoney.length > 0 && <Pagination className="pagination-primary" count={10} />}
                </div>
            </Card>
        </div>

        </>
    )
}
