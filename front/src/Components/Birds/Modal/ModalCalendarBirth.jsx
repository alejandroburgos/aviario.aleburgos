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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(`${constants.urlLocal}birth/${props.user}`);
                const data = await result.json();
                data.length > 0 && data.forEach(element => {
                    setEvents(events => [...events, {
                        title: 'Nacimiento de la pareja ' + props.pairs.map(pair => pair.numberPair),
                        start: new Date(element.iniIncubacion),
                        end: new Date(element.fechNacimiento),
                        allDay: true,
                        // random color
                        color: '#' + Math.floor(Math.random() * 16777215).toString(16)
                    }])
                });
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [props.pairs]);

    console.log(events)

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
