import React from 'react'

export const CalendarEvent = ({event}) => {

    //EVENTOS DEL CALEDARIO
    const {title, user}= event;
    return (
        <div>
            <span>{title}</span>
            <strong>-{user.name}</strong>
        </div>
    )
}