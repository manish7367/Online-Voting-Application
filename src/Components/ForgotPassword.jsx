import React, { useEffect, useState } from 'react'
import './ForgotPassword.css';
import { useNavigate, useParams } from 'react-router-dom';

const ForgotPassword = () => {
  
  const {id,token} = useParams();

  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState(false);

  const handleInput = (e)=>{
    setNewPassword(e.target.value);
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/auth/${id}/${token}`,{
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({newPassword})
      });
  
      const data = await res.json();
  
      if(data.status===201){
        setNewPassword("");
        setMessage(true);
      }
      else{
        alert("Token expired. Generate new Link");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const userValid = async()=>{
    const res = await fetch(`http://localhost:5000/api/auth/forgotPassword/${id}/${token}`,{
      method: "GET",
      headers: {
        "Content-Type":"application/json"
      }
    });

    const data = await res.json();

    if(data.status===201){
      console.log("User Valid");
    }
    else{
      navigate("*");
    }
  }

  useEffect(()=>{
    userValid();
  },[]);

  return (
    <>
    <div className='message-success'>
    {message ? <h2 style={{color:"blue"}}>Password Reset Successful</h2>: ""}
    </div>
    <div className='flex-container-forgot'>
        <div className='password-image-side'>
          <img src='http://localhost:5173/public/reset-password.png' height="300px" width='300px'/>
        </div>
        <div className='password-form'>
          <form onSubmit={handleSubmit}>
          <h1>Reset Password</h1>
          <label htmlFor='password'>New Password</label>
          <input id='password' className='input-field' type='password' value={newPassword} onChange={handleInput}required/>
          <button className='password-btn' type='submit'>Reset Password</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword