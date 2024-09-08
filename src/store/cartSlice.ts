import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  quantity: number;
}


interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}


const loadCartFromLocalStorage = (): CartState => {
  try {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      return JSON.parse(storedCart);
    }
  } catch (error) {
    console.error('Failed to load cart from localStorage', error);
  }
  return { items: [], totalQuantity: 0, totalPrice: 0 }; 
};

// Save cart to localStorage
const saveCartToLocalStorage = (cart: CartState) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Failed to save cart to localStorage', error);
  }
};

const initialState: CartState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity += 1;
      state.totalPrice += action.payload.price;
      saveCartToLocalStorage(state); 
    },
    updateQuantity(state, action: PayloadAction<{ id: number, quantity: number }>) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem && quantity > 0) {
        const difference = quantity - existingItem.quantity;
        existingItem.quantity = quantity;
        state.totalQuantity += difference;
        state.totalPrice += difference * existingItem.price;
      }
      saveCartToLocalStorage(state);
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const index = state.items.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        const item = state.items[index];
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
        state.items.splice(index, 1);
      }
      saveCartToLocalStorage(state);
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
