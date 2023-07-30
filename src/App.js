import "./App.css";
import React, { useState } from "react";
import { Textfit } from "react-textfit";
import Button from "./components/Button";
const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];
const App = () => {
  return (
    <div className="content-body ">
      <div className="wrapper">
        <Textfit className="screen" mode="single" max={70}>
          {/* {calc.num ? calc.num : calc.res} */}
        </Textfit>
        <div className="buttonBox">
          {btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={btn === "=" ? "equals" : ""}
                value={btn}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
