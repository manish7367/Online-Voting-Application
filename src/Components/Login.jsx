import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './Login.css';
import { Link } from 'react-router-dom';
const Login = () => {
  const [loginUser, setLoginUser] = useState({
    aadharNumber: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleLoginInput = (event) =>{
    const {name,value} = event.target;
    setLoginUser({
      ...loginUser,
      [name]: value
    });
  };

  const handleLoginSubmit = async(event) =>{
    event.preventDefault();
    try{
    const postUserResponse = await fetch("http://localhost:5000/api/auth/login",{
      method: "POST",
      headers: {
       'Content-Type': "application/json",
      },
      body: JSON.stringify(loginUser)
    });
    const res = await postUserResponse.json();
    console.log(res);
    if(postUserResponse.ok){
      localStorage.setItem('usersDataToken',res.token)
      setLoginUser({
        aadharNumber: "",
        password: ""
      });
      // console.log(postUserResponse.json());
      navigate('/elections');
    }
  }
    catch(err){
      console.log(err);
    }
  }

  const styleRegister={
    textDecoration: "none",
    color: "blue",
  }
  return (
    <>
      <div className='flex-container'>
        <div className='login-image-side'>
          <div className='login-image'>

          </div>
        </div>
        <div className='login-form'>
          <form onSubmit={handleLoginSubmit}>
          <h1>Login</h1>
          <label htmlFor='adharNo'>Aadhar Number</label>
          <input id='adharNo' className='input-field' type='text' name='aadharNumber'value={loginUser.aadharNumber} onChange={handleLoginInput} required/>
          <label htmlFor='password'>Password</label>
          <input id='password' className='input-field' type='password' name='password' value={loginUser.password} onChange={handleLoginInput} required/>
          <p className='color-blue forgot-para'><Link style={styleRegister} to="/resetPassword">Forgot Password?</Link></p>
          <p className='user-para'>Not a User ? <span className='login-register'><Link style={styleRegister} to="/register">Register Now</Link> </span></p>
          <button className='login-btn' type='submit'>Login</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login