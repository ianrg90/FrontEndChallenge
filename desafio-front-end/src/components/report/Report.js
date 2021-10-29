import React, { useContext } from "react";
import UserContext from "../../store/user-context";
import classes from "./Report.module.css";
import Buttons from "../UI/Buttons";
import Modal from "../UI/Modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

function Report() {
  const reportCtx = useContext(UserContext);
  const { finalUserAnswers, reset } = reportCtx;
  
  function resetApplication(){
    reset()
  }

  const total = finalUserAnswers.length;
  const rights = finalUserAnswers.filter(
    (item) => item.userAnswer === item.right
  ).length;
  const mistakes = total - rights;

  const data = finalUserAnswers.map((item) => {
    let toRender;

    if (item.userAnswer === item.right) {
      toRender = (
        <div className={classes["user-inputs"]}>
          <p>
            <FontAwesomeIcon icon={faCheck} color="green" />
            {item.userAnswer}
          </p>
        </div>
      );
    } else {
      toRender = (
        <div className={classes["user-inputs"]}>
          <p>
            <FontAwesomeIcon icon={faTimes} color="red" />
            {item.right}
          </p>
          <p>
            <FontAwesomeIcon icon={faCheck} color="green" />
            {item.userAnswer}
          </p>
        </div>
      );
    }

    return (
      <li key={item.number}>
        <div className={classes.info}>
          <p>{item.number})</p>
          <p>{item.question}</p>
        </div>
        {toRender}
      </li>
    );
  });

  return (
    
    <Modal >
      <div className = {classes.title}>
        <h1 >Results report</h1>
      </div>
      <div className={classes.score}>
        <h2>
          <FontAwesomeIcon icon={faCheck} className={classes["right-score"]} />
          {rights}
        </h2>
        <h2>
          <FontAwesomeIcon icon={faTimes} className={classes["wrong-score"]} />
          {mistakes}
        </h2>
      </div>
      <div className={classes.content}>
        <ul>{data}</ul>
      </div>
      <div className = {classes.actions} >
        <Buttons onClick = {resetApplication} text ={"Save report!"} variant = {"contained"}/>
      </div>
    </Modal>
  );
}

export default Report;
