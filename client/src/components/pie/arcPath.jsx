import React from "react";
import path from "./path";

export default function ArcPath(props) {
  const {
    size,
    angle,
    total,
    fill,
    value,
    className,
    innerRadius,
    outerRadius,
    glow
  } = props;
  const activeAngle =
    Number.isNaN(value / total) || total / value === 1
      ? 359.99
      : (value / total) * 360;
  const d = path(activeAngle, angle, size, innerRadius, outerRadius);
  return (
    <path
      className={className}
      d={d}
      fill={fill}
      filter={glow ? "url(#neon)" : null}
    />
  );
}