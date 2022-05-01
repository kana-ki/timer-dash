import './App.css';
import React, { useState, useRef } from 'react';
import Clock from './components/clock/clock';
import ClockControl from './components/clock/clockControl';

function App() {
  const [ started ] = useState(false);
  const [ elapsedSeconds ] = useState(0);
  const remoteControl = useRef(new ClockControl());

  setTimeout(_ => {
    remoteControl.current.play();
  }, 2000);

  setTimeout(_ => {
    remoteControl.current.pause();
  }, 3000)

  
  setTimeout(_ => {
    remoteControl.current.setElapsed(30*1000);
  }, 4000)

  
  setTimeout(_ => {
    remoteControl.current.play();
  }, 5000)


  return (
    <div className="timer-dash-app">
      <Clock 
        name="New timer"
        started={started} 
        elapsedSeconds={elapsedSeconds}
        targetSeconds={60}
        size={250}
        // showMilliseconds
        edit
        controls
        remoteControl={remoteControl.current}
      />
    </div>
  );
}

export default App;
