import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import Background from './components/Background';
import EventCard from './components/EventCard';
import InputForm from './components/InputForm';

const datesToAddClassTo = ['2022-01-31','2022-02-03' ];  

function tileClassName({ date, view }) {
  if(view === 'month'){
    if(datesToAddClassTo.find(dDate => isSameDay(dDate, date.toISOString().slice(0,10)))){
      console.log('returned');
      return 'tileClass';
    }
  }   
}  
function isSameDay(a, b) { 
  console.log(a, b);
  if(a === b){
    console.log('match');
    return true;
  }
  return (a, b) === 0;
}


function App() {
const [modalIsOpen, setModalIsOpen] = useState(false);
const [formIsOpen, setFormIsOpen] = useState(false);
function clickDay(data){
setValue(data);
setModalIsOpen(true);
}
function closeModal(){
  setModalIsOpen(false);
}
function openForm(){
  setModalIsOpen(false);
  setFormIsOpen(true);
}
function closeForm(){
  setFormIsOpen(false);
}
const [value, setValue] = useState(new Date()); 
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
       {modalIsOpen && <EventCard onCancel={closeModal} eventDate={value.toISOString().slice(0,10)} onForm={openForm}/>}
       {formIsOpen && <Background onCancel={closeForm}/>}
       {formIsOpen && <InputForm onCancel={closeForm}/>}
    </div>
    
  );
}

export default App;
