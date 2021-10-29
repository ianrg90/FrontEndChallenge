import React, { useRef, useContext, useEffect, useState } from "react";
import WrapCard from "../UI/WrapCard";
import classes from "./WelcomePage.module.css";
import Buttons from "../UI/Buttons";
import UserContext from "../../store/user-context";

function WelcomePage() {
  const [hasReportInLocalStorage, setHasReportInLocalStorage] = useState(false);
  const [inputIsInvalid, setInputIsInvalid] = useState(false);
  const userInputRef = useRef();
  const { getAmount, handlePageRendering, getLastReport } =
    useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("lastReport")) {
      setHasReportInLocalStorage(true);
    } else {
      setHasReportInLocalStorage(false);
    }
  }, [hasReportInLocalStorage]);

  function deleteLastReport() {
    localStorage.removeItem("lastReport");
    setHasReportInLocalStorage(false);
  }

  function amount() {
    const userInput = userInputRef.current.value;
    const userInputToNum = +userInput;

    if (
      userInput.trim().length === 0 ||
      userInputToNum <= 0 ||
      userInputToNum > 50
    ) {
      setInputIsInvalid(true);
      return;
    }
    setInputIsInvalid(false);
    handlePageRendering("confirmationPage");
    getAmount(userInput);
  }

  let localStorageWarning = (
    <div className={classes["second-card"]}>
      <label>Looks like you have a report saved!</label>
      <div className={classes["report-actions"]}>
        <Buttons
          text={"See report"}
          variant={"contained"}
          onClick={getLastReport}
        />
        <Buttons
          text={"Delete"}
          variant={"outlined"}
          color={"error"}
          onClick={deleteLastReport}
        />
      </div>
    </div>
  );

  let invalidText = <p>Please enter a valid input (1-50)</p>;

  return (
    <WrapCard className={classes.card}>
      <div className={classes.content}>
        <label htmlFor="number-of-questions">
          Please select the number of question you wish to answer?
        </label>
        <input ref={userInputRef} type="number" id="number-of-questions" min = "1" max = "50" />
        {inputIsInvalid && invalidText}
        <div className={classes.actions}>
          <Buttons onClick={amount} variant={"contained"} text={"Proceed!"} />
        </div>
        {hasReportInLocalStorage && localStorageWarning}
      </div>
    </WrapCard>
  );
}

export default WelcomePage;
