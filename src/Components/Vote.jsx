import React, { useState, useEffect, useContext} from 'react'
import Parties from './Parties'
import voteStyle from'./Vote.module.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
const Vote = () => {
  const {loginData,setLoginData} = useContext(UserContext);

  const [userVote, setUserVote] = useState({
    candidateName: "",
    party: ""
  });

  const [userVoted, setUserVoted] = useState(false);

  const navigate = useNavigate();

  const getData = (data) =>{
    setUserVote({
      candidateName: data.candidate,
      party: data.party
    });
    setUserVoted(true);
    // console.log(data);
  }
  // console.log(userVote);

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
    if(data.status===401 || !data || data.ValidUserOne.hasVoted){
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

  const handleVoteSubmit = async() =>{
    try{
      const postUserResponse = await fetch("http://localhost:5000/api/auth/vote",{
        method: "POST",
        headers: {
         'Content-Type': "application/json",
        },
        body: JSON.stringify(userVote)
      });
      if(postUserResponse.ok){
        navigate('/thanking');
      }
      console.log(postUserResponse);
    }
      catch(err){
        console.log(err);
      }
  };

  const updateVotedStatus = async()=>{
    try {
      const res = await fetch(`http://localhost:5000/api/auth/updateVoteStatus/${loginData._id}`,{
        method: "PUT",
        headers: {
          "Content-Type":"application/json"
        },
        body:JSON.stringify({userVoted})
      });
      const data = await res.json();
      if(data.status===201){
        console.log("User voted count set");
        // setLoginData(data.updateUserVoted);
      }
      else{
        console.log("Could not set User Vote count");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className={voteStyle["vote-container"]}>
        <div className={voteStyle["vote-heading"]}>
          <h1>Voting Panel</h1>
        </div>
        <div className={voteStyle["parties"]}>
          <div>
          <Parties candidate="Mamta Banerjee" partyName="Trinamool Congress" partyLogo="tmc.webp" candidateAge={58} education="BA  (English Hons.)" onSubmit={getData}/>
          </div>
          <div>
          <Parties candidate="Narendra Modi" partyName="BJP" partyLogo="bjp.png" candidateAge={47} education="BCom" onSubmit={getData}/>
          </div>
          <div>
          <Parties candidate="Rahul Gandhi" partyName="Congress" partyLogo="congress.png" candidateAge={67} education="BSC (Mathematics Hons.)" onSubmit={getData}/>
          </div>
          <div>
          <Parties candidate="Arvin Kejriwal" partyName="AAP" partyLogo="aap.png" candidateAge={45} education="Btech(Electrical)" onSubmit={getData}/>
          </div>
        </div>
        <div>
        <input type='checkbox' required/>
        <span> I have selected {userVote.candidateName} from {userVote.party} as my candidate</span>
        <button type='submit' className={voteStyle["vote-submit"]} onClick={()=>{
          updateVotedStatus();
          handleVoteSubmit();
        }}>Submit</button>
        </div>
      </div>
      
    </>
  )
}

export default Vote