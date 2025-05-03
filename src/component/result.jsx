import React from 'react'
import {  useLocation, useNavigate } from 'react-router-dom'

const Result = () => {
    const navigate = useNavigate()
    const location = useLocation()
    
    const {userName, score, totalQuestions} = location.state? location.state : {score: 0, totalQuestions: 5}

    function handleRestart(){
        navigate("/")
    }
  return (
    <div className='container'>
      <div  >
      <h1>Quiz Completed</h1>
      </div>
        <h2> {userName.name} </h2>
        <p>Your score is <b>{score}</b> out of  <b> {totalQuestions} </b>Questions</p>
        <button className='button' onClick={handleRestart}>
            Restart Quiz
        </button>
    </div>
  )
}

export default Result