import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Pizza = {
    id: number; 
    name: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
}

export const fetchPizza = createAsyncThunk<Pizza[], Record<string, string>>(
    'pizza/fetchPizzaStatus',
    async (params) => {
        const { categoryParams, sortParams, searchParams } = params;
        const { data } = await axios.get(`http://localhost:3001/pizzas?${categoryParams}${sortParams}${searchParams}`);
        return data;
    }
);

interface PizzaSliceState {
    items: Pizza[],
    status: 'loading' | 'success' | 'error';
}

const initialState: PizzaSliceState = {
    items: [],
    status: 'loading', // loading | success | error
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<Pizza[]>) => {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizza.pending, (state, action) => {
            state.status = 'loading';
            state.items = [];
        });
        builder.addCase(fetchPizza.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        });
        builder.addCase(fetchPizza.rejected, (state, action) => {
            state.status = 'error';
            state.items = [];
        });
    },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;