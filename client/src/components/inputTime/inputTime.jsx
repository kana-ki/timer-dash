import { useState, useEffect } from 'react';
import InputInteger from '../inputInteger/inputInteger';


export default function TimeEntry(props) {
    const onChange = props.onChange;
    const inputHours = Math.floor(props.value / 60 / 60);
    const inputMinutes = Math.floor((props.value / 60) % 60);
    const inputSeconds = Math.floor(props.value % 60);
  
    const [ hours, setHours ] = useState(inputHours);
    const [ minutes, setMinutes ] = useState(inputMinutes);
    const [ seconds, setSeconds ] = useState(inputSeconds);

    useEffect(() => {
        const totalMs = (hours * 60 * 60 * 1000) + 
                        (minutes * 60 * 1000) + 
                        (seconds * 1000);
        if (onChange) onChange(totalMs);
    }, [ onChange, hours, minutes, seconds ])

    return <>
        <InputInteger label="H" 
                          max={9} 
                          value={hours}
                          onChange={v => setHours(v) } />
        <span style={{
                fontSize: "1em",
                marginBottom: "-.7em"
                }}>
            :
        </span>
        <InputInteger label="M" 
                        max={59}
                        value={minutes}
                        onChange={v => setMinutes(v) } />
        <span style={{
                fontSize: "1em",
                marginBottom: "-.7em"
                }}>
            :
        </span>
        <InputInteger label="S" 
                        max={59}
                        value={Math.floor(seconds)}
                        onChange={v => setSeconds(v) } />
    </>;
}