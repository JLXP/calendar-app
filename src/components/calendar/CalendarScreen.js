import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import {Navbar} from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages';

import {CalendarEvent} from './CalendarEvent';
import { useState } from 'react';
import {CalendarModal} from './CalendarModal';

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { uiOpenModal } from '../../actions/ui';
import {  eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';

moment.locale('es');

const localizer = momentLocalizer(moment)


//son los eventos que aparecen en el calendario
const events = [{
  title:'Cumpleaños del jefe',
  start: moment().toDate(),
  end: moment().add(2,'days').toDate(),
  bgcolor:'#fafafa',
  notes:'comprar el pastel',
        user:{
          _id:'123',
          name:'Javier'
        }
}]

export const CalendarScreen = () => {

  const dispatch = useDispatch();

  const [lastView, setlastView] = useState(
    localStorage.getItem('lastView')||'month'
    );

  const onDoubleClick = (e) =>{
    dispatch(uiOpenModal());
  }

  const onSelectEvent = (e)=>{
    dispatch(eventSetActive(e));
    dispatch(uiOpenModal());
    
  }

  const onViewChange = (e) => {
    setlastView(e);
    localStorage.setItem('lastView',e);
  }

  //Se asignan los estilos del evento
  const eventStyleGetter = (event, start, end, isSelect) =>{

      //Se asignaran estilos
      const style = {
        backgroundColor:'#367CF7',
        borderRadius:'0px',
        opacity:0.8,
        display:'block',
        color:'white',
        
      }

      return {
        style
      }

    };

  return (
    <div>
    <Navbar/>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      messages={messages}
      eventPropGetter={eventStyleGetter}
      onDoubleClickEvent={onDoubleClick}
      onSelectEvent={onSelectEvent}
      view={lastView}
      onView={onViewChange}
      components={{
        event:CalendarEvent
      }}
    />

    <AddNewFab/>
    <CalendarModal/>
    </div>
  )
}

