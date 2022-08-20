import React, { useState, useEffect, useCallback } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import { Button, Card, CardContent, Grid, List, ListItem, Menu, Tooltip } from '@material-ui/core';
import { AddBoxOutlined, AddComment, Delete, DeleteOutlined, Edit, LocalHospitalOutlined, PlusOne, PlusOneOutlined, Settings, SettingsApplications, ShowChartOutlined, TimeToLeave, VerifiedUserOutlined } from '@material-ui/icons';
import clsx from 'clsx';
import moment from 'moment';
import 'moment/locale/es';

import 'react-big-calendar/lib/sass/styles.scss';
import { ModalNewEvent } from './ModalNewEvent';
import { ModalEditEvent } from './ModalEditEvent';
import { Alerts } from '../../Shared/Alert/Alerts';
import { constants } from '../../../Constants';
import { ModalNewCategory } from './ModalNewCategory';
import { ModalDeleteCalendar } from './ModalDeleteCalendar';
import { ModalDeleteCategory } from './ModalDeleteCategory';

export const CalendarBirds = (props) => {

    const [alert, setAlert] = useState({
        open: false,
        message: "",
        classes: "",
    })

    const [isSidebarMenuOpen, setIsSidebarMenuOpen] = useState(false);
    const toggleSidebarMenu = () => setIsSidebarMenuOpen(!isSidebarMenuOpen);

    const localizer = momentLocalizer(moment);

    const [modal, setmodal] = useState(false)
    const toggle = () => setmodal(!modal)

    const [modalEdit, setmodalEdit] = useState(false)
    const toggleEdit = () => setmodalEdit(!modalEdit)

    const [modalCategory, setModalCategory] = useState(false)
    const toggleCategory= () => setModalCategory(!modalCategory)

    const [modalDelete, setModalDelete] = useState(false)
    const toggleDelete = () => setModalDelete(!modalDelete)

    const [modalDeleteCategory, setModalDeleteCategory] = useState(false)
    const toggleDeleteCategory = () => setModalDeleteCategory(!modalDeleteCategory)

    const [events, setEvents] = useState([{}]);
    const [categories, setCategories] = useState([{}]);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [selectedCategory, setSelectedCategory] = useState({});
    
    const [anchorElMenu1, setAnchorElMenu1] = useState(null);
    const [menu, setMenu] = useState(false)
    const handleClickMenu1 = event => {
        setAnchorElMenu1(event.currentTarget);
        setMenu(!menu);
    };
    const handleCloseMenu1 = () => {
        setAnchorElMenu1(null);
        setMenu(false);
    };


    const handleEventSelection = (e) => {
        setSelectedEvent(e)
        handleClickMenu1(e);
    }
    const eventStyleGetter = (e) => {
        return {
            style: {
                backgroundColor: e.color,
                borderRadius: '0px',
                opacity: 0.8,
                color: 'black',
                border: '0px',
                display: 'block'
            }
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(`${constants.urlLocal}getCalendar/${props.state.user}`);
                const data = await result.json();
                setEvents(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchDataCategory = async () => {
            try {
                const result = await fetch(`${constants.urlLocal}getCategory/${props.state.user}`);
                const data = await result.json();
                setCategories(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchDataCategory();
    } , []);

    // delete category
    const deleteCategory = async (id) => {
        try {
            const result = await fetch(`${constants.urlLocal}deleteCategory/${selectedCategory._id}/${props.state.user}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await result.json();
            setCategories(data.categories);
            toggleDeleteCategory();
            setAlert({
                open: true,
                message: "Categoría eliminada correctamente",
                classes: "success"
            })
        } catch (error) {
            setAlert({
                open: true,
                message: "Error al eliminar la categoría", error,
                classes: "danger"
            })
        }
    }


    // sort events and show today and next 7 days but not compare time
    const eventsToday = events && events.filter(event => moment(event.start).isSameOrBefore(moment().add(7, 'days'), 'day') && moment(event.start).isSameOrAfter(moment(), 'day'));

    // add eventsToday to eventsRange 

    return (
        <>
            <div className="app-inner-content-layout app-inner-content-layout-fixed">
                <div className={clsx("app-inner-content-layout--sidebar app-inner-content-layout--sidebar__lg bg-secondary border-right", { 'layout-sidebar-open': isSidebarMenuOpen })}>
                    <PerfectScrollbar>
                        <Alerts alert={alert} setAlert={setAlert} />
                        <div className="px-4">
                            <List component="div" className="nav-pills nav-neutral-primary flex-column">
                                <ListItem className="nav-header px-0 d-flex pb-2 align-items-center">
                                    <div className="text-primary font-weight-bold">
                                        Categorías
                                    </div>
                                    <div className="ml-auto font-size-xs" style={{cursor: "pointer"}}>
                                        <span onClick={toggleCategory}>
                                            <AddBoxOutlined />
                                        </span>
                                        <ModalNewCategory modal={modalCategory} toggle={toggleCategory} categories={categories} setCategories={setCategories} user={props.state} alert={alert} setAlert={setAlert} />
                                    </div>
                                    <ModalDeleteCategory modal={modalDeleteCategory} toggle={toggleDeleteCategory} selectedCategory={selectedCategory} deleteCategory={deleteCategory} />

                                </ListItem>
                                {categories && categories.map((category, index) => {
                                    return (
                                        <>
                                        <ListItem component="a" button 
                                        // onClick={e => deleteCategory(category._id)}
                                        >
                                            <div className="badge badge-circle-inner shadow-none mr-2" style={{backgroundColor: `${category.color}`}}>1</div>
                                            {category.title}
                                            <div className="ml-auto font-size-xs" style={{cursor: "pointer"}}>
                                                <span onClick={() => {
                                                    toggleDeleteCategory();
                                                    setSelectedCategory(category);
                                                } }>
                                                    <DeleteOutlined />
                                                </span>
                                            </div>
                                        </ListItem>
                                        </>
                                    )
                                })}
                            </List>
                        </div>
                        <div className="divider mt-2" />
                        <div className="divider" />
                        <div className="p-4">
                            <List component="div" className="nav-pills nav-neutral-primary flex-column">
                                <ListItem className="nav-header p-0 m-0">
                                    <div className="text-primary font-weight-bold">
                                        Proximos eventos 
                                    </div>
                                </ListItem>
                            </List>
                            {eventsToday && eventsToday.map((event) => {
                            return (
                                <>
                                <Card className="card-box mt-3 mb-4">
                                    <div className="card-indicator " style={{backgroundColor: event.color}} />
                                    <CardContent className="px-4 py-3">
                                        <div className="pb-3 d-flex justify-content-between">
                                            <a href="#/" onClick={e => e.preventDefault()}>
                                                {event.title}
                                            </a>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-start">
                                            <div className="badge badge-first px-3">Hoy</div>
                                            <div className="font-size-sm text-danger px-2">
                                                <LocalHospitalOutlined />
                                                {/* compare end and start and if is range */}
                                                {moment(event.start).isSame(moment(event.end), 'day') ? moment(event.start).format('DD/MM/YYYY') : moment(event.start).format('DD/MM/YYYY') + " - " + moment(event.end).format('DD/MM/YYYY')}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                </>
                            )
                           }) }
                            {/* <Card className="card-box mb-4">
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
                            </Card> */}
                            <ModalNewEvent modal={modal} toggle={toggle} categories={categories} events={events} setEvents={setEvents} user={props.state} alert={alert} setAlert={setAlert}/>
                            <Button onClick={e => toggle()} className="btn-pill btn-primary" fullWidth size="small">
                                Añadir evento
                            </Button>
                        </div>
                    </PerfectScrollbar>
                </div>
                <div className="app-inner-content-layout--main card-box bg-white p-0">
                    <div className="card-header rounded-0 bg-white p-4 border-bottom">
                        <div className="card-header--title">
                            <small>Eventos</small>
                            <b className="font-size-lg">Calendario</b>
                        </div>
                        <div className="d-flex d-lg-none p-2 order-0 justify-content-between align-items-center">
                            <Button onClick={toggleSidebarMenu} size="small" className="btn-primary p-0 btn-icon d-40">
                                <Settings />
                            </Button>
                        </div>
                    </div>
                    <PerfectScrollbar>
                        <div className="p-4">
                            <Calendar
                                localizer={localizer}
                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: 500 }}
                                events={events}
                                eventPropGetter={eventStyleGetter}
                                onSelectEvent={handleEventSelection} 
                                messages={{
                                    month: 'Mes',
                                    day: 'Días',
                                    today: 'Hoy',
                                    week: 'Semana',
                                    previous: "Atras",
                                    back: 'Atrás',
                                    next: 'Siguiente',
                                    noEventsInRange: 'No hay eventos en este rango.',
                                    allDay: 'Todo el día',
                                    date: 'Fecha',
                                    time: 'Hora',
                                    event: 'Evento',
                                }}
                            />
                           <div className="m-2">
                                <Menu
                                    anchorEl={anchorElMenu1}
                                    keepMounted
                                    open={menu}
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
                                    <div className="grid-menu grid-menu-2col">
                                        <Grid container spacing={0}>
                                            <Grid item sm={6}>
                                                <div className="p-3">
                                                    <Button variant="text" className="btn-outline-warning border-0 w-100 d-block" onClick={toggleEdit} >
                                                        <span className="font-size-xxl d-block">
                                                            <Edit />
                                                        </span>
                                                        <span>Editar</span>
                                                    </Button>
                                                <ModalEditEvent selectedEvent={selectedEvent} handleCloseMenu1={handleCloseMenu1} modal={modalEdit} toggle={toggleEdit} categories={categories} events={events} setEvents={setEvents} user={props.state} alert={alert} setAlert={setAlert} />
                                                </div>
                                            </Grid>
                                            <Grid item sm={6}>
                                                <div className="p-3">
                                                    <Button variant="text" className="btn-outline-danger border-0 w-100 d-block" onClick={toggleDelete}  >
                                                        <span className="font-size-xxl d-block">
                                                            <Delete />
                                                        </span>
                                                        <span>Eliminar</span>
                                                    </Button>
                                                    <ModalDeleteCalendar setEvents={setEvents} handleCloseMenu1={handleCloseMenu1} selectedEvent={selectedEvent} toggle={toggleDelete} modal={modalDelete} user={props.state} alert={alert} setAlert={setAlert}  />
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div>
                                </Menu>
                            </div>
                        </div>
                        
                    </PerfectScrollbar>
                </div>

                <div onClick={toggleSidebarMenu} className={clsx("sidebar-inner-layout-overlay", { 'active': isSidebarMenuOpen })} />
            </div>

        </>
    )
}
