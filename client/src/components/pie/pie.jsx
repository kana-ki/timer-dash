import React from "react";
import ArcPath from "./arcPath";

export default function Pie(props) {
  const color = props.color || "#FFB3F2";
  let {
    size,
    value,
    className
  } = props;
  value = value > 1 ? 1 : value;
  value = value < 0 ? 0 : value;
  return (
    <svg
      className={className}
      style={{ width: `${size}px`, height: `${size}px`, ...props.style }}
      viewBox={`-10 -10 ${size+20} ${size+20}`}>

      <filter id="neon">
        <feFlood floodColor={color} floodOpacity="0.8" in="SourceGraphic" />
        <feComposite operator="in" in="SourceGraphic" />
        <feGaussianBlur stdDeviation="4" />
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <g className={className}>
          <ArcPath
            className={`arcpath-percentage`}
            size={size}
            value={value*100}
            innerRadius={1}
            outerRadius={.85}
            fill={color}
            angle={270}
            total={100}
            glow
          />
          <ArcPath
            className={`arcpath-remaining`}
            size={size}
            value={100-(value*100)}
            innerRadius={1}
            outerRadius={.85}
            fill={"#333"}
            angle={270 + (value * 360)}
            total={100}
          />
      </g>
    </svg>
  );
}