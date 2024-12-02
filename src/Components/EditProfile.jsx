import React, {useContext} from 'react'
import './EditProfile.css';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const {loginData,setLoginData} = useContext(UserContext);

  const navigate = useNavigate();

  const handleEditForm = async(e)=>{
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/auth/edit/${loginData._id}`,{
        method: "PUT",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify(loginData)
      });

      const data = await res.json();

      if(data.status===201){
        setLoginData(""),
        navigate('/personalInfo');
      }
      else{
        console.log("Could not update data");
      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e)=>{
    const {name,value} = e.target;
    setLoginData({
      ...loginData,
      [name]:value
    });
  }

  return (
    <>
      <section className='edit-section'>
        <div className='edit-image'>
          <img src='http://localhost:5173/public/edit-image.png' height={200} width={200}/>
        </div>
        <div className='edit-form'>
          <form onSubmit={handleEditForm}>
            <div className='form-inputs'>
              <label htmlFor='name'>Name</label>
              <input type='text' className='input-field' id='name' value={loginData.name} name='name'onChange={handleInputChange}required/>
            </div>
            <div className='form-inputs'>
              <label htmlFor='dob'>Date Of Birth</label>
              <input type='date' className='input-field' id='dob' name='dateOfBirth' value={loginData.dateOfBirth}onChange={handleInputChange}required/>
            </div>
            <div className='form-inputs'>
              <label htmlFor='fatherName'>Father's Name/Mother's Name</label>
              <input type='text' className='input-field' id='fatherName'name="gaurdian" value={loginData.gaurdian}onChange={handleInputChange} required/>
            </div>
            <div className='form-inputs'>
              <label htmlFor='email'>Email</label>
              <input type='email' className='input-field' id='email'name='email'value={loginData.email} onChange={handleInputChange}required/>
            </div>
            <div className='form-inputs'>
              <label htmlFor='phone'>Mobile Number</label>
              <input type='phone' className='input-field' id='phone' name='phone' value={loginData.phone}onChange={handleInputChange} required/>
            </div>
            <div className='form-inputs'>
              <label htmlFor='password'>Password</label>
              <input type='password' className='input-field' id='password' name='password' value={loginData.password}onChange={handleInputChange}required/>
            </div>
            <button type='submit' className='edit-btn'>Update</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default EditProfile