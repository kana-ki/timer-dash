import './App.css';
import React, { useState, useRef } from 'react';
import Clock from './components/clock/clock';
import ClockControl from './components/clock/clockControl';

function App() {
  const [ started ] = useState(false);
  const [ elapsedSeconds ] = useState(0);
  const remoteControl = useRef(new ClockControl());

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
