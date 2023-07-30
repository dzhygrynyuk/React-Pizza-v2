import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type CartItem = {
    id: number;
    name: string;
    price: number; 
    imageUrl: string; 
    size: number;
    type: string;
    count: number;
}

interface cartSliceState {
    items: CartItem[];
    totalPrice: number;
}

const initialState: cartSliceState = {
    items: [],
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            const findItem = state.items.find((obj) => obj.id === action.payload.id);

            if(findItem){
                findItem.count++;
            }else{
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum;
            }, 0);
        },
        minusItem: (state, action: PayloadAction<number>) => {
            const findItem = state.items.find((obj) => obj.id === action.payload);

            if(findItem && findItem.count > 1){
                findItem.count--;
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum;
            }, 0);
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((obj) => obj.id !== action.payload);

            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum;
            }, 0);
        },
        clearItems: (state) => {
            state.items = [];
            state.totalPrice = 0;
        },
    }
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: number) => (state: RootState) => state.cart.items.find((obj) => obj.id === id);

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;