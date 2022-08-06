import React, { useState } from "react";

import { ResumeChartYears } from "./ResumeChartYears";

import {
  Grid,
  Card,
  Select,
  Button,
  Box,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { Toc } from "@material-ui/icons";

import { ResumeChartMonthly } from "./ResumeChartMonthly";
import { ResumeChartWeekly } from "./ResumeChartWeekly";
import { SumTotalOfMoney } from "../CardDetails/SumTotalOfMoney";
import { Loading } from "../../Loading/Loading";

export const ResumeChart = (props) => {
  const [arrChartRevenue, setArrChartRevenue] = useState([0]);
  const [arrChartWithdrawal, setArrChartWithdrawal] = useState([0]);
  const [loading, setLoading] = useState(true)

  const handleClick = (event) => {
    // if mode is chart, change to table
    if (props.modeCard === "chart") {
      props.setModeCard("table");
    } else {
      props.setModeCard("chart");
    }
  };

  const [selectRange, setSelectRange] = useState("monthly");

  const handleChange = (event) => {
    setSelectRange(event.target.value);
  };

console.log(loading)
  return (
    <div>
      <Grid container spacing={0}>
        <Grid item sm={12} md={12} xl={12}>
          <Card className="card-box px-4 pt-4 text-center">
            <Box className="card-tr-actions">
              <Button
                onClick={handleClick}
                variant="text"
                className="btn-outline-primary d-flex align-items-center justify-content-center d-40 mr-2 p-0 rounded-pill"
              >
                <Toc />
              </Button>
            </Box>
            <div className="card-header-alt">
              <div className="font-weight-bold font-size-lg mb-0 text-black">
                Beneficios / Gastos
              </div>
            </div>
            <div className="divider mb-4 mt-3" />
            <SumTotalOfMoney
                revenue={props.revenue}
                withdrawal={props.withdrawal}
                arrChartRevenue={arrChartRevenue}
                setArrChartRevenue={setArrChartRevenue}
                arrChartWithdrawal={arrChartWithdrawal}
                setArrChartWithdrawal={setArrChartWithdrawal}
            />
            <div className="divider my-4" />
            {/* <Grid container spacing={6}>
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
                    </Grid> */}
            <div className="text-center">
              <FormControl variant="outlined" style={{ width: "10em" }}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Rango
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={selectRange}
                  onChange={handleChange}
                  label="Rango"
                >
                  <MenuItem value={"weekly"}>Semanal</MenuItem>
                  <MenuItem value={"monthly"}>Mensual</MenuItem>
                  <MenuItem value={"year"}>Anual</MenuItem>
                </Select>
              </FormControl>
            </div>
            {selectRange === "year" ? (
              <ResumeChartYears
                user={props.user}
                revenue={props.revenue}
                withdrawal={props.withdrawal}
                dataMoney={props.dataMoney}
                modeCard={props.modeCard}
                setModeCard={props.setModeCard}
                arrChartRevenue={arrChartRevenue}
                setArrChartRevenue={setArrChartRevenue}
                arrChartWithdrawal={arrChartWithdrawal}
                setArrChartWithdrawal={setArrChartWithdrawal}
                setLoading={setLoading}
              />
            ) : selectRange === "weekly" ? (
              <ResumeChartWeekly
                user={props.user}
                revenue={props.revenue}
                withdrawal={props.withdrawal}
                dataMoney={props.dataMoney}
                modeCard={props.modeCard}
                setModeCard={props.setModeCard}
                arrChartRevenue={arrChartRevenue}
                setArrChartRevenue={setArrChartRevenue}
                arrChartWithdrawal={arrChartWithdrawal}
                setArrChartWithdrawal={setArrChartWithdrawal}
                setLoading={setLoading}
              />
            ) : (
              <ResumeChartMonthly
                user={props.user}
                revenue={props.revenue}
                withdrawal={props.withdrawal}
                dataMoney={props.dataMoney}
                modeCard={props.modeCard}
                setModeCard={props.setModeCard}
                arrChartRevenue={arrChartRevenue}
                setArrChartRevenue={setArrChartRevenue}
                arrChartWithdrawal={arrChartWithdrawal}
                setArrChartWithdrawal={setArrChartWithdrawal}
                setLoading={setLoading}
              />
            )}
            {loading && <Loading />}
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
