import classes from './InputForm.module.css';
import { useRef } from 'react';
export default function InputForm(props) {

    const timeRef = useRef();
    const titleRef = useRef();
    const descRef = useRef();
    

    function submit(event){
        event.preventDefault();
        const enteredTime = timeRef.current.value;
        const enteredTitle = titleRef.current.value;
        const enteredDesc = descRef.current.value;
        const enteredDate = props.eventDate;

        const eventData ={
            date: enteredDate,
            time: enteredTime,
            title: enteredTitle,
            description: enteredDesc,
        };
        console.log(typeof(enteredDate));
        props.onEventAdd(eventData);
    }
function close() {
    props.onCancel();
}

    return(
        <div className={classes.modal}>
            <p>Add Event</p>
                <form onSubmit={submit}>
                    <div>
                        <label htmlFor='time'>Time</label>
                        <input type="time" required id='time' ref={timeRef}/>
                    </div>
                    <div>
                        <label htmlFor='title'>Event Title</label>
                        <input type='text' required id ='title' ref = {titleRef}></input>
                    </div>
                    <div>
                        <label htmlFor='description'>Event description</label>
                        <textarea id='description' required rows="5" ref={descRef}></textarea>
                    </div>
                    <div>
                        <button>Add Event</button>
                    </div>
                </form>
            <button onClick={close}>Close</button>
        </div>
    );
}