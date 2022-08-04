import React, { useState, useEffect } from 'react'
import Chart from 'react-apexcharts';
import hero2 from './../../../assets/images/hero-bg/hero-2.jpg';

import { Grid, Card, Menu, Button, Box, List, ListItem } from "@material-ui/core";
import { Toc } from '@material-ui/icons';
import moment from 'moment';
import { constants } from '../../../Constants';


export const ResumeChartYears = (props) => {

    let sumRevenue = 0;
    let sumWithdrawal = 0;
    
    const [loading, setLoading] = useState(false)
    const [getWithdrawalMonthly, setGetWithdrawalMonthly] = useState({monthlyReport: [0]})
    const [getRevenueMonthly, setGetRevenueMonthly] = useState({monthlyReport: [0]})
    // get localStorage
    const token = localStorage.getItem("token");
    const userData = JSON.parse(token)

    useEffect(() => {
        const url = `${constants.urlLocal}withdrawalMonthly/${userData.user}`;
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
        const url = `${constants.urlLocal}revenueMonthly/${userData.user}`;
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
                        {/* <div className="font-weight-bold font-size-lg mt-4 mb-2 text-black">
                            Mensualmente
                        </div> */}
                        <Chart options={chartDashboardMonitoring3AOptions} series={chartDashboardMonitoring3AData} type="bar" height={218} />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}
