import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
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
    <div>
      <h1>Your Cart</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <div>
              <h2>{item.title}</h2>
              <p>${item.price}</p>
              <div>
                <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
              </div>
              <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <p>Total Items: {totalQuantity}</p>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Cart;
