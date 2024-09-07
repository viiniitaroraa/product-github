import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store';
// import { CartState } from '../store/cartSlice'; // Import CartState type

const Header: React.FC = () => {
  // Explicitly type the cart state
  const { totalQuantity, totalPrice } = useSelector(
    (state: RootState) => state.cart // Explicitly cast cart state
  );
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3">
      <div className="container">
        <div className=" d-flex justify-content-between w-100">
          <a className="navbar-brand" href="/">/ ENIA</a>
          <div><button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className="nav-link active" to="/">Home</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/products">Products</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/cart">Cart</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="navbar-text">
          <Link to="/cart">
              Cart <span>{totalQuantity}</span>
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


