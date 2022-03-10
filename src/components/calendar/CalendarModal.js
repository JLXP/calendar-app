import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';
import {uiCloseModal} from '../../actions/ui'
import { eventAddNew, eventClearActiveEvent, eventUpdated } from '../../actions/events';


//estilos del modal
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
}; 

  //configuracion basica llamando el root del calendario
Modal.setAppElement('#root');
const now = moment().minutes(0).seconds(0).add(1,'hours');
const nowplus = now.clone().add(1,'hours');


const initEvent = {
    title:'',
    notes:'',
    start:now.toDate(),
    end:nowplus.toDate()
}

export const CalendarModal = () => {
    
    const {modalOpen} = useSelector(state => state.ui);
    const {activeEvent} = useSelector(state => state.calendar);

    const dispatch = useDispatch();

    const [ dateStart, setDateStart ] = useState(now.toDate());
    const [ dateEnd, setDateEnd ] = useState(nowplus.toDate());
    const [titleValid, setTitleValid ] = useState( true );


    const [formValues,setFormValues] = useState( initEvent );


    const {notes, title, start, end} = formValues;

    useEffect(() => {
       if( activeEvent){
            setFormValues( activeEvent);
       }else{
           setFormValues(initEvent)
       }

    }, [activeEvent,setFormValues])
    

    const handleInputChange = ({target}) =>{
        //se estable un objeto que tiene los setvalues
        setFormValues({
            ...formValues,
            [target.name]:target.value
        })
    }

    

    const closeModal = () => {
        dispatch(uiCloseModal());
        dispatch( eventClearActiveEvent());
        setFormValues(initEvent);
        
        
    }

    const handleStartDateChange = ( e )=>{
        setDateStart(e);
        setFormValues({
            ...formValues,
            start:e
        })
    }

    const handleEndDateChange = ( e )=>{
        setDateEnd(e);    
        setFormValues({
            ...formValues,
            end:e
        })
    }

    const handleSubmitForm = (e) => {
        //prevencion del formulario
        e.preventDefault();

        const momentStart = moment( start );
        const momentEnd = moment( end );


        //Si la fecha inicial es igual o mayor al moment end entonces regresa un error
        if( momentStart.isSameOrAfter( momentEnd)){
            return Swal.fire('Error', 'La fecha fin debe ser mayor a la fecha de inicio','error');
        }

        if(title.trim().length<2){
            return setTitleValid( false ); 
        }

        if( activeEvent ){
            dispatch( eventUpdated(formValues));
        }else{

            dispatch(eventAddNew({
                ...formValues,
                id:new Date().getTime,
                user:{
                    id:'123',
                    name:'Javier'
                }
            }));

        }

        

        setTitleValid( true );
        closeModal();
    }



    return (
    //isopen evalua un boleano el cual es true se muestra, de lo contrario este se cierra
    <Modal
        //Permite el abrir un modal
        isOpen={modalOpen}
        //onAfterOpen={afterOpenModal}
        //Permite cerrar un modal cuando se clickea fuera de el
        onRequestClose={closeModal}
        //estilos del modal
        style={customStyles}
        //cierra el modal en determinado tiempo
        closeTimeoutMS={200}
        //styles del modal
        className='modal'
        //fondo que se encuentra en el modal
        overlayClassName='modal-fondo'
    >   
        <h1> { (activeEvent)?'Editar evento': 'Nuevo evento'} </h1>
        <hr />
        <form 
        className="container"
        onSubmit={handleSubmitForm}
        >

            <div className="form-group">
                <label>Fecha y hora inicio</label>
                <DateTimePicker 
                onChange={handleStartDateChange} 
                value={dateStart}
                className='form-control' />
            </div>

            <div className="form-group">
                <label>Fecha y hora fin</label>
                <DateTimePicker 
                onChange={handleEndDateChange} 
                value={dateEnd}
                minDate={dateStart}
                className='form-control' />
            </div>

            <hr />
            <div className="form-group">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className={`form-control ${ !titleValid && 'is-invalid'}`}
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    value={ title }
                    onChange={ handleInputChange }
                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={notes}
                    onChange={ handleInputChange }
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>
    </Modal>      
    
  )
}

