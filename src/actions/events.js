import { types } from "../types/types";

export const eventStartAddNew = (event) => {
    return async(dispatch) => {

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

export const eventUpdated = (event) =>({
    type: types.eventUpdated,
    payload:event
});

export const eventDeleted = ()=>({
    type: types.eventDeleted
});
