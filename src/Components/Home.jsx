import Navbar from './Navbar';
import './Home.css';
import { Link } from 'react-router-dom';
const Home = () =>{
  const style = {
    textDecoration: "none",
    color: "white"
  }
  return (
    <>
      <Navbar />
      <div className="main-content">
      <div className="image-side">
        <div className="image-logo">

        </div>
        </div>
        <div className="intro-side">
          <div className="content">
          <h2>Be a part of the decision</h2>
          <h1>Vote Today</h1>
          <button className='btn'><Link to="/register" style={style}>Register</Link></button>
          <button className='btn'><Link to="/about" style={style}>Read More</Link></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home