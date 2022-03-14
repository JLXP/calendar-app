import { types } from "../types/types";


//{
//    id: new Date().getTime(),
//    title:'Cumpleaños del jefe',
//    start: moment().toDate(),
//    end: moment().add(2,'days').toDate(),
//    notes:'comprar el pastel',
//        user:{
//            _id:'123',
//            name:'Javier'
//        }
//}

const initialState = {
    events:[],
    activeEvent : null
};


export const calendarReducer = (state = initialState, action) => {

        switch (action.type) {
            case types.eventAddNew:
                return {
                    ...state,
                    events:[
                        ...state.events,
                        action.payload
                    ]
                }
            case types.eventSetActive:
                return {
                    ...state,
                    activeEvent: action.payload
                }
            case types.eventClearActiveEvent:
                return {
                    ...state,
                    activeEvent:null
                }
            //hay que hacer un map para buscar el update que quiero actualizar
            /*este metodo es para lo siguiente:
                -primero busca por medio de un map el state
                -compara el id de los states por el que esta recibiendo y posteriormente actualiza por el nuevo payload
            
            */
            case types.eventUpdated:
                return{
                    ...state,
                    events: state.events.map(
                        e => (e.id === action.payload.id )? action.payload: e
                    )
            }
            //aqui se usa el filter para que busqueda regrese todos menos el que ya no debe de estar
            case types.eventDeleted:
                return{
                    ...state,
                    events: state.events.filter(
                        e => (e.id !== state.activeEvent.id )
                    ),
                    activeEvent:null
            }
            case types.eventLoaded:
                return {
                    ...state,
                    events: [...action.payload]
                }
            case types.eventLogout:
                return {
                    ...initialState
                }
            default:
                return state;
        }
}