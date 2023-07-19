import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizza = createAsyncThunk(
    'pizza/fetchPizzaStatus',
    async (params) => {
        const { categoryParams, sortParams, searchParams } = params;
        const { data } = await axios.get(`http://localhost:3001/pizzas?${categoryParams}${sortParams}${searchParams}`);
        return data
    }
  )

const initialState = {
    items: [],
    status: 'loading', // loading | success | error
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
    },
    extraReducers: {
        [fetchPizza.pending]: (state, action) => {
            state.status = 'loading';
            state.items = [];
        },
        [fetchPizza.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        },
        [fetchPizza.rejected]: (state, action) => {
            state.status = 'error';
            state.items = [];
        }
    },
});

export const selectPizzaData = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;