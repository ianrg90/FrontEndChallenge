import React from "react";

const UserContext = React.createContext({
    amountOfQuestionsSelected : "",
    getAmout : (amount) => {},
    fetchQuestions: (amount) => {},
    appState: {},
    handlePageRendering: (page) => {},
    questions: undefined,
    getUserAnswers : (obj) => {},
    userAnswers : [],
    showReport: () => {},
    finalUserAnswers: [],
    reset: () => {},
    getLastReport: () => {},
    
})

export default UserContext