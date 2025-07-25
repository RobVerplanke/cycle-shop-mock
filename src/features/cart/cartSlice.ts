import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartRemoveProps, CartState } from '../../types/Cart';

const initialState: CartState = {
  items: [],
  isCartOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.items.find(
        (i) => i.id === action.payload.id && i.size === action.payload.size
      );

      if (item) {
        item.quantity += action.payload.quantity;
        item.price = action.payload.price;
        item.name = action.payload.name;
        item.description = action.payload.description;
        item.introduction = action.payload.introduction;
        item.image_url = action.payload.image_url;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<CartRemoveProps>) => {
      state.items = state.items.filter(
        (item) =>
          !(item.id === action.payload.id && item.size === action.payload.size)
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number; size?: string }>
    ) => {
      const { id, quantity, size } = action.payload;
      const item = state.items.find((i) => i.id === id && i.size === size);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  toggleCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
