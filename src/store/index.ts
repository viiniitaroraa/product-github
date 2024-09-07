import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice'; // Import the cart reducer

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer, // Add the cart reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
