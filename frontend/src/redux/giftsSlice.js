import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gifts: [
    { id: '1', name: 'Tostadora', images: '/placeholder.svg?height=200&width=200', reserved: false },
    { id: '2', name: 'Juego de Sábanas', images: '/placeholder.svg?height=200&width=200', reserved: false },
    { id: '3', name: 'Cafetera', images: '/placeholder.svg?height=200&width=200', reserved: false },
    { id: '4', name: 'Set de Ollas', images: '/placeholder.svg?height=200&width=200', reserved: false },
    { id: '5', name: 'Licuadora', images: '/placeholder.svg?height=200&width=200', reserved: false },
    { id: '6', name: 'Vajilla', images: '/placeholder.svg?height=200&width=200', reserved: false },
  ],
  shoppingCart: [],
};

const giftSlice = createSlice({
  name: 'gifts',
  initialState,
  reducers: {
    toggleReserve: (state, action) => {
      const gift = state.gifts.find((g) => g.id === action.payload);
      if (gift) {
        gift.reserved = !gift.reserved;
      }
    },
    updateGiftsDetails: (state, action) => {
      state.gifts = action.payload
    },
    addToCart: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.shoppingCart.find((item) => item.id === id);

      if (existingItem) {
        // Solo sumar cantidades si el producto ya está en el carrito
        existingItem.quantity += quantity;
      } else {
        // Agregar un nuevo producto al carrito
        const gift = state.gifts.find((g) => g.id === id);
        if (gift) {
          state.shoppingCart.push({ ...gift, quantity });
        }
      }
    },
  },
});

export const { toggleReserve, updateGiftsDetails, addToCart } = giftSlice.actions;
export default giftSlice.reducer;
