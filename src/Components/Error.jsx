import React from 'react'
import './Error.css';
import { Link } from 'react-router-dom';
const Error = () => {
  return (
    <>
    <section className='error-section'>
      <div className="error-image">
        <img src='http://localhost:5173/public/error.png' height={200} width={200}/>
      </div>
     <h1>Page not found</h1>
     <h3 style={{marginTop: "10px"}}><Link to='/' style={{textDecoration:"none",color:"white"}}>Go to home page</Link></h3>
    </section>
    </>
  )
}

export default Error