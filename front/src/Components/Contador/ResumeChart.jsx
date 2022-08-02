import React, { useState, useEffect } from 'react'
import Chart from 'react-apexcharts';
import hero2 from './../../assets/images/hero-bg/hero-2.jpg';

import { Grid, Card, Menu, Button, Box, List, ListItem } from "@material-ui/core";
import { Toc } from '@material-ui/icons';
import moment from 'moment';

export const ResumeChart = (props) => {

    let sumRevenue = 0;
    let sumWithdrawal = 0;
    
    const [loading, setLoading] = useState(false)
    const [getWithdrawalMonthly, setGetWithdrawalMonthly] = useState({monthlyReport: [0]})
    const [getRevenueMonthly, setGetRevenueMonthly] = useState({monthlyReport: [0]})
    // get localStorage
    const token = localStorage.getItem("token");
    const userData = JSON.parse(token)

    console.log(props)
    useEffect(() => {
        const url = `http://localhost:3001/api/withdrawalMonthly/${userData.user}`;
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setGetWithdrawalMonthly(json);
                setLoading(false);
            } catch (error) {
                setLoading(true);
            }
        };
        fetchData();
    }, [token, props.withdrawal]);

    useEffect(() => {
        const url = `http://localhost:3001/api/revenueMonthly/${userData.user}`;
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setGetRevenueMonthly(json);
                setLoading(false);
            } catch (error) {
                setLoading(true);
            }
        };
        fetchData();
    }, [token, props.revenue]);

    if(props.revenue.revenue?.length > 0 && props.withdrawal.withdrawal?.length > 0){
        props.revenue.revenue.forEach(element => {
            sumRevenue += element.money;
        }
        )
        props.withdrawal.withdrawal.forEach(element => {
            sumWithdrawal += element.money;
        }
        )
    }

    const handleClick = event => {
        // if mode is chart, change to table
        if (props.modeCard === "chart") {
            props.setModeCard("table");
        } else {
            props.setModeCard("chart");
        }
    };

    const month = Array.apply(0, Array(12)).map(function(_,i){return moment().month(i).format('MMMM')})

    const chartDashboardMonitoring3AOptions = {
        chart: {
            toolbar: {
                show: false
            },
            sparkline: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        labels: month,
        fill: {
            opacity: 0.85,
            colors: ['#ac0616', '#16a136']
        },
        colors: ['#ac0616', '#16a136'],
        legend: {
            show: false
        },
        grid: {
            strokeDashArray: '5',
            borderColor: 'rgba(125, 138, 156, 0.3)'
        },
        xaxis: {
            crosshairs: {
                width: 1
            }
        },
        yaxis: {
            min: 0
        }
    }

    console.log(getWithdrawalMonthly)
    console.log(getRevenueMonthly)
    
    const chartDashboardMonitoring3AData = [
        {
            name: 'Ingresos',
            data: !loading && getWithdrawalMonthly && getWithdrawalMonthly?.monthlyReport
        },
        {
            name: 'Retiradas',
            data: !loading && getRevenueMonthly && getRevenueMonthly?.monthlyReport
        }
    ]

    // concat 
    return (
        <>
            <div >
                <Grid container spacing={0}>
                    <Grid item sm={12} md={12} xl={12}>
                        <Card className="card-box px-4 pt-4 text-center">
                            <Box className="card-tr-actions">
                                <Button onClick={handleClick} variant="text" className="btn-outline-primary d-flex align-items-center justify-content-center d-40 mr-2 p-0 rounded-pill">
                                    <Toc />
                                </Button>
                            </Box>
                            <div className="card-header-alt">
                                <div className="font-weight-bold font-size-lg mb-0 text-black">
                                    Ganancias / Perdidas
                                </div>
                                <p className="text-black-50">Ganancias y gastos desde principio de año</p>
                            </div>
                            <div className="divider mb-4 mt-3" />
                            <h3 className="mb-0 display-3 mt-1 font-weight-bold">
                                <span className="pr-1">
                                    {sumRevenue - sumWithdrawal}
                                </span>
                                €
                            </h3>
                            <div className="divider my-4" />
                            <Grid container spacing={6}>
                                <Grid item xs={6}>
                                    <span className="opacity-6 pb-2">Current month</span>
                                    <div className="d-flex align-items-center justify-content-center">
                                        <span className="font-weight-bold font-size-lg">
                                            <small className="opacity-6 pr-1">$</small>
                                            46,362
                                        </span>
                                        <div className="badge badge-neutral-danger ml-2 text-danger">-8%</div>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <span className="opacity-6 pb-2">Last year</span>
                                    <div className="d-flex align-items-center justify-content-center">
                                        <span className="font-weight-bold font-size-lg">
                                            <small className="opacity-6 pr-1">$</small>
                                            34,546
                                        </span>
                                        <div className="badge badge-neutral-success text-success ml-2">+13%</div>
                                    </div>
                                </Grid>
                            </Grid>
                            <div className="font-weight-bold font-size-lg mt-4 mb-2 text-black">
                                Mensualmente
                            </div>
                            <Chart options={chartDashboardMonitoring3AOptions} series={chartDashboardMonitoring3AData} type="bar" height={218} />
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}
