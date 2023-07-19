import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: null,
    sort: {
        name: 'popular', 
        type: 'popular', 
        order: 'desc'
    },
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId: (state, action) => {
            state.categoryId = action.payload;
        },
        setSort: (state, action) => {
            state.sort = action.payload;
        },
        setFilters: (state, action) => {
            state.categoryId = Number(action.payload.categoryId);
            state.sort = action.payload.sort;
        },
    }
});

export const selectSort = (state) => state.filter.sort;
export const selectFilter = (state) => state.filter;

export const { setCategoryId, setSort, setFilters } = filterSlice.actions;

export default filterSlice.reducer;