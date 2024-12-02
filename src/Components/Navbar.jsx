import './Navbar.css';
import {Link} from 'react-router-dom'
const Navbar = () =>{
  const navLinksStyle = {
    color : "white",
    textDecoration: "none"
  };
  return (
    <>
      <div className="header">
        <div className="navbar">
          <ul className="nav-item-container">
            <li className="nav-items"><Link to="/" style={navLinksStyle}>Home</Link></li>
            <li className="nav-items"><Link to="/about" style={navLinksStyle}>About</Link></li>
            <li className="nav-items"><Link to="/login" style={navLinksStyle}>Login</Link></li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Navbar;