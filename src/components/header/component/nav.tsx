import React, { useState } from 'react';
import { Link } from 'react-router-dom';


interface NavProps {
  handleCloseMenu?: () => void; // Optional prop for mobile menu closing
}
const Nav: React.FC<NavProps> = ({ handleCloseMenu }) => {

 return (
    <>
      <div className="navbar-collapse">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" to="/"  onClick={handleCloseMenu}>Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/"  onClick={handleCloseMenu}>Products</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cart"  onClick={handleCloseMenu}>Cart</Link>
          </li>
        </ul>
       
      </div></>

  );
};

export default Nav;


