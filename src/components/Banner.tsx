import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
// import { CartState } from '../store/cartSlice'; // Import CartState type

const Banner: React.FC = () => {
    // Explicitly type the cart state
    const { totalQuantity, totalPrice } = useSelector(
        (state: RootState) => state.cart // Explicitly cast cart state
    );
    return (
        <div className="banner d-flex align-items-center">
            <div className="container">

                <div className="row">
                    <div className="col-6">
                        <h2>Explore Fashion
                            & Art Design</h2>
                        <p>Online shopping from a great selection</p>
                    </div>
                </div>

            </div>
        </div>
        /* <h1>My E-commerce</h1>
              <div>
                <p>Cart: {totalQuantity} items (${totalPrice.toFixed(2)})</p>
              </div> */
    );
};

export default Banner;


