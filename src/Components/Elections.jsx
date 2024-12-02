import React, { useContext, useEffect } from 'react'
import LoggedInNav from './LoggedInNav'
import "./Elections.css";
import ElectionView from './ElectionView';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';

const Elections = () => {
  const {loginData,setLoginData} = useContext(UserContext);
  // console.log(loginData);
  const navigate = useNavigate();

  const ElectionValid = async()=>{
    let token = localStorage.getItem('usersDataToken');

    const res = await fetch('http://localhost:5000/api/auth/validUser',{
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });

    const data = await res.json();
    // console.log(data);
    if(data.status===401 || !data){
      navigate("*");
    }
    else{
      console.log("User Verified");
      setLoginData(data.ValidUserOne);
    }
  }

  useEffect(()=>{
    ElectionValid();
  },[]);

  return (
    <>
      <LoggedInNav/>
      <div className='elections-container'>
        <div className='user-voting-election'>
          <h1 className='election-h1'>Vote For:</h1>
          <ElectionView stateElection="UP State Election" date="02-04-2024"/>
        </div>
        <div className='other-elections'>
        <h1 className='election-h1'>Other Upcoming Elections:</h1> 
        <div className='other-state-elections'>
        <ElectionView stateElection="Manipur State Election" date="02-05-2024"/>
        <ElectionView stateElection="Bihar State Election" date="12-06-2024"/>
        <ElectionView stateElection="Karnataka State Election" date="24-07-2024"/>
        <ElectionView stateElection="Uttarakhand State Election" date="15-09-2024"/> 
        </div> 
        </div>
      </div>
    </>
  )
}

export default Elections