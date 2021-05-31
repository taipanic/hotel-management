import React, { useState } from "react";

import WidgetSuper from "./../../common/Widget";

export default function Test() {
  const [store, setStore] = useState({ a: "a", b: "b" });
  console.log("test");
  return (
    <React.Fragment>
      <div>
        <WidgetSuper />
        <Wrapper store={store} />
      </div>
    </React.Fragment>
  );
}

function Wrapper({ store }) {
  console.log("wrapper");

  const [a, setA] = useState("a");
  const [b, setB] = useState("b");
  const [text, setText] = useState("");

  return (
    <React.Fragment>
      <Widget thing={a} />
      <Widget thing={b} />
      <input type="text" onChange={(e) => setText(e.target.value)} />
    </React.Fragment>
  );
}

function Widget({ thing }) {
  console.log("widget");
  const backgroundColor = randomRgb();

  return (
    <React.Fragment>
      <div style={{ height: 100, width: 100, backgroundColor }}>{thing}</div>
    </React.Fragment>
  );
}

function randomRgb() {
  console.log(randomBetween(0, 100));
  const r = randomBetween(0, 255);
  const g = randomBetween(0, 255);
  const b = randomBetween(0, 255);
  const rgb = `rgb(${r},${g},${b})`;
  return rgb;
}

function useRandomRgb() {
  console.log(randomBetween(0, 100));
  const r = randomBetween(0, 255);
  const g = randomBetween(0, 255);
  const b = randomBetween(0, 255);
  const rgb = `rgb(${r},${g},${b})`;
  return rgb;
}

function randomBetween(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}
