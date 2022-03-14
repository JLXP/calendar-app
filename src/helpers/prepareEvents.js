import moment from "moment";

export const prepareEvents = (events) =>{
    console.log(events);
    return events.map(
        (e)=>({
            //esto se hace por que se requiere regresar lo mismo solo que se van a cambiar
            //los datos de las fechas
            ...e,
            end: moment(e.end).toDate(),
            start: moment(e.start).toDate(),
        })
    )
}