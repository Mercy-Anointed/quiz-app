import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./component/welcome";
import QuizContent from "./component/quizcontent";
import Result from "./component/result";

function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="quiz" element={<QuizContent/>}/>
        <Route path="result" element={<Result/>}/>
      </Routes>
    </Router>
  )
}
export default App