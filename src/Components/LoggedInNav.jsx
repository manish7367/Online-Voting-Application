import React, {useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../App';
const LoggedInNav = () => {

  const {loginData,setLoginData} = useContext(UserContext);

  const navigate = useNavigate();

  const logoutUser = async()=>{
    let token = localStorage.getItem('usersDataToken');

    const res = await fetch('http://localhost:5000/api/auth/logOut',{
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
        Accept: "application/json"
      },
      credentials: "include"
    });

    const data = await res.json();
    // console.log(data);
    if(data.status ==201){
      console.log("User logged out");
      localStorage.removeItem('usersDataToken');
      setLoginData("");
      navigate('/');
    }
    else{
      console.log("error"); 
    }
  }

  const navLinksStyle = {
    color : "white",
    textDecoration: "none"
  };
  return (
    <>
      <div className="header">
        <div className="navbar">
          <ul className="nav-item-container">
            <li className="nav-items"><Link to="/personalInfo" style={navLinksStyle}>Personal Info</Link></li>
            {!loginData.hasVoted ?
            (<li className="nav-items"><Link to="/vote" style={navLinksStyle}>Vote</Link></li>)
            : ""
            }
            <li className="nav-items"><button onClick={logoutUser} style={{border: "none" , outline: "none", background: "transparent", color: "white", cursor: "pointer" }}>Logout</button></li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default LoggedInNav