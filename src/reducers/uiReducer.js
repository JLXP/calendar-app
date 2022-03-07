import { types } from "../types/types";

const initialState = {
    modalOpen: false,
}

//Es importante si o si siempre devolver un state por que si no luego no lo reconoce
export const uiReducer = (state = initialState, action)=>{
    switch (action.type) {
        case types.uiOpenModal:
            return {
                ...state,
                modalOpen:true
            }
        case types.uiCloseModal:
            return {
                    ...state,
                    modalOpen:false
                }
        default:
            return state;
    }
}