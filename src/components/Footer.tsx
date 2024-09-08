import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



// import { CartState } from '../store/cartSlice'; // Import CartState type

const Footer: React.FC = () => {

  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-6 col-md-3">
            <div className="">
              <h6>Account</h6>
              <ul>
                <li>Sign In</li>
                <li>Register</li>
                <li>Order Status</li>
              </ul>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="">
              <h6>About Us</h6>
              <ul>
                <li>Our Story</li>
                <li>Career</li>
              </ul>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="">
              <h6>Help</h6>
              <ul>
                <li>Contact Us</li>
                <li>Order Status </li>
                <li>Return</li>
              </ul>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="">
              <h6>Comapny</h6>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
            </div>
          </div>

        </div>
        <div className="copyright">
          <p>© Company Name Address Ave, City Name, State ZIP</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;


