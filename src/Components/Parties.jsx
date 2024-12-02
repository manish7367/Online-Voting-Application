import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { RiArrowRightSLine } from "react-icons/ri";
import voteStyle from'./Vote.module.css';
import { useState } from 'react';
const Parties = ({candidate,partyName,partyLogo,candidateAge,education,onSubmit}) => {
  const [expand, setExpand] = useState(false);
  const handleExpansion = () =>{
    if(!expand){
    setExpand(true);
    }
    else{
      setExpand(false)
    }
  }
  return (
    <>
      <div className={!expand ? voteStyle["party-container"] : voteStyle["expanded-container"]}>
        <input type='radio' className={voteStyle['checkbox-round']} name='candidateName' value={candidate} onChange={(e)=> onSubmit({candidate:e.target.value,party:partyName})}/>
        <span className={voteStyle['candidate-name']}>{candidate}</span>
        <span className={voteStyle['party-name']}>{partyName}</span>
        <img className={voteStyle['party-logo']} src={partyLogo} height={30} width={50}/>
        <button className={voteStyle['expand']} onClick={handleExpansion}>
        {!expand ? <IoIosArrowDown style={{fontSize: "40px"}}/> : <RiArrowRightSLine  style={{fontSize: "50px"}}/>}
        </button>
      </div>
      {expand &&
        <div className={voteStyle["description"]}>
        <span className={voteStyle["name-candidate"]}>Name : {candidateName}</span>
        <span className={voteStyle["age-candidate"]}>Age : {candidateAge}</span>
        <span className={voteStyle["party-candidate"]}>Party : {partyName}</span>
        <span className={voteStyle["qualification"]}>Education : {education}</span>
      </div>
      }
      
    </>
  )
}

export default Parties