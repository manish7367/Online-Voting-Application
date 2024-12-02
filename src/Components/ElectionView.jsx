import React from 'react'
import "./Elections.css";

const ElectionView = ({stateElection,date}) => {
  return (
    <>
      <div className='election-flex'>
        <span>{stateElection}</span>
        <span>{date}</span>
      </div>
    </>
  )
}

export default ElectionView