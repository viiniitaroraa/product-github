import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store';
import Cart from '../assets/images/cart.png';

// import { CartState } from '../store/cartSlice'; // Import CartState type

const Header: React.FC = () => {
  // Explicitly type the cart state
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { totalQuantity, totalPrice } = useSelector(
    (state: RootState) => state.cart // Explicitly cast cart state
  );
  // Toggle visibility
  const handleToggle = () => {
    setIsVisible(prevState => !prevState);
  };

  // Close the div
  const handleClose = () => {
    setIsVisible(false);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3">
      <div className="container">
        <div className=" d-flex justify-content-between w-100 align-items-center">
          <a className="navbar-brand" href="/">/ ENIA</a>
          <div><button className="navbar-toggler" type="button" onClick={handleToggle}>
            <span className="navbar-toggler-icon"></span>
          </button>
            {isVisible && (
              <div className="navbar-collapse">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link active" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Products</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/cart">Cart</Link>
                  </li>
                </ul>
                <button className="close-button" onClick={handleClose}>Close</button>
              </div>
            )}
          </div>
          <div className="navbar-text">
            <Link to="/cart">
              <img src={Cart} alt="cart" /> <span>{totalQuantity}</span>
            </Link>

          </div>
        </div>
      </div>
    </nav>
    /* <h1>My E-commerce</h1>
          <div>
            <p>Cart: {totalQuantity} items (${totalPrice.toFixed(2)})</p>
          </div> */
  );
};

export default Header;


