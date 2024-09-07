import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, AppDispatch } from '../store';
import { fetchProducts } from '../store/productsSlice';
import { addToCart } from '../store/cartSlice'; // Assuming you have an addToCart action

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const { products, status, error } = useSelector((state: RootState) => state.products);

  const [quantity, setQuantity] = useState<number>(1);  // Quantity state
  const [quantityError, setQuantityError] = useState<string | null>(null);  // Error state for quantity

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const product = products.find(p => p.id === parseInt(id!));

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value < 1) {
      setQuantityError('Quantity must be at least 1');
    } else {
      setQuantity(value);
      setQuantityError(null); // Reset the error if the input is valid
    }
  };

  const handleAddToCart = () => {
    if (quantity < 1) {
      setQuantityError('Quantity must be at least 1');
    } else {
      dispatch(addToCart({ ...product, quantity }));  // Dispatch the action to add to cart with the specified quantity
    }
  };

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} />
      <p>${product.price}</p>
      <p>Category: {product.category}</p>

      {/* Quantity Input */}
      <label>
        Quantity:
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
        />
      </label>
      {quantityError && <p style={{ color: 'red' }}>{quantityError}</p>} {/* Show error message */}

      {/* Add to Cart Button */}
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;
