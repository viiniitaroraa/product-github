import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.totalQuantity += action.payload.quantity;
      state.totalPrice += action.payload.price * action.payload.quantity;
    },
    updateQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem && quantity > 0) {
        state.totalQuantity += quantity - existingItem.quantity;
        state.totalPrice += (quantity - existingItem.quantity) * existingItem.price;
        existingItem.quantity = quantity;
      } else if (existingItem && quantity === 0) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.quantity * existingItem.price;
        state.items = state.items.filter(item => item.id !== id);
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const id = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === id);
      if (existingItemIndex !== -1) {
        const [removedItem] = state.items.splice(existingItemIndex, 1);
        state.totalQuantity -= removedItem.quantity;
        state.totalPrice -= removedItem.quantity * removedItem.price;
      }
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
