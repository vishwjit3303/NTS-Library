import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
const logo = '/images/logo.png';
const image = '/images/image.png';
import { FaSearch, FaMicrophone } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="" className="logo" />
        <span className="logo-name">NTS Nihon Global</span>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/coins">Coin</Link></li>
        <li><a href="#profile">Profile</a></li>
        <li><Link to="/subscription">Subscription</Link></li>
        <li><Link to="/payment">Payment</Link></li>
        <li><Link to="/roles-permissions">Permissions</Link></li>
        
      </ul>

      <div className="navbar-search">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Search..." className="search-input" />
        <FaMicrophone className="mic-icon" />
      </div>

      <div className="navbar-img">
        <img src={image} alt="image" className="logo-image" />
      </div>
    </nav>
  );
};

export default Navbar;
