import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import Delete from '../assets/images/delete.png';
import { updateQuantity, removeFromCart } from '../store/cartSlice';

const Cart: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { items, totalQuantity, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  if (items.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div className="cart-page">
      <div className='heading'>
        <div className="container">

          <h1>Your Shopping Bag</h1>
        </div>
      </div>
      <div className="container">


        <div className='row'>
          <div className='col-md-9'>
            <ul>
              {items.map(item => (
                <li key={item.id}>

                  <div className='card-item'>
                    <div className="image-thumbnail">
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className='content'>
                      <h3>{item.title}</h3>
                      <p>{item.category}</p>
                      <p>${item.price}</p>

                    </div>
                  </div>
                  <div className='quantity'>
                    <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button className='delete-icon' onClick={() => handleRemoveItem(item.id)}><img src={Delete} alt="delete"/></button>

                </li>
              ))}
            </ul>
          </div>
          <div className='col-md-3'> <div className="price-section">
            <h4>Price Summary</h4>
            <div className='d-flex justify-content-between'>
              <p>Total Items: </p>
              <p><strong>{totalQuantity}</strong></p>
            </div>
            <div className='d-flex justify-content-between'>
              <p>Total Price: </p>
              <p><strong>${totalPrice.toFixed(2)}</strong></p>
            </div>

          </div></div>
        </div>

      </div>
    </div>
  );
};

export default Cart;
