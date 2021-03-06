//import { response } from 'express';
import classes from './EventCard.module.css';

export default function EventCard(props) {
function close(){
    props.onCancel();
}
function openForm(){
    props.onForm();
}


    return(
        
        <div className={classes.modal}>
            <p>{props.eventDate}</p>
            <p>{props.todaysEvent.time}</p>
            <p>{props.todaysEvent.title}</p>
            <p>{props.todaysEvent.description}</p>
            <button className={classes.addbtn} onClick={openForm}>Add Event</button>
            <button className={classes.closebtn} onClick={close}>Close</button>
        </div>
    );
}