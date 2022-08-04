import React, { useState, useEffect } from 'react'
import Chart from 'react-apexcharts';
import { styled } from '@mui/material/styles';

import { Grid, TextField, Button, Menu, CardContent } from "@material-ui/core";
import moment from 'moment';
import { constants } from '../../../Constants';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { parseISO } from 'date-fns';
import endOfWeek from 'date-fns/endOfWeek';
import isSameDay from 'date-fns/isSameDay';
import isWithinInterval from 'date-fns/isWithinInterval';
import startOfWeek from 'date-fns/startOfWeek';

const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) =>
      prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
  })(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
    ...(dayIsBetween && {
      borderRadius: 0,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      '&:hover, &:focus': {
        backgroundColor: theme.palette.primary.dark,
      },
    }),
    ...(isFirstDay && {
      borderTopLeftRadius: '50%',
      borderBottomLeftRadius: '50%',
    }),
    ...(isLastDay && {
      borderTopRightRadius: '50%',
      borderBottomRightRadius: '50%',
    }),
  }));

export const ResumeChartWeekly = (props) => {

    const [loading, setLoading] = useState(false)
    const [getWithdrawalMonthly, setGetWithdrawalMonthly] = useState({monthlyReport: [0]})
    const [getRevenueMonthly, setGetRevenueMonthly] = useState({monthlyReport: [0]})
    // get localStorage
    const token = localStorage.getItem("token");
    const userData = JSON.parse(token)

    const [value, setValue] = React.useState(new Date());

    const start = startOfWeek(value);
    const end = endOfWeek(value);

    const [anchorElMenu1, setAnchorElMenu1] = useState(null);
    const handleClickMenu1 = event => {setAnchorElMenu1(event.currentTarget);};
    const handleCloseMenu1 = () => {setAnchorElMenu1(null);};

    useEffect(() => {
        const url = `${constants.urlLocal}withdrawalWeekly/${userData.user}/${moment(start).format('MM-DD-YYYY')}&&${moment(end).format('MM-DD-YYYY')}`;
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
    }, [value, props.withdrawal]);

    useEffect(() => {
        const url = `${constants.urlLocal}revenueWeekly/${userData.user}/${moment(start).format('MM-DD-YYYY')}&&${moment(end).format('MM-DD-YYYY')}`;
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
    }, [value, props.revenue]);


    const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
      if (!value) {
        return <PickersDay {...pickersDayProps} />;
      }
  
      const dayIsBetween = isWithinInterval(date, { start, end });
      const isFirstDay = isSameDay(date, start);
      const isLastDay = isSameDay(date, end);
  
      return (
        <CustomPickersDay
          {...pickersDayProps}
          disableMargin
          dayIsBetween={dayIsBetween}
          isFirstDay={isFirstDay}
          isLastDay={isLastDay}

        />
      );
    };
  

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
        labels: getWithdrawalMonthly.range,
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
            data: !loading && getWithdrawalMonthly && getWithdrawalMonthly?.data
        },
        {
            name: 'Retiradas',
            data: !loading && getRevenueMonthly && getRevenueMonthly?.data
        }
    ]

    // concat 
    return (
        <>
            <div >
                <Grid container spacing={0}>
                    <Grid item sm={12} md={12} xl={12}>
                        <div className="font-weight-bold font-size-lg mt-4 mb-2 text-black">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Button className="btn-outline-primary" onClick={handleClickMenu1}>
                                {moment(start).format('DD-MM-YYYY') + ' || ' + moment(end).format('DD-MM-YYYY')}
                            </Button>
                            <Menu
                                anchorEl={anchorElMenu1}
                                keepMounted
                                open={Boolean(anchorElMenu1)}
                                onClose={handleCloseMenu1} classes={{ list: 'p-0' }}
                                getContentAnchorEl={null}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}>
                            <div className="dropdown-menu-xl p-0">
                                <CardContent className="p-0">
                                    <StaticDatePicker
                                        displayStaticWrapperAs="desktop"
                                        label="Week picker"
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        minDate={parseISO(moment().subtract(3, 'year').format('YYYY-MM-DD'))}
                                        maxDate={parseISO(moment().format('YYYY-MM-DD'))}
                                        renderDay={renderWeekPickerDay}
                                        renderInput={(params) => <TextField {...params} helperText={null} />}
                                        inputFormat="'Week of' MMM d"
                                    />    
                                    <div className="divider mt-4"/>
                                    <div className="text-center py-4">
                                        <Button size="small" className="btn-primary" onClick={handleCloseMenu1}>
                                            <span className="btn-wrapper--label">
                                                Cerrar
                                            </span>
                                        </Button>
                                    </div>
                                </CardContent>
                            </div>
                            </Menu>               
                            </LocalizationProvider>
                        </div>
                        <Chart options={chartDashboardMonitoring3AOptions} series={chartDashboardMonitoring3AData} type="bar" height={218} />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}
