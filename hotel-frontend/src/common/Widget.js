import React from "react";

import { useInterval } from "./Hooks";

export default function Widget() {
  const [a, setA] = React.useState("rgb(0,0,0)");
  function handleClick() {
    setA(randomRgb());
  }

  const [rgb, setRgb] = React.useState("rgb(0,0,0)");
  useInterval(() => {
    setRgb(randomRgb());
  }, 1000);

  return (
    <div
      style={{
        backgroundColor: rgb,
        height: 300,
        width: 200,
      }}
    >
      <div style={{ width: 100, height: 100, backgroundColor: a }}></div>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

function randomRgb() {
  const r = randomBetween(0, 255);
  const g = randomBetween(0, 255);
  const b = randomBetween(0, 255);
  const rgb = `rgb(${r},${g},${b})`;
  return rgb;
}

function randomBetween(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}
