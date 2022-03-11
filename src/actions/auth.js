import { type } from "@testing-library/user-event/dist/type";
import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types"


export const startLogin = (email,password) => {
    //redux-thunk para ejecutar un dispacth 
    return async(dispatch)=>{
        //envia los datos que recibe al fecth el cual hace la funcion
        const resp = await fetchSinToken('auth',{email,password}, 'POST');
        //regresa la informacion 
        const body = await resp.json();
        //compara si regreso la informacion
        if(body.ok){
            //asigna variables al local storage para despues comparar si existe si o no
            localStorage.setItem('token',body.token);
            //hora en la que se guardo el token
            localStorage.setItem('token-init-date', new Date().getTime());
            //ejecuta el login y asigna valores
            dispatch(login({
                uid:body.uid,
                name: body.name
            }));
        }else{
            Swal.fire('Error', body.msg, 'error');
        }
    }
}



export const startRegister =(email, password, name)=>{
    return async (dispatch)=>{
        const resp = await fetchSinToken('auth/new',{email, password, name},'POST');
        //Es importante poner el await por que si no pasa al siguiente y no termina de realizar dicho proceso
        //regresa la informacion en json
        const body = await resp.json();
        console.log(body);
        if(body.ok){
            //en este apartado se envian los datos para poder realizar el registro
            localStorage.setItem('token',body.token);
            //hora en la que se guardo el token
            localStorage.setItem('token-init-date', new Date().getTime());
            
            dispatch(login({
                uid:body.uid,
                name: body.name
            }));
        }else{
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

//esto sirve para validar si esta logueado o no
//y lo hace con el token, comprueba si existe o no
//en caso de que no exista renueva el token
export const startChecking = () => {
    return async(dispatch)=>{
        const resp = await fetchConToken('auth/renew');
        //Es importante poner el await por que si no pasa al siguiente y no termina de realizar dicho proceso
        const body = await resp.json();

        console.log(body);
        
        if(body.ok){
            //en este apartado se envian los datos para poder realizar el registro
            localStorage.setItem('token',body.token);
            //hora en la que se guardo el token
            localStorage.setItem('token-init-date', new Date().getTime());
            
            dispatch(login({
                uid:body.uid,
                name: body.name
            }));
        }else{
            dispatch(checkingFinish());
        }
    }
}

const checkingFinish = () =>({
    type: types.authCheckingFinish
})

const login = ( user )=>({
    type: types.authLogin,
    payload:user
});

export const startLogout = () => {
    return (dispatch) => {
        //esto borra todo lo que se encuentra almacenado
        localStorage.clear();
        dispatch(logout());
    }
}

const logout = () => ({
    type: types.authLogout
})




