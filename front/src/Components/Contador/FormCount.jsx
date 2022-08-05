import React, {useState, useEffect} from 'react'
import { Grid, Card, Menu, Button, Box, List, ListItem, TextField } from "@material-ui/core";
import {
    MoneyOff,
    AttachMoney
} from "@material-ui/icons";
import moment from 'moment';
import { constants } from '../../Constants';

export const FormCount = (props) => {
    // post with withdrawal
    const [withdrawal, setWithdrawal] = useState('0')
    const [revenue, setRevenue] = useState('0')

    const [selectedDateRevenue, setSelectedDateRevenue] = useState(moment().format('yyyy-MM-DD'));
    const [selectedDateWithdrawal, setSelectedDateWithdrawal] = useState(moment().format('yyyy-MM-DD'));

    const [descriptionRevenue, setDescriptionRevenue] = useState('')
    const [descriptionWithdrawal, setDescriptionWithdrawal] = useState('')

    const handleDateChangeRevenue = date => {
        setSelectedDateRevenue(date);
    };
    
    const handleDateChangeWithdrawal = date => {
        setSelectedDateWithdrawal(date);
    };

    const postRevenue = async () => {
        setSelectedDateRevenue(moment(selectedDateRevenue).format('DD-MM-YYYY'));

        if(revenue > 0) {
            await fetch(`${constants.urlLocal}revenue`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: props.user,
                    money: revenue,
                    date: selectedDateRevenue,
                    type: "revenue",
                    description: descriptionRevenue
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if(data.ok){
                        props.setArrRevenue(data)
                        setRevenue('')
                        setDescriptionRevenue('')
                        setSelectedDateRevenue(moment().format('yyyy-MM-DD'))
                    }
                });
        }
    };                 
    const postWithdrawal = async () => {
        setSelectedDateWithdrawal(moment(selectedDateWithdrawal).format('DD-MM-YYYY'));
        if(withdrawal > 0) {
            await fetch(`${constants.urlLocal}withdrawal`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: props.user,
                    money: withdrawal,
                    date: selectedDateWithdrawal,
                    type: "withdrawal",
                    description: descriptionWithdrawal
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if(data.ok){
                        props.setArrWithdrawal(data)
                        setWithdrawal('')
                        setDescriptionWithdrawal('')
                        setSelectedDateWithdrawal(moment().format('yyyy-MM-DD'))
                    }
                });
        }
    };  
    
    return (
    <>
    <div className="mb-spacing-6 mt-4">
        <Grid container spacing={6} className="justify-content-center">
        <Grid item lg={4}>
            <Card className="card-box card-box-alt">
                <div className="card-content-overlay text-center pb-4">
                    <div className="d-50 rounded border-0 mb-1 card-icon-wrapper bg-danger text-white btn-icon mx-auto text-center shadow-danger">
                        <MoneyOff className="display-4" />
                    </div>
                    <div className="font-weight-bold text-black display-3 mt-4 mb-1 ">
                        <TextField type="number" min={0} onChange={(e) => { setWithdrawal(e.target.value) }} value={withdrawal} style={{width: '4em'}}/>
                    </div>
                    <div>
                        <TextField placeholder='Concepto' onChange={(e) => { setDescriptionWithdrawal(e.target.value)}} value={descriptionWithdrawal}/>
                    </div>
                    <div className="font-weight-bold text-black display-3 mt-1 mb-1">
                        <TextField type='date' onChange={(e) => { handleDateChangeWithdrawal(e.target.value)}} value={selectedDateWithdrawal}
                            InputProps={{inputProps: { max: moment().format('YYYY-MM-DD')} }}/>
                    </div>
                    {/* <div className="font-size-lg text-dark opacity-8">Añadir dinero</div> */}
                    <div className="divider mx-4 my-4" />
                    <div className="text-center">
                        <Button className="m-2 text-uppercase btn-neutral-danger font-weight-bold font-size-sm" onClick={(e) => {e.preventDefault(); postWithdrawal()}}>
                            <span>Añadir</span>
                        </Button>
                    </div>
                </div>
            </Card>
        </Grid>
        <Grid item lg={4}>
            <Card className="card-box card-box-alt">
                <div className="card-content-overlay text-center pb-4">
                    <div className="d-50 rounded border-0 mb-1 card-icon-wrapper bg-success text-white btn-icon mx-auto text-center shadow-success">
                        <AttachMoney className="display-4" />
                    </div>
                    <div className="font-weight-bold text-black display-3 mt-4 mb-1">
                        <TextField style={{width: '4em'}} onChange={(e) => { setRevenue(e.target.value)}} value={revenue}/>
                    </div>
                    <div>
                        <TextField className="mt-1" placeholder='Concepto' onChange={(e) => { setDescriptionRevenue(e.target.value)}} value={descriptionRevenue}/>
                    </div>
                    <div className="font-weight-bold text-black display-3 mt-1 mb-1">
                        <TextField type='date' onChange={(e) => { handleDateChangeRevenue(e.target.value)}} value={selectedDateRevenue}
                            InputProps={{inputProps: { max: moment().format('YYYY-MM-DD')} }}
                        />     
                    </div>                    
                    <div className="divider mx-4 my-4" />
                    <div className="text-center">
                        <Button className="m-2 text-uppercase btn-neutral-success font-weight-bold font-size-sm" onClick={(e) => {e.preventDefault(); postRevenue()}}>
                            <span>Retirar</span>
                        </Button>
                    </div>
                </div>
            </Card>
        </Grid>
    </Grid>
    </div>

</>
  )
}
