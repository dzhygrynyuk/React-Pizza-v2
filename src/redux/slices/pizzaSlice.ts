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

export type SearchPizzaParams = {
    categoryParams: string;
    sortParams: string;
    searchParams: string;
}

export const fetchPizza = createAsyncThunk<Pizza[], SearchPizzaParams>(
    'pizza/fetchPizzaStatus',
    async (params) => {
        const { categoryParams, sortParams, searchParams } = params;
        const { data } = await axios.get(`http://localhost:3001/pizzas?${categoryParams}${sortParams}${searchParams}`);
        return data;
    }
);

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

interface PizzaSliceState {
    items: Pizza[],
    status: Status;
}

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,
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
            state.status = Status.LOADING;
            state.items = [];
        });
        builder.addCase(fetchPizza.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchPizza.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.items = [];
        });
    },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;