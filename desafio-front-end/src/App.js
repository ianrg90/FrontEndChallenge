import React, { Fragment, useContext } from "react";
import ConfirmationPage from "./components/pages/ConfirmationPage";
import WelcomePage from "./components/pages/WelcomePage";
import QuestionsList from "./components/questions/QuestionsList";
import Report from "./components/report/Report";
import UserContext from "./store/user-context";

function App() {
  
  const {appState} = useContext(UserContext)
  const isUserDone = appState.isUserDone
  const didUserSelectedAmount = appState.didUserSelectedAmount
  const shallRenderList = appState.continueToList
  const displayLastReport = appState.userWantToCheckLastReport

  return (
    <Fragment>
      {!didUserSelectedAmount && !shallRenderList && !isUserDone && !displayLastReport &&(
        <WelcomePage/>
      )}
      {didUserSelectedAmount && !shallRenderList && !isUserDone && (
        <ConfirmationPage />
      )}
      {shallRenderList && !isUserDone  && <QuestionsList />}
      {isUserDone && <Report/>}
      {displayLastReport && <Report/>}
    </Fragment>
  );
}

export default App;
