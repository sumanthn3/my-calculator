import React, { useState } from "react";

import Button from "./Button/Button";
import { btnValues, toLocaleString, removeSpaces, math } from "../utils/helper";

const zeroDivisionError = "Can't divide with 0";
const Calculator = () => {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          removeSpaces(calc.num) % 1 === 0 && !calc.num.toString().includes(".")
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const comaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc((prevCalc) => {
      const { num } = prevCalc;

      if (!num.toString().includes(".")) {
        return {
          ...prevCalc,
          num: num + value,
        };
      }

      return prevCalc; // If the number already contains a decimal point, return the current state as is
    });
  };

  const performCalculationAndUpdateState = (res, num, sign) => {
    if (!num || !res) {
      return res || num || ""; // If either num or res is missing, just return the existing value
    }

    const parsedRes = Number(removeSpaces(res));
    const parsedNum = Number(removeSpaces(num));
    return toLocaleString(math(parsedRes, parsedNum, sign));
  };

  const signClickHandler = (e) => {
    const newSign = e.target.innerHTML;
    setCalc((prevCalc) => {
      const { res, num, sign } = prevCalc;

      const newRes = performCalculationAndUpdateState(res, num, sign);

      return {
        ...prevCalc,
        sign: newSign,
        res: newRes,
        num: 0,
      };
    });
  };

  const performCalculation = (res, num, sign) => {
    const parsedRes = Number(removeSpaces(res));
    const parsedNum = Number(removeSpaces(num));

    if (num === "0" && sign === "/") {
      return zeroDivisionError;
    }

    return toLocaleString(math(parsedRes, parsedNum, sign));
  };

  const equalsClickHandler = () => {
    setCalc((prevCalc) => {
      const { sign, num, res } = prevCalc;

      if (sign && num) {
        return {
          ...prevCalc,
          res: performCalculation(res, num, sign),
          sign: "",
          num: 0,
        };
      }

      return prevCalc; // If no calculation is possible, return the current state as is
    });
  };

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
      sign: "",
    });
  };

  const calculatePercentage = (num, res) => {
    const parsedNum = num ? parseFloat(removeSpaces(num)) : 0;
    const parsedRes = res ? parseFloat(removeSpaces(res)) : 0;
    return {
      num: parsedNum / 100,
      res: parsedRes / 100,
      sign: "",
    };
  };

  const percentClickHandler = () => {
    setCalc((prevCalc) => {
      return {
        ...prevCalc,
        ...calculatePercentage(prevCalc.num, prevCalc.res),
      };
    });
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  const buttonClickHandler = (e, btn) => {
    switch (btn) {
      case "C":
      case "CE":
      case calc.res === zeroDivisionError:
        resetClickHandler();
        break;

      case "+-":
        invertClickHandler();
        break;

      case "%":
        percentClickHandler();
        break;

      case "=":
        equalsClickHandler();
        break;

      case "/":
      case "X":
      case "-":
      case "+":
        signClickHandler(e);
        break;

      case ".":
        comaClickHandler(e);
        break;

      default:
        numClickHandler(e);
    }
  };

  return (
    <div className="content-body ">
      <div className="wrapper">
        <h1 className="screen" mode="single" max={70}>
          {calc.num ? calc.num : calc.res}
        </h1>
        <div className="buttonBox">
          {btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={btn === "=" ? "equals" : ""}
                value={btn}
                onClick={(e) => buttonClickHandler(e, btn)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
