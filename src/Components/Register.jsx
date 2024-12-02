import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './Register.css';

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    dateOfBirth: "",
    gaurdian: "",
    email: "",
    phone: "",
    password: "",
    aadharNumber: "",
    cpassword: ""
  });

  const navigate = useNavigate();

  const handleInput = (e) =>{
    console.log(e.target.name);
    const name = e.target.name;
    const value = e.target.value;
    console.log(typeof value);
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleFormSubmit = async(event) =>{
    event.preventDefault();
    console.log(user);
    try{
    const postUserResponse = await fetch("http://localhost:5000/api/auth/register",{
      method: "POST",
      headers: {
       'Content-Type': "application/json",
      },
      body: JSON.stringify(user)
    });
    if(postUserResponse.ok){
      setUser({
        name: "",
        dateOfBirth: "",
        gaurdian: "",
        email: "",
        phone: "",
        password: "",
        aadharNumber: "",
        cpassword: "",
      });
      navigate('/login');
    }
    console.log(postUserResponse);
  }
    catch(err){
      console.log(err);
    }
  };

  return (
    <>
      <div className='register-container'>
        <div className="register-image-side">
          <div className="register-image">

          </div>
        </div>
        <div className="registration-form">
          <h1>Registration Form</h1>
          <form onSubmit={handleFormSubmit}>
            <div className='form-inputs'>
              <label htmlFor='name'>Name</label>
              <input type='text' className='input-field' id='name' name='name' value={user.name} onChange={handleInput} required/>
            </div>
            <div className='form-inputs'>
              <label htmlFor='dob'>Date Of Birth</label>
              <input type='date' className='input-field' id='dob'name='dateOfBirth' value={user.dateOfBirth} onChange={handleInput} required/>
            </div>
            <div className='form-inputs'>
              <label htmlFor='fatherName'>Father's Name/Mother's Name</label>
              <input type='text' className='input-field' id='fatherName'name='gaurdian' value={user.gaurdian} onChange={handleInput} required/>
            </div>
            <div className='form-inputs'>
              <label htmlFor='email'>Email</label>
              <input type='email' className='input-field' id='email'name='email' value={user.email} onChange={handleInput} required/>
            </div>
            <div className='form-inputs'>
              <label htmlFor='phone'>Mobile Number</label>
              <input type='phone' className='input-field' id='phone' name='phone' value={user.phone} onChange={handleInput} required/>
            </div>
            <div className='form-inputs'>
              <label htmlFor='password'>Password</label>
              <input type='password' className='input-field' id='password' name='password' value={user.password} onChange={handleInput} required/>
            </div>
            <div className='form-inputs'>
              <label htmlFor='repassword'>Re Enter Password</label>
              <input type='password' className='input-field' id='repassword' name='cpassword' value={user.cpassword} onChange={handleInput} required/>
            </div>
            <div className='form-inputs'>
              <label htmlFor='adhar'>Aadhar Number</label>
              <input type='text' className='input-field' id='adhar' name='aadharNumber' value={user.aadharNumber} onChange={handleInput} required/>
            </div>
            <button type='submit' className='register-btn'>Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register