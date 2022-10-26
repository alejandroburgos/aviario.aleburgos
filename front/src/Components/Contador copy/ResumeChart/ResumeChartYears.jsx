import React, { useState, useEffect } from 'react'
import Chart from 'react-apexcharts';

import { Grid, Card, Menu, Button, Box, List, ListItem } from "@material-ui/core";
import { Toc } from '@material-ui/icons';
import moment from 'moment';
import { constants } from '../../../Constants';


export const ResumeChartYears = (props) => {
    
    // get localStorage
    const token = localStorage.getItem("token");
    const userData = JSON.parse(token)

    useEffect(() => {
        const url = `${constants.urlLocal}withdrawalMonthly/${userData.user}`;
        props.setLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                props.setArrChartWithdrawal(json);
                props.setLoading(false);
            } catch (error) {
                props.setLoading(true);
            }
        };
        fetchData();
    }, [token, props.withdrawal]);

    useEffect(() => {
        const url = `${constants.urlLocal}revenueMonthly/${userData.user}`;
        props.setLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                props.setArrChartRevenue(json);
                props.setLoading(false);
            } catch (error) {
                props.setLoading(true);
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
            colors: ['#fa71cd', '#0f2027']
        },
        colors: ['#fa71cd', '#0f2027'],
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
            data: props.arrChartWithdrawal && props.arrChartWithdrawal?.data
        },
        {
            name: 'Retiradas',
            data: props.arrChartRevenue && props.arrChartRevenue?.data
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
