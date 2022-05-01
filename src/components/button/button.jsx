import { useState } from 'react';

export default function Button(props) {
    const [ backgroundColor, setBackgroundColor ] = useState("#333");
    const [ fillColor, setFillColor ] = useState("white");
    return <button 
        onClick={props.onClick}
        onMouseEnter={_ => { setBackgroundColor("#FFB3F2"); setFillColor("#333"); }}
        onFocus={_ => { setBackgroundColor("#FFB3F2"); setFillColor("#333") }}
        onMouseLeave={_ => { setBackgroundColor("#333"); setFillColor("white") }}
        onBlur  ={_ => { setBackgroundColor("#333"); setFillColor("white") }}
        style={{
            fontSize: ".5em",
            width: "1em",
            height: "1em",
            backgroundColor: backgroundColor,
            boxSizing: "content-box",
            padding: ".35em",
            borderTop: "solid 1px #444",
            borderBottom: "solid 1px #444",
            cursor: "pointer",
            fill: fillColor,
            borderRight: props.left ? "none" : "solid 1px #444",
            borderLeft: "solid 1px #444",
            borderRadius: props.alone ? "15%" : props.left ? "15% 0 0 15%" : props.right ? "0 15% 15% 0" : null,
            ...props.style
        }}>
            {props.children}
        </button>
}