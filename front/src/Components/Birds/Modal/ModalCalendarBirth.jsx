import React, { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent
} from "@material-ui/core";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/sass/styles.scss';

import moment from 'moment';
import 'moment/locale/es';
import { constants } from "../../../Constants";

export const ModalCalendarBirth = (props) => {

    const localizer = momentLocalizer(moment);
    const [events, setEvents] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const result = await fetch(`${constants.urlLocal}birth/${props.user}`);
    //             const data = await result.json();
    //             data.forEach(element => {
    //                 return setEvents(events => [...events, {
    //                     title: 'illo',
    //                     start: moment(element.iniIncubacion),
    //                     end: moment(element.fechNacimiento),
    //                 }])
    //             });
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     fetchData();
    // }, []);

    useEffect(() => {
        setEvents([])
        props.pairs && props.pairs.forEach(element => {
            element.arrPuestasParejas && element.arrPuestasParejas.forEach(element2 => {
                
                return setEvents(events => [...events, {
                    title: 'Nac. Pareja '+ element.numberPair,
                    start: moment(element2.iniIncubacion),
                    end: moment(element2.fechNacimiento),
                    allDay: true,
                    color: element2.color, 

                }])
            });
        });
    }, [props.pairs]);
    
    const handleEventSelection = (e) => {
        console.log(e)
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
  return (
    <div>
            <Dialog open={props.open} onClose={() => props.setOpen(false)} maxWidth={'lg'}>
                <div className="p-3 font-size-xl font-weight-bold">Nacimientos</div>
                <hr />
                <DialogContent>
                    <div>
                        <PerfectScrollbar>
                            <div className="p-2">
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
                            </div>           
                        </PerfectScrollbar>
                    </div>
                </DialogContent>
                <DialogActions className="p-3">
                    <Button onClick={() => props.setOpen(false)} color="primary">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
    </div>
  )
}
