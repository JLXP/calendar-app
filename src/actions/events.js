import { types } from "../types/types";
import {fetchConToken} from "../helpers/fetch";
import Swal from "sweetalert2";
import { prepareEvents } from "../helpers/prepareEvents";

export const eventStartAddNew = (event) => {
   
    //cuando estas en una accion no rescuperas con use selector sino de un getstate
    return async(dispatch, getState) => {
        const {uid, name}= getState().auth;
        try{

        const resp = await fetchConToken('events',event,'POST');
        const body = await resp.json();

        

        if( body.ok){
            event.id = body.evento.id;
            event.user = {
                _id:uid,
                name:name
            }
            console.log(event);
            dispatch(eventAddNew(event));
        }

        }catch(error){
            Swal.fire('Error', error,'error');
        }
    }
}

//solo se utiliza si se ejecuta todo bien
const eventAddNew = (event)=>({
    type:types.eventAddNew,
    payload: event
});

export const eventSetActive = (event)=>({
    type:types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent =()=>({
    type: types.eventClearActiveEvent,
});

export const eventStartUpdate = ( event ) => {
    return async(dispatch)=>{
        try{
            const resp = await fetchConToken(`events/${event.id}`, event, 'PUT');
            const body = await resp.json(); 
            
            if(body.ok){
                dispatch(eventUpdated(event));
            }else{
                Swal.fire('Error', body.msg, 'error');
            }
        }catch(error){
        }      
    }
}

const eventUpdated = (event) =>({
    type: types.eventUpdated,
    payload:event
});


export const eventStartDelete = (event) =>{
    return async(dispatch, getState)=>{

        const { id } = getState().calendar.activeEvent;

        try{
            const resp = await fetchConToken(`events/${id}`, {}, 'DELETE');
            const body = await resp.json(); 
            
            if(body.ok){
                dispatch(eventDeleted());
            }else{
                Swal.fire('Error', body.msg, 'error');
            }
        }catch(error){
        }
        
        
    }
}

const eventDeleted = ()=>({
    type: types.eventDeleted
});

export const eventStartLoading = () =>{
    return async(dispatch) => {
        try{
            const resp = await fetchConToken('events');
            const body = await resp.json();

            //esta funcion servira para trasnformas las fechas en String
            const events = prepareEvents(body.eventos);

            dispatch(eventsLoaded(events));

            
        }catch(error){
            console.log(error);
        }
    }
}


const eventsLoaded = (eventos) => ({
    type: types.eventLoaded,
    payload:eventos
})
