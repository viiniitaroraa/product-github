import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import Cart from '../../assets/images/cart.png';
import Close from '../../assets/images/close.png';
import Nav from './component/nav';

const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { totalQuantity, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );
  const handleToggle = () => {
    setIsVisible(prevState => !prevState);
  };

  const handleClose = () => {
    setIsVisible(false);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3">
      <div className="container">
        <div className=" d-flex justify-content-between w-100 align-items-center">
          <a className="navbar-brand" href="/">/ ENIA</a>
          <div className='nav-main'>
            {isVisible && (
              <div className='mobile-menu'>
                <Nav handleCloseMenu={handleClose} />
                <button className="close-button" onClick={handleClose}>
                  <img src={Close} alt="close" />
                </button>
              </div>
            )}

            <div className='web-menu'>
              <Nav />
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
              <button className="navbar-toggler" type="button" onClick={handleToggle}>
                <span className="navbar-toggler-icon"></span>
              </button>
            <div className="navbar-text">
              <Link to="/cart">
                <img src={Cart} alt="cart" /> <span>{totalQuantity}</span>
              </Link>

            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Header;


