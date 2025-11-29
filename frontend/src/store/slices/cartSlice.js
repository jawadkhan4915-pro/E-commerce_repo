import { createSlice } from '@reduxjs/toolkit';

const cartItems = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [];

const initialState = {
    items: cartItems,
    totalItems: cartItems.reduce((acc, item) => acc + item.quantity, 0),
    totalPrice: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.items.find((x) => x._id === item._id);

            if (existItem) {
                state.items = state.items.map((x) =>
                    x._id === existItem._id ? { ...x, quantity: x.quantity + 1 } : x
                );
            } else {
                state.items.push({ ...item, quantity: 1 });
            }

            // Update totals
            state.totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
            state.totalPrice = state.items.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );

            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((x) => x._id !== action.payload);

            // Update totals
            state.totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
            state.totalPrice = state.items.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );

            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find((x) => x._id === id);

            if (item) {
                item.quantity = quantity;
            }

            // Update totals
            state.totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
            state.totalPrice = state.items.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );

            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            state.totalItems = 0;
            state.totalPrice = 0;
            localStorage.removeItem('cart');
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
    cartSlice.actions;
export default cartSlice.reducer;
