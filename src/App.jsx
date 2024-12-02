import { useState, createContext, useContext } from "react";
import Home  from "./Components/Home";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import About from './Components/About';
import Login from "./Components/Login";
import Register from "./Components/Register";
import Elections from "./Components/Elections";
import PersonalInfo from "./Components/PersonalInfo";
import Vote from "./Components/Vote";
import Thanking from "./Components/Thanking";
import ResetPasswordMail from "./Components/ResetPasswordMail";
import ForgotPassword from "./Components/ForgotPassword";
import Error from "./Components/Error";
import EditProfile from "./Components/EditProfile";

export const UserContext = createContext();

const App = () =>{
  const [loginData,setLoginData] = useState("");
  return (
    <UserContext.Provider value={{loginData,setLoginData}}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path="/personalInfo" element={<PersonalInfo />} />
        <Route path="/elections" element={<Elections />} />
        <Route path="/vote" element={<Vote/>} />
        <Route path="/thanking" element={<Thanking/>} />
        <Route path="/resetPassword" element={<ResetPasswordMail/>} />
        <Route path="/forgotPassword/:id/:token" element={<ForgotPassword/>} />
        <Route path="*" element={<Error/>} />
        <Route path='/edit-profile/:id' element={<EditProfile/>}/>
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App;