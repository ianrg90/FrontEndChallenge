import React, { useRef, useContext } from "react";
import classes from "./ListItem.module.css";
import UserContext from "../../store/user-context";

function ListItem(props) {
  const userInput = useRef();
  const {getUserAnswers} = useContext(UserContext)


  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  const question = decodeHtml(props.question);
  const options = props.options.map((option) => decodeHtml(option));
  const right = decodeHtml(props.right);
  const number = props.questionNumber

  function getInput() {
    const answer = {
      number,
      question: userInput.current.name,
      userAnswer: userInput.current.value,
      right: right,
    };

  getUserAnswers(answer)
  }

  const dropdown = (
    <select ref={userInput} name={question} onBlur={getInput}>
      <option id={question} value=""></option>
      {options.map((option) => {
        return (
          <option id={question} key={option} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );

  return (
    <li className={classes["list-item"]}>
      <div className={classes.question}>{question}</div>
      <div className={classes.dropdown}>{dropdown}</div>
    </li>
  );
}

export default ListItem;
