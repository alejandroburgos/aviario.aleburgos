import React, {useState, useEffect} from 'react'
import { Grid, Card, Menu, Button, Box, List, ListItem, TextField, InputAdornment, FormControl, InputLabel, FilledInput, Input, FormHelperText } from "@material-ui/core";
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
        setRevenue(1)
            await fetch(`${constants.urlLocal}revenue`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: props.user,
                    money: 1,
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
        
    };                 
    const postWithdrawal = async () => {
        setSelectedDateWithdrawal(moment(selectedDateWithdrawal).format('DD-MM-YYYY'));
        setWithdrawal(1)
            await fetch(`${constants.urlLocal}withdrawal`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: props.user,
                    money: 1,
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
        
    };  
    
    return (
    <>
    <div className="mb-spacing-6 mt-4">
        <Grid container spacing={6} className="justify-content-center">
        <Grid item lg={4} className="mt-5">
            <Card className="card-box card-box-alt">
                <div className="card-content-overlay text-center pb-4">
                    <div className="d-50 rounded border-0 mb-1 card-icon-wrapper bg-mixed-hopes text-white btn-icon mx-auto text-center shadow-warning">
                         <div className="avatar-icon-wrapper avatar-icon-xl">
                            <div className="avatar-icon rounded">
                                <img src={require("../../assets/images/avatars/avatar_quilis.png")} alt="..." />
                            </div>
                        </div>
                    </div>
                    <div className="font-weight-bold text-black display-3 mt-4 mb-1 ">
                        {/* <TextField type="number" min={0} onChange={(e) => { setWithdrawal(e.target.value) }} value={withdrawal} style={{width: '4em'}}/> */}
                        {/* <FormControl style={{width: '2em'}}>
                            <Input
                                type="number"
                                id="standard-adornment-weight"
                                value={withdrawal}
                                onChange={(e) => { setWithdrawal(e.target.value) }}
                                endAdornment={<InputAdornment position="end">€</InputAdornment>}
                                aria-describedby="standard-weight-helper-text"
                                inputProps={{
                                    'aria-label': 'Gasto',
                                }}
                            />
                            <FormHelperText id="standard-weight-helper-text">Victoria</FormHelperText>
                        </FormControl> */}
                    </div>
                    <div className="font-weight-bold text-black display-3 mt-3 mb-1">
                        <TextField type='date' onChange={(e) => { handleDateChangeWithdrawal(e.target.value)}} value={selectedDateWithdrawal}
                            InputProps={{inputProps: { max: moment().format('YYYY-MM-DD')} }}/>
                    </div>
                    <div>
                        <TextField multiline rowsMax="4" 
                                    className="mt-1" 
                                    placeholder='Concepto' 
                                    style={{width: '80%'}} 
                                    onChange={(e) => { setDescriptionWithdrawal(e.target.value)}} 
                                    value={descriptionWithdrawal}/>
                    </div>
                    {/* <div className="font-size-lg text-dark opacity-8">Añadir dinero</div> */}
                    <div className="divider mx-4 my-4" />
                    <div className="text-center">
                        <Button className="m-2 text-uppercase font-weight-bold font-size-sm"
                        style={{background: 'linear-gradient(to top, #c471f5 0%, #fa71cd 100%)'}}
                         onClick={(e) => {e.preventDefault(); postWithdrawal()}}>
                            <span>Añadir Victoria</span>
                        </Button>
                    </div>
                </div>
            </Card>
        </Grid>
        <Grid item lg={4} className="mt-5">
            <Card className="card-box card-box-alt">
                <div className="card-content-overlay text-center pb-4">
                    <div className="d-50 rounded border-0 mb-1 card-icon-wrapper bg-asteroid text-white btn-icon mx-auto text-center shadow-danger">
                        <div className="avatar-icon-wrapper avatar-icon-xl">
                            <div className="avatar-icon rounded"><img src={require("../../assets/images/avatars/avatar_sawer.png")} alt="..." /></div>
                        </div>
                    </div>
                    {/* <div className="font-weight-bold text-black display-3 mt-4 mb-1">
                        <FormControl style={{width: '2em'}}>
                            <Input
                                type="number"
                                id="standard-adornment-weight"
                                value={revenue}
                                onChange={(e) => { setRevenue(e.target.value) }}
                                endAdornment={<InputAdornment position="end">€</InputAdornment>}
                                aria-describedby="standard-weight-helper-text"
                                inputProps={{
                                    'aria-label': 'Beneficio',
                                }}
                            />
                            <FormHelperText id="standard-weight-helper-text">Beneficio</FormHelperText>
                        </FormControl>                    
                    </div> */}
                    <div className="font-weight-bold text-black display-3 mt-3 mb-1">
                        <TextField type='date' onChange={(e) => { handleDateChangeRevenue(e.target.value)}} value={selectedDateRevenue}
                            InputProps={{inputProps: { max: moment().format('YYYY-MM-DD')} }}
                        />     
                    </div>                    
                    <div>
                        <TextField multiline rowsMax="4" 
                                className="mt-1" 
                                placeholder='Concepto' 
                                style={{width: '80%'}} 
                                onChange={(e) => { setDescriptionRevenue(e.target.value)}} 
                                value={descriptionRevenue}/>
                    </div>
                    <div className="divider mx-4 my-4" />
                    <div className="text-center">
                        <Button style={{background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)', color: 'white'}} className="m-2 text-uppercase font-weight-bold font-size-sm" 
                        onClick={(e) => {e.preventDefault(); postRevenue()}}>
                            <span>Añadir Victoria</span>
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
