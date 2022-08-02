import React, {useState, useEffect} from 'react'
import { Grid, Card, Menu, Button, Box, List, ListItem, TextField } from "@material-ui/core";
import {
    MoneyOff,
    AttachMoney
} from "@material-ui/icons";
import moment from 'moment';

export const FormCount = (props) => {
    // post with withdrawal
    const [withdrawal, setWithdrawal] = useState('0')
    const [revenue, setRevenue] = useState('0')

    console.log(withdrawal)
    console.log(revenue)

    const postRevenue = async () => {

        if(revenue > 0) {
            await fetch("http://localhost:3001/revenue", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: props.user,
                    money: revenue,
                    date: moment().format("YYYY-MM-DD HH:mm:ss"),
                    type: "revenue"
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if(data.ok){
                        props.setArrRevenue(data)
                        setRevenue('')
                    }
                });
        }
    };                 
    const postWithdrawal = async () => {

        if(withdrawal > 0) {
            await fetch("http://localhost:3001/withdrawal", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: props.user,
                    money: withdrawal,
                    date: moment().format("YYYY-MM-DD HH:mm:ss"),
                    type: "withdrawal"
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if(data.ok){
                        props.setArrWithdrawal(data)
                        setWithdrawal('')
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
                    <div className="font-weight-bold text-black display-3 mt-4 mb-1">
                        <TextField placeholder='Añadir dinero' onChange={(e) => { setWithdrawal(e.target.value)}} value={withdrawal}/>
                    </div>
                    {/* <div className="font-size-lg text-dark opacity-8">Añadir dinero</div> */}
                    <div className="divider mx-4 my-4" />
                    <div className="text-center">
                        <Button className="p-0 text-uppercase btn-link-danger font-weight-bold font-size-sm btn-link" variant="text" onClick={(e) => {e.preventDefault(); postWithdrawal()}}>
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
                        <TextField placeholder='Retirar dinero' onChange={(e) => { setRevenue(e.target.value)}} value={revenue}/>
                    </div>
                    {/* <div className="font-size-lg text-dark opacity-8">Retirada</div> */}
                    <div className="divider mx-4 my-4" />
                    <div className="text-center">
                        <Button className="p-0 text-uppercase btn-link-success font-weight-bold font-size-sm btn-link" variant="text" onClick={(e) => {e.preventDefault(); postRevenue()}}>
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
