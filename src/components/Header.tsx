import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
// import { CartState } from '../store/cartSlice'; // Import CartState type

const Header: React.FC = () => {
  // Explicitly type the cart state
  const { totalQuantity, totalPrice } = useSelector(
    (state: RootState) => state.cart // Explicitly cast cart state
  );
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <div className="container">
        <a className="navbar-brand" href="/">/ ENIA</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Products</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Cart</a>
            </li>
          </ul>
          <span className="navbar-text">
            Cart
            <span>{totalQuantity}</span>
          </span>
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


