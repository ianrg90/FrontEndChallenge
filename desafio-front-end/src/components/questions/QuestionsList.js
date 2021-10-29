import React, { useContext } from "react";
import UserContext from "../../store/user-context";
import classes from "./QuestionsList.module.css";
import Modal from "../UI/Modal";
import ListItem from "./ListItem";
import Buttons from "../UI/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function QuestionsList() {
  const dataCtx = useContext(UserContext);
  const { appState, questions, showReport } = dataCtx;

  const isLoading = appState.loading;
  const error = appState.error;
  const hasInvalidInput = appState.inputIsInvalid;

  const questionList = questions.map((item, index) => {
    const questionNumber = index + 1;
    const question = item.question;
    const right = item["correct_answer"];
    const mixedOptions = [...item["incorrect_answers"], right].sort();

    return (
      <ListItem
        id={question}
        key={question}
        question={question}
        right={right}
        options={mixedOptions}
        questionNumber={questionNumber}
      />
    );
  });

  let toRender;

  if (isLoading) {
    toRender = (
      <div className={classes.content}>
        <p>
          Loading questions list{" "}
          <FontAwesomeIcon icon={faSpinner} color="gray" />
        </p>
      </div>
    );
  } else if (!isLoading && !error) {
    toRender = (
      <div className={classes.content}>
        <ul>{questionList}</ul>
        {hasInvalidInput && (
          <p style={{ color: "red" }}>Please fill all answers fields.</p>
        )}
        <Buttons
          text={"Submit questions"}
          variant={"contained"}
          onClick={showReport}
        />
      </div>
    );
  } else {
    toRender = (
      <div className={classes.content}>
        <p>{error}</p>
        <p>Please refresh the page and try again.</p>
      </div>
    );
  }

  return <Modal className={classes.card}>{toRender}</Modal>;
}

export default QuestionsList;
