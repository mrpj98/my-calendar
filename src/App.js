import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import Background from './components/Background';
import EventCard from './components/EventCard';
import InputForm from './components/InputForm';




 const datesToAddClassTo = [];  

function isSameDay(a, b) { 
 // console.log(a, b);
  if(a === b){
    console.log('match');
    return true;
  }
  return (a, b) === 0;
}


function App() {
  
  

function addEvent(eventData){
  console.log(JSON.stringify(eventData))
  fetch('http://localhost:7058/api/calendar', {
    method: 'POST',
    body: JSON.stringify(eventData),
    //mode: 'no-cors',
    //credentials: 'include',
    headers: {
      'Content-Type':'application/json'
     //'Access-Control-Request-Headers':'*'
      //'Access-Control-Allow-Origin':'*'
      //'Authorization':'*'
    }
  }).then(() => {
    setFormIsOpen(false);
  });
}
function tileClassName({ date, view }) {
  if(view === 'month'){
    if(datesToAddClassTo.find(dDate => isSameDay(dDate, date.toISOString().slice(0,10)))){
      console.log('returned');
      return 'tileClass';
    }
  }   
} 

/*function compareDates(dateList){
  dateList.forEach(element => {
    console.log(element.date, value.toISOString().slice(0,10));
    if(element.date === value.toISOString().slice(0,10))
    {
      setTodayEvent(element);
      
      return;
    }
  });
}*/
const [todayEvent, setTodayEvent] = useState({});
const [modalIsOpen, setModalIsOpen] = useState(false);
const [formIsOpen, setFormIsOpen] = useState(false);
const [newData, setNewData] = useState([]);
const [value, setValue] = useState(new Date()); 

function clickDay(data){
console.log(value);
setValue(data);
console.log(value);
setModalIsOpen(true);
//console.log(newData);

console.log(todayEvent);
}

useEffect(() =>
{
  
    fetch('http://localhost:7058/api/calendar')
    .then(response => response.json())
    .then(data => {
      const events =[];
      for (const key in data) {
        const event ={
          id: key,
          ...data[key]
        };
        events.push(event);
        console.log(events);
       setNewData(events)
      }
    });
    
},[value])
useEffect(()=> {
  //datesToAddClassTo.
  console.log(newData);
  newData.forEach(element => {
    let newDate = true;
    for(let i = 0; i<datesToAddClassTo.length; i++)
    {
      if(datesToAddClassTo[i] === element.date)
      {
        newDate = false;
      }
    }
    if(newDate === true)
    {
      datesToAddClassTo.push(element.date);
    }
    
    
    console.log(datesToAddClassTo);
    console.log(element.date, value.toISOString().slice(0,10));
    if(element.date === value.toISOString().slice(0,10))
    {
     // eventBool = true;
      setTodayEvent(element);
      //console.log(todayEvent)
      //return;
    }

  });
  console.log('yooo');
},[newData, value])

function closeModal(){
  setModalIsOpen(false);
 // console.log(newData);
 setTodayEvent({});
}
function openForm(){
  setModalIsOpen(false);
  setFormIsOpen(true);
}
function closeForm(){
  setFormIsOpen(false);
}

  return (
    <div>
      <div className='center'>
      <Calendar
        
        onClickDay={clickDay}
        tileClassName={tileClassName}
        />
        {console.log(value)}
       </div>
       {modalIsOpen && <Background onCancel={closeModal}/>}
       {modalIsOpen && <EventCard onCancel={closeModal} eventDate={value.toISOString().slice(0,10)} onForm={openForm} todaysEvent={todayEvent}/>}
       {formIsOpen && <Background onCancel={closeForm}/>}
       {formIsOpen && <InputForm onCancel={closeForm} eventDate={value.toISOString().slice(0,10)} onEventAdd={addEvent} />}
    </div>
    
  );
}

export default App;
