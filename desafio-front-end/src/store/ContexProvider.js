import React, { useState, useReducer } from "react";
import UserContext from "./user-context";

const defaultStates = {
  loading: false,
  error: null,
  inputIsInvalid: false, 
  isUserDone: false,
  didUserSelectedAmount: false,
  continueToList: false,
  userWantToCheckLastReport: false
};

function statesReducer(state, action) {
  if (action.type === "CONFIRMATION_PAGE") {
    return { ...state, didUserSelectedAmount: action.value };
  }
  if(action.type === "QUESTION_LIST"){
    return {...state, continueToList: action.value}
  }
  if(action.type === "INVALID_INPUT"){
    return {...state, inputIsInvalid: action.value}
  }
  if (action.type === "LOADING") {
    return { ...state, loading: action.value };
  }
  if (action.type === "ERROR") {
    return { ...state, error: action.value };
  }
  if (action.type === "DONE") {
    return { ...state, isUserDone: action.value };
  }
  if(action.type === "RESTART"){
    return  defaultStates
  }
  if(action.type === "CHECK_REPORT"){
    return {...state, userWantToCheckLastReport: action.value}
  }
  
  return defaultStates;
}

function ContextProvider(props) {
  const [userAmount, setUserAmount] = useState("");
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [finalUserAnswers, setFinalUserAnswers] = useState([]);

  const [appState, dispatchStateActions] = useReducer(
    statesReducer,
    defaultStates
  );

  function handlePageRendering(pageToRender) {
    if (pageToRender === "confirmationPage") {
      dispatchStateActions({ type: "CONFIRMATION_PAGE", value: true });
    }
    if (pageToRender === "backToWelcomePage") {
      dispatchStateActions({ type: "CONFIRMATION_PAGE", value: false });
    }
  }

  function getUserInputedAmount(value) {
    setUserAmount(value);
  }

  async function getQuestions(amount) {
    dispatchStateActions({type: "QUESTION_LIST", value : true})
    dispatchStateActions({ type: "ERROR", value: null });
    dispatchStateActions({ type: "LOADING", value: true });

    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${amount}.`
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();

      setQuestions(data.results);
    } catch (err) {
      dispatchStateActions({ type: "ERROR", value: err.message });
    }
    dispatchStateActions({ type: "LOADING", value: false });
  }

  function userAnswersInfo(obj) {
    if (obj.userAnswer.length === 0) {
      return;
    }
    if (userAnswers.some((item) => item.question === obj.question)) {
      setUserAnswers((prevState) => {
        const removingOldAnswer = prevState.filter(
          (item) => item.question !== obj.question
        );
        return removingOldAnswer.concat(obj);
      });
    } else {
      setUserAnswers((prevState) => {
        return prevState.concat(obj);
      });
    }
  }

  function handleReport() {
    if (userAnswers.length !== questions.length) {
      dispatchStateActions({type: "INVALID_INPUT", value:true})
      return;
    }
    const sortedAnswers = userAnswers.sort((a, b) => {
      const [prev, next] = [a.number, b.number];
      return prev > next ? 1 : -1;
    });

    setFinalUserAnswers(sortedAnswers);
    

    dispatchStateActions({ type: "DONE", value: true });

  }

  function restartApp (){
    localStorage.setItem("lastReport", JSON.stringify(finalUserAnswers))
    setUserAnswers([])
    setFinalUserAnswers([])
    dispatchStateActions({type: "RESTART"})
  }

  function displayLastReport(){
    dispatchStateActions({type: "CHECK_REPORT", value: true})
    setFinalUserAnswers(JSON.parse(localStorage.getItem("lastReport")))
  }


  const userContext = {
    amountOfQuestionsSelected: userAmount,
    getAmount: getUserInputedAmount,
    fetchQuestions: getQuestions,
    appState,
    handlePageRendering,
    questions,
    getUserAnswers: userAnswersInfo,
    userAnswers,
    showReport: handleReport,
    finalUserAnswers,
    reset: restartApp,
    getLastReport: displayLastReport,
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
}

export default ContextProvider;
