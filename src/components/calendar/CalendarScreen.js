import React, { useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useDispatch,useSelector } from 'react-redux';

import {Navbar} from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages';

import {CalendarEvent} from './CalendarEvent';
import { useState } from 'react';
import {CalendarModal} from './CalendarModal';

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { uiOpenModal } from '../../actions/ui';
import {  eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment)


//son los eventos que aparecen en el calendario
/*const events = [{
  title:'Cumpleaños del jefe',
  start: moment().toDate(),
  end: moment().add(2,'days').toDate(),
  bgcolor:'#fafafa',
  notes:'comprar el pastel',
        user:{
          _id:'123',
          name:'Javier'
        }
}]*/

export const CalendarScreen = () => {
  
  const dispatch = useDispatch();

  const {events,activeEvent}= useSelector(state=>state.calendar);
  const {uid}= useSelector(state=>state.auth);


  const [lastView, setlastView] = useState(
    localStorage.getItem('lastView')||'month'
    );

  // el useEffect casi siempre es para el get
  //siempre hay que poner
  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch])
  

  const onDoubleClick = (e) =>{
    
    dispatch(uiOpenModal());
  }

  const onSelectEvent = (e)=>{
    dispatch(eventSetActive(e));
    
    
  }

  const onViewChange = (e) => {
    setlastView(e);
    localStorage.setItem('lastView',e);
  }

  //Se asignan los estilos del evento
  const eventStyleGetter = (event, start, end, isSelect) =>{

      //Se asignaran estilos
      const style = {
        backgroundColor: (uid=== event.user._id)?'#367CF7':'#465660',
        borderRadius:'0px',
        opacity:0.8,
        display:'block',
        color:'white',
        
      }

      return {
        style
      }

    };

    const onSelectSlot = (e)=>{
      //Console.log(e)
      dispatch(eventClearActiveEvent);
    }

  return (
    <div>
    <Navbar/>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      //contenido en español
      messages={messages}
      //styles del calendario
      eventPropGetter={eventStyleGetter}
      //Con doble click se abre el modal
      onDoubleClickEvent={onDoubleClick}
      //con un click asigna valores al modal y abre el modal
      onSelectEvent={onSelectEvent}
      //ultima vista en donde se quedo, esta puede ser week, month or day
      view={lastView}

      onSelectSlot={onSelectSlot}
      //este tiene que estar activado para que funcione el onselect
      selectable={true}
      //asigna la ultima vista
      onView={onViewChange}
      //Aqui se encuentra lo que va dentro de los dias del mes
      components={{
        event:CalendarEvent
      }}
    />

    <AddNewFab/>
    {
      (activeEvent) && 
        <DeleteEventFab
    />
    }
    <CalendarModal/>
    </div>
  )
}

