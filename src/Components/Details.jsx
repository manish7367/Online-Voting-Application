import React from 'react'
import './PersonalInfo.css';

const Details = ({title,value}) => {
  return (
    <>
      <div className="info-container">
        <span className='title-info'>{title}</span>
        <span className='value-info'>{value}</span>
      </div>
    </>
  )
}

export default Details