import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter,Routes, Route, Navigate } from 'react-router-dom';
import { PublicRoute } from '../routes/PublicRoute';

import { startChecking } from '../actions/auth';

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from '../routes/PrivateRoute';

export const AppRouter = () => {

  const dispatch = useDispatch();
  //el uid sirve para saber si esta autenticado y el cheking se realiza despues de logearse y que 
  //el token sea valido
  const {checking,uid} = useSelector(state=>state.auth);

  //esta funcion se ejecuta cada vez que se cambia de pagina
  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  console.log(checking);
  //si queremos convertir de string a booleano, solamente hay que colocar doble signo de exclamacion

  if(checking){
    return (<h5>Espere...</h5>);
  }
  
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" 
              element={
              <PublicRoute isAuth={!!uid}>
                <LoginScreen/>
              </PublicRoute>}
            >
            </Route>
            <Route path="/" 
            element={
              <PrivateRoute isAuth={!!uid}>
                <CalendarScreen/>
              </PrivateRoute>}
            />
            <Route path='*' element={<Navigate to='/' />}/>
        </Routes>
    </BrowserRouter>
  )
}

