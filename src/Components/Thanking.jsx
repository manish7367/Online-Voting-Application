import React from 'react'
import { Link } from 'react-router-dom'
import './Thanking.css'

const Thanking = () => {
  return (
    <div className='result-container'>
    <h1>Thanks for Voting.Results will be declared soon!!.</h1>
    <button className='result-btn'><Link to={'/'} style={{textDecoration: "none",color: "white",fontFamily: "Cursive"}}>Go Back To Home Page</Link></button>
    </div>
  )
}

export default Thanking