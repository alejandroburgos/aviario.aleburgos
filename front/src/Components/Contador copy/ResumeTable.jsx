import React, { useState, useEffect } from 'react'
import { InputAdornment, Grid, Card, Menu, Button, Table } from "@material-ui/core";
import Pagination, { usePagination } from '@material-ui/lab/Pagination';

import moment from 'moment';
import {  MoneyOff, AttachMoney, BarChartOutlined, TramSharp, DeleteTwoTone } from '@material-ui/icons';
import { ModalDeleteMoney } from './Modal/ModalDeleteMoney';

export const ResumeTable = (props) => {

    const handleClick = event => {
        // if mode is chart, change to table
        if (props.modeCard === "chart") {
            props.setModeCard("table");
        } else {
            props.setModeCard("chart");
        }
    };

    const [modal2, setModal2] = useState(false);
    const [idDeleteMoney, setIdDeleteMoney] = useState({
        id: 0,
        type: ""
    })

    const toggle2 = (e, data) =>{
        setIdDeleteMoney(data)
        setModal2(!modal2)
    };

    let [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(12);

    const _DATA = usePagination(props.dataMoney, perPage);
    
    
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
                <div className="table-responsive-md pt-4 px-4">
                    {props.dataMoney?.length > 0 ? 
                    <Table className="table table-alternate-spaced text-nowrap mb-0">
                        <thead className="bg-white font-size-sm text-uppercase">
                            <tr>
                                <th className="bg-white text-left px-4">Personaje</th>
                                <th className="bg-white text-center">Fecha</th>
                                {/* <th className="bg-white text-center">Victoria</th> */}
                                <th className="bg-white text-center">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                        {props.dataMoney && props.dataMoney.map((data, i) => {
                            return (
                                <>
                                    <tr key={i}>
                                        <td className="px-4">
                                            <div className="d-flex align-items-center">
                                                <div className={`d-30 text-white d-flex align-items-center justify-content-center rounded-pill mr-3 ${data?.type === 'revenue' ? 'bg-success' : 'bg-danger'}`}>
                                                    {data?.type === 'revenue' ? 
                                                    <div className="d-50 rounded border-0 mb-1 card-icon-wrapper bg-asteroid text-white btn-icon mx-auto text-center shadow-danger">
                                                        <div className="avatar-icon-wrapper avatar-icon-xl">
                                                            <div className="avatar-icon rounded">
                                                                <img src={require("../../assets/images/avatars/avatar_sawer.png")} alt="..." />
                                                            </div>
                                                        </div>
                                                    </div> : 
                                                    <div className="avatar-icon-wrapper avatar-icon-xl">
                                                        <div className="avatar-icon rounded">
                                                            <img src={require("../../assets/images/avatars/avatar_quilis.png")} alt="..." />
                                                        </div>
                                                    </div>}
                                                </div>
                                                <div>
                                                <div className={`px-4 py-1 h-auto border-1 
                                                    ${data?.type === 'revenue' ? 'text-success border-success badge badge-neutral-success' : 'text-danger border-danger badge badge-neutral-danger'}`
                                                    }>{data?.type === 'revenue' ? data.description : data.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <span>{moment(data?.date).format("DD-MM-YYYY HH:mm:ss")}</span>
                                        </td>
                                        
                                        <td className="text-center px-4">
                                            <Button onClick={(e) => toggle2(e, data)} className="btn-danger m-2">
                                                <DeleteTwoTone />
                                            </Button>
                                        </td>
                                    </tr>
                                </>
                            )
                        })} 
                        </tbody>
                        {idDeleteMoney && <ModalDeleteMoney toggle={toggle2} modal={modal2} idDeleteMoney={idDeleteMoney} setRevenue={props.setRevenue} setWithdrawal={props.setWithdrawal} />}

                    </Table> : <div className="text-center">No hay datos</div>}
                </div>
                <div className="p-4 d-flex justify-content-center">
                    { props.dataMoney?.length > 0 && <Pagination className="pagination-primary" count={10} />}
                </div>
            </Card>
        </div>

        </>
    )
}
