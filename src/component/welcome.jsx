import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

const Welcome = () => {
const navigate = useNavigate();
const [userName, setUserName] = useState({
    name:""
})
const [error, setError] = useState({})

function inputHandler (e){
    setUserName({...userName, [e.target.id] : e.target.value});
    setError({...error, [e.target.id] : ""})
   
}

function validate(){
    const newError = {};
    if (!userName.name.trim()) newError.name = "name is required";

    return newError
}
 function formHandler(e){
    e.preventDefault()
    const validateError = validate()
    if (Object.keys(validateError).length > 0){
        setError(validateError)
    } else{
        navigate("/quiz", {state:{userName}})
    }
 }


  return (
    <div className='container'>
        <form onSubmit={formHandler}>
        <h1>Welcome To Quiz App</h1>
        <input style={{
            fontSize:"20px",
            padding:"10px",
            borderRadius:"10px"
        }} type="text" id='name' value={userName.name} onChange={inputHandler} placeholder='Enter your name'/>
       {error.name && <div style={{color: "red"}}>{error.name}</div>   }
        <br />
        <button className='button' type='submit'>Start Quiz</button>
        </form>
    </div>
  )
}

export default Welcome