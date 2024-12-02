import React, { useContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import LoggedInNav from './LoggedInNav'
import Details from './Details';
import './PersonalInfo.css';
import { CiEdit } from "react-icons/ci";
import { FcExternal } from "react-icons/fc";
import { UserContext } from '../App';
const PersonalInfo = () => {
  const {loginData,setLoginData} = useContext(UserContext);
  console.log("Login data",loginData);
  const [profilePicture, setProfilePicture] = useState('');
  const [profileUrl, setProfileUrl] = useState('');

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


  const handleEdit = (e) =>{
    e.preventDefault();
    navigate(`/edit-profile/${loginData._id}`);
  }

  const handleImageUpload = async()=>{
    let token = localStorage.getItem('usersDataToken');
    const formData = new FormData();
    formData.append("image",profilePicture);
    try {
      const res = await fetch('http://localhost:5000/api/auth/uploadImage',{
        method:"POST",
        headers: { 
        "Authorization": token
        },
        body:formData
      });
      const data = await res.json();
      if(data.status===401 || !data){
        console.log("error");
      }
      else{
        console.log(data);
        downloadImage();
      } 
    } catch (error) {
      console.log(error);
    }
  };

  const downloadImage = async()=>{
    let token = localStorage.getItem('usersDataToken');
    try {
      const res = await fetch("http://localhost:5000/api/auth/img",{
        method: "GET",
        headers: {
          "Content-Type":"application/json", 
          "Authorization":token
        }
      });
      const data = await res.json();
      if(data.status===401 || !data){
        console.log("error");
      }
      else{
        setProfileUrl(`http://localhost:5000/uploads/${data.getUser.imgpath}`);
      }
      console.log(data);
    } catch (error) {
      console.log(error);    
    }
  }
 console.log(profileUrl);
  useEffect(()=>{
    ElectionValid();
    downloadImage();
  },[]);

  const iconStyle = {
    color: "blue",
    fontSize: "25px",
    verticalAlign: "middle",
    marginRight: "8px"
  }
  // console.log(profilePicture);
  return (
    <>
      <LoggedInNav />
      <div className="personal-info-container">
        <div className="profile-picture-side">
          <div className="profile-picture">
            <img src={profileUrl} height="200px" width="200px" style={{borderRadius: "50%"}}/>
          </div>
          <input type='file' accept="image/png, image/jpeg, image/jpg" name='image' className='upload_btn' onChange={(e)=>{
            setProfilePicture(e.target.files[0]);
          }}/>
          <div className='overlay-layer'>
          Change Profile Picture
          </div>
          <div style={{position: "absolute",top:"300px",left:"180px"}}>
          <button style={{background:"transparent", color:"white",border:"none",outline:"none",cursor:"pointer"}} onClick={()=>{
            handleImageUpload();
            // downloadImage();
          }}><FcExternal  style={iconStyle}/><span style={{fontSize:"13px",marginLeft:"1px",fontFamily:"Gill Sans MT",verticalAlign:"middle"}}>Upload</span></button>
          </div>
          <div className='edit-profile'>
          <button style={{border:"none",outline:"none",background:"transparent",cursor:"pointer"}} onClick={handleEdit}><CiEdit  style={iconStyle}/></button><span style={{fontSize: "13px"}}>Edit Profile</span>
          </div>
        </div>
        <div className="info-side">
          <Details  title="Name:" value={loginData.name}/>
          <Details  title="Father's/Mother's Name:" value={loginData.gaurdian}/>
          <div className="age-number">
          <Details title="Date Of Birth:" value={loginData.dateOfBirth}/>
          <Details title="Mobile Number:" value={loginData.phone}/>
          </div>
          <Details title="Email:" value={loginData.email}/>
          <Details  title="Aadhar Number:" value={loginData.aadharNumber}/>
          <div className="verification-info">
          <Details title="Eligible:" value="Yes"/>
          <Details title="Verified:" value="Yes"/>
          </div>
        </div>
      </div>
    </>
  )
}

export default PersonalInfo