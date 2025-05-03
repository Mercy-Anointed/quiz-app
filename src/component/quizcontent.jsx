import React, {useEffect, useState} from 'react'
import questions from './question'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'


const QuizContent = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const userName= location.state ?.userName || null
    const [questionNo, setQuestionNo] = useState(0)
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(60 * 1000);
    const [selected, setSelected] = useState(null)
    const [answered, setAnswered] = useState(false)
    const correctSound = new Audio('/correct.mp3')
    const wrongSound = new Audio('/wrong.mp3')

    useEffect(() =>{
      if (time > 0){
        const timer = 
        setTimeout(() => {
          setTime(time - 1000)
        }, 1000)

        return () => clearTimeout(timer)
      } else {
        setTime(0)
        navigate("/result", {state:{userName, score, totalQuestions:questions.length}})
      }
      
    }, [time, navigate, score, userName]);

    function timeHandler(milliseconds){
      let totalSeconds = Math.floor(milliseconds / 1000);
      let totalMinutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;
      
      return `${totalMinutes}: ${totalSeconds}`

     
    }
    function nextHandler (){
        if (questionNo < questions.length - 1) {
            setQuestionNo(questionNo + 1);
            setSelected(null)
            setAnswered(false)
           
        } else {
            navigate("/result", {state:{userName, score, totalQuestions:questions.length}});
        }
       
        
    }

    function handleAnswer(option){
      if (answered) return; 
      setSelected(option);
      setAnswered(true)
       if (option === questions[questionNo].correct) {
        correctSound.play();
        setScore(score + 1)
       } else {
        wrongSound.play();
        setScore(score)
       }
    }
    
  return (
    <motion.div className='container'
    initial={{opacity:0, y:20}}
    animate={{opacity:1, y:0}}
    transition={{duration:0.5}}>
     
      <div className='navbar'>
         <h2>{userName.name}</h2>
         <h2>TimeLeft:  {timeHandler(time)}</h2> 
        
      </div>
      <div >
       
        <h2 >Questions: {questionNo + 1} / {questions.length}</h2>
        <h3 style={{marginBottom:"30px"}}>{questions[questionNo].quest}</h3>
        {questions[questionNo].options.map((option, index) => 
        <motion.button className={`question-btn ${
          answered  ?  option === questions[questionNo].correct ? 'correct' : option === selected ?  'wrong' : '' : '' 
        }`} key={index} onClick={() => handleAnswer(option)} disabled={answered}
        whileTap={{scale:0.95}}
        whileHover={{scale:1.05}}
        transition={{type:"spring", stiffness:300}}>{option}</motion.button>
        )}
        
       

        <motion.button className='button' onClick={nextHandler}>Next</motion.button>
        </div>
    </motion.div>
  )
}

export default QuizContent