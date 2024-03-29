import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getCartFromLS } from "../../untils/getCartFromLS";
import { calcTotalPrice } from "../../untils/calcTotalPrice";

export type CartItem = {
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

const {items, totalPrice} = getCartFromLS();

const initialState: cartSliceState = {
    items,
    totalPrice,
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

            state.totalPrice = calcTotalPrice(state.items);
        },
        minusItem: (state, action: PayloadAction<number>) => {
            const findItem = state.items.find((obj) => obj.id === action.payload);

            if(findItem && findItem.count > 1){
                findItem.count--;
            }

            state.totalPrice = calcTotalPrice(state.items);
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((obj) => obj.id !== action.payload);

            state.totalPrice = calcTotalPrice(state.items);
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