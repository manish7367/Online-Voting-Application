import React, { useState } from 'react'
import './ResetPasswordMail.css';

const ResetPasswordMail = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const setValEmail = (e)=>{
    setEmail(e.target.value);
  }
  console.log(email);
  const sendLink = async(e) =>{
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/sendPasswordLink",{
        method: "POST",
        headers: {
          'Content-Type': "application/json",
        },
        body:JSON.stringify({email})
      });
      const data = await res.json();
      if(data.status===200){
        setEmail("");
        setMessage(true);
      }
      else{
       alert("Invalid User");
      }
    } catch (error) {
      console.log(error);
    }
    
  }
  return (
    <>
      <section className='reset-mail'>
        <div className='reset-mail-image'>
          <img src='http://localhost:5173/public/resetImage.png' height='200px' width='200px'/>
        </div>
        <div className='reset-mail-form'>
          <div className='reset-form-heading'>
            <h1>Enter your Email</h1>
          </div>
          <div style={{textAlign: "center",marginTop: "5px"}}>
          {message ? <p style={{color: "blue", fontWeight: "bold"}}>Password reset link  sent successfully on your email</p>: ""}
          </div>
          <form className='reset-form' onSubmit={sendLink}>
            <div className='reset-form-input'>
              <label htmlFor='email'>Email</label>
              <input type='email' name='email' id='email' value={email} placeholder='Enter your email address' onChange={setValEmail} required/>
            </div>
            <button className='reset-mail-btn' type='submit'>Send</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default ResetPasswordMail