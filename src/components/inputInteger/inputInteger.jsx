import { useState, useRef, useEffect } from 'react';
import ClickNHold from 'react-click-n-hold'; 

export default function InputInteger(props) {
  const onChange = props.onChange;
  const max = props.max || 99;
  const length = max.toString().length;

  const [ incrementFocused, setIncrementFocused ] = useState(false);
  const [ decrementFocused, setDecrementFocused ] = useState(false);
  const [ value, setValue ] = useState(props.value || 0);
  const incrementInterval = useRef(null);
  const decrementInterval = useRef(null);

  useEffect(() => {
    if (onChange) onChange(value);
    return () => {}
  }, [ value, onChange ])

  return <div style={{
    display: "flex",
    placeItems: "center",
    flexDirection: "column",
    alignItems: "center",
    ...props.style
  }}>
    { props.label && 
      <span style={{
        fontSize:".5em",
        lineHeight: "1em",
        color: "#777",
        fontWeight: "bold",
        marginBottom: "20px"
      }}>
        {props.label}
      </span>
    }

    <ClickNHold
      time={.5}
      onStart={e => setValue(v => Math.min(max, v + 1)) }
      onClickNHold={e => incrementInterval.current = setInterval(_ => setValue(v => Math.min(max, v + 1)), 100) }
      onEnd={e => clearInterval(incrementInterval.current) }>
        <div 
          onMouseEnter={_ => { setIncrementFocused(true); }}
          onFocus={_ => { setIncrementFocused(true); }}
          onMouseLeave={_ => { setIncrementFocused(false); }}
          onBlur={_ => { setIncrementFocused(false); }}
          style={{
            borderLeft: `solid .08em ${incrementFocused ? "#FFB3F2" : "#777"}`,
            borderTop: `solid .08em ${incrementFocused ? "#FFB3F2" : "#777"}`,
            width: ".3em",
            height: ".3em",
            transform: "rotate(45deg)",
            cursor: "pointer"
          }}/>
    </ClickNHold>
    
    <input
      type="textbox"
      onClick={e => e.currentTarget.select()}
      maxLength={length}
      value={value}
      onChange={e => setValue(e.currentTarget.value ? Math.min(max, parseInt(e.currentTarget.value)) : 0)}
      onKeyDown={e => { 
        if (!(e.key === "0" || e.key === "Delete" || e.key === "Backspace" || !!parseInt(e.key))) 
          e.preventDefault() 
      }}
      style={{
        width: `${.25+(.6*length)}em`,
        height: "1.3em",
        backgroundColor: "#333",
        color: "white",
        boxSizing: "content-box",
        padding: ".1em ",
        paddingBottom: ".05em",
        lineHeight: "1em",
        border: "solid 1px #444",
        borderRadius: "3px",
        textAlign: 'center',
        fontWeight: "bold",
        fontSize: "1em",
      }} />
      
    <ClickNHold
      time={.5}
      onStart={e => setValue(v => Math.max(0, v - 1)) }
      onClickNHold={e => decrementInterval.current = setInterval(_ => setValue(v => Math.max(0, v - 1)), 100) }
      onEnd={e => clearInterval(decrementInterval.current) }>
        <div 
          onMouseEnter={_ => { setDecrementFocused(true); }}
          onFocus={_ => { setDecrementFocused(true); }}
          onMouseLeave={_ => { setDecrementFocused(false); }}
          onBlur={_ => { setDecrementFocused(false); }}
          style={{
            borderRight: `solid .08em ${decrementFocused ? "#FFB3F2" : "#777"}`,
            borderBottom: `solid .08em ${decrementFocused ? "#FFB3F2" : "#777"}`,
            width: ".3em",
            height: ".3em",
            transform: "rotate(45deg)",
            cursor: "pointer",
            marginBottom: ".15em"
          }}/>
    </ClickNHold>
  </div>
}