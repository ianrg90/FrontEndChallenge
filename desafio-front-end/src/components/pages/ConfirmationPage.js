import React, {useContext} from "react";
import WrapCard from "../UI/WrapCard";
import Buttons from "../UI/Buttons";
import classes from "./ConfirmationPage.module.css";
import UserContext from "../../store/user-context";

function ConfirmationPage() {

  const amountCtx = useContext(UserContext)
  const {amountOfQuestionsSelected: amount, handlePageRendering, fetchQuestions  } = amountCtx
  
  function cancel () {
    handlePageRendering("backToWelcomePage")
  }

  function questionsHandler () {
    fetchQuestions(amount)
  }

  return (
    <WrapCard className={classes.card}>
      <div className={classes.content}>
        <p>You wish to proceed with {amount} question ?</p>
        <div className={classes.actions}>
          <Buttons onClick = {questionsHandler} variant="contained" text={"Start!"} />
          <Buttons onClick = {cancel} variant="outlined" color="error" text={"Cancel"} />
        </div>
      </div>
    </WrapCard>
  );
}

export default ConfirmationPage;
