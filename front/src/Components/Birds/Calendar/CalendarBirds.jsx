import React, { useState, useEffect } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import { Button, Card, CardContent, Grid, List, ListItem, Tooltip } from '@material-ui/core';
import { LocalHospitalOutlined, PlusOne, PlusOneOutlined, Settings, SettingsApplications, ShowChartOutlined, TimeToLeave, VerifiedUserOutlined } from '@material-ui/icons';
import clsx from 'clsx';
import moment from 'moment';
import 'moment/locale/es';

export const CalendarBirds = () => {
    const [isSidebarMenuOpen, setIsSidebarMenuOpen] = useState(false);
    const toggleSidebarMenu = () => setIsSidebarMenuOpen(!isSidebarMenuOpen);

    const localizer = momentLocalizer(moment);

    return (
        <>

            <div className="app-inner-content-layout app-inner-content-layout-fixed">
                <div className="d-flex d-lg-none p-4 order-0 justify-content-between align-items-center">
                    <Button onClick={toggleSidebarMenu} size="small" className="btn-primary p-0 btn-icon d-40">
                        <Settings />
                    </Button>
                </div>
                <div className={clsx("app-inner-content-layout--sidebar app-inner-content-layout--sidebar__lg bg-secondary border-right", { 'layout-sidebar-open': isSidebarMenuOpen })}>
                    <PerfectScrollbar>
                        <div className="px-4">
                            <List component="div" className="nav-pills nav-neutral-primary flex-column">
                                <ListItem className="nav-header px-0 d-flex pb-2 align-items-center">
                                    <div className="text-primary font-weight-bold">
                                        Eventos
                                    </div>
                                    <div className="ml-auto font-size-xs">
                                        <a href="#/" onClick={e => e.preventDefault()}>
                                            <PlusOneOutlined />
                                        </a>
                                    </div>
                                </ListItem>
                                <ListItem component="a" button href="#/" onClick={e => e.preventDefault()}>
                                    <div className="badge badge-success badge-circle-inner shadow-none mr-2">1</div>
                                    Vitaminas
                                </ListItem>
                                <ListItem component="a" button href="#/" onClick={e => e.preventDefault()}>
                                    <div className="badge badge-warning badge-circle-inner shadow-none mr-2">2</div>
                                    Antibióticos
                                </ListItem>
                                <ListItem component="a" button href="#/" onClick={e => e.preventDefault()}>
                                    <div className="badge badge-first badge-circle-inner shadow-none mr-2">3</div>
                                    Ibuprofeno
                                </ListItem>
                                <ListItem component="a" button href="#/" onClick={e => e.preventDefault()}>
                                    <div className="badge badge-danger badge-circle-inner shadow-none mr-2">4</div>
                                    Oraldine
                                </ListItem>
                            </List>
                        </div>
                        <div className="divider mt-2" />
                        {/* <div className="p-4 bg-white">
                            <List component="div" className="p-0 nav-pills nav-neutral-primary flex-column">
                                <ListItem className="nav-header m-0 pt-0 px-0 d-flex pb-3 align-items-center">
                                    <div className="text-primary font-weight-bold">
                                        Statistics
                                    </div>
                                    <div className="ml-auto font-size-xs">
                                        <Tooltip title="Refresh stats" placement="left">
                                            <a href="#/" onClick={e => e.preventDefault()} className="text-success">
                                                <SettingsApplications />
                                            </a>

                                        </Tooltip>
                                    </div>
                                </ListItem>
                            </List>
                            <Grid container spacing={6} className="font-size-xs">
                                <Grid item lg={6}>
                                    <Card className="shadow-none bg-light text-center p-3">
                                        <div>
                                            <VerifiedUserOutlined />
                                        </div>
                                        <div className="mt-2 line-height-sm">
                                            <b className="font-size-lg">345</b>
                                            <span className="text-black-50 d-block">friends</span>
                                        </div>
                                    </Card>
                                </Grid>
                                <Grid item lg={6}>
                                    <Card className="shadow-none bg-light text-center p-3">
                                        <div>
                                            <ShowChartOutlined />
                                        </div>
                                        <div className="mt-2 line-height-sm">
                                            <b className="font-size-lg">2,693</b>
                                            <span className="text-black-50 d-block">messages</span>
                                        </div>
                                    </Card>
                                </Grid>
                            </Grid>
                        </div> */}
                        <div className="divider" />
                        <div className="p-4">
                            <List component="div" className="nav-pills nav-neutral-primary flex-column">
                                <ListItem className="nav-header p-0 m-0">
                                    <div className="text-primary font-weight-bold">
                                        Proximos eventos 
                                    </div>
                                </ListItem>
                            </List>
                            <Card className="card-box mt-3 mb-4">
                                <div className="card-indicator bg-first" />
                                <CardContent className="px-4 py-3">
                                    <div className="pb-3 d-flex justify-content-between">
                                        <a href="#/" onClick={e => e.preventDefault()}>
                                            Antibióticos para isabelitas
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start">
                                        <div className="badge badge-first px-3">Hoy</div>
                                        <div className="font-size-sm text-danger px-2">
                                            <LocalHospitalOutlined />
                                            {moment().format('DD MMMM YYYY')}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="card-box mb-4">
                                <div className="card-indicator bg-success" />
                                <CardContent className="px-4 py-3">
                                    <div className="pb-3 d-flex justify-content-between">
                                        <a href="#/" onClick={e => e.preventDefault()}>
                                            Dar medicinas a pareja 12
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start">
                                        <div className="badge badge-success px-3">Hecho</div>
                                        <div className="font-size-sm text-dark px-2">
                                            <LocalHospitalOutlined />
                                            {moment().format('DD MMMM YYYY')}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Button href="#/" onClick={e => e.preventDefault()} className="btn-pill btn-primary" fullWidth size="small">
                                Añadir evento
                            </Button>
                        </div>
                    </PerfectScrollbar>
                </div>
                <div className="app-inner-content-layout--main card-box bg-white p-0">
                    <div className="card-header rounded-0 bg-white p-4 border-bottom">
                        <div className="card-header--title">
                            <small>Events</small>
                            <b className="font-size-lg">Events calendar</b>
                        </div>
                        <div className="card-header--actions">
                            <Button href="#/" onClick={e => e.preventDefault()} size="small" className="btn-first btn-icon d-40 p-0 hover-scale-sm btn-pill">
                                <PlusOne />
                            </Button>
                        </div>
                    </div>
                    <PerfectScrollbar>
                        <div className="p-4">
                        <Calendar
                            localizer={localizer}
                            // events={myEventsList}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 500 }}
                            messages={{
                                month: 'Mes',
                                day: 'Días',
                                today: 'Hoy',
                                week: 'Semana',
                                previous: "Atras",
                                back: 'Atrás',
                                next: 'Siguiente',
                                noEventsInRange: 'No hay eventos en este rango.',
                            }}
                            />
                        </div>
                    </PerfectScrollbar>
                </div>

                <div onClick={toggleSidebarMenu} className={clsx("sidebar-inner-layout-overlay", { 'active': isSidebarMenuOpen })} />
            </div>

        </>
    )
}
