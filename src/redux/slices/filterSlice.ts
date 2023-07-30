import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type SortItem = {
    name: string;
    type: 'popular' | 'price' | 'name';
    order: 'desc' | 'asc';
}

interface FilterSliceState {
    searchValue: string;
    categoryId: number | null;
    sort: SortItem;
}

const initialState: FilterSliceState = {
    searchValue: '',
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
        setCategoryId: (state, action: PayloadAction<number | null>) => {
            state.categoryId = action.payload;
        },
        setSort: (state, action: PayloadAction<SortItem>) => {
            state.sort = action.payload;
        },
        setFilters: (state, action) => {
            state.categoryId = Number(action.payload.categoryId);
            state.sort = action.payload.sort;
        },
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
        },
    }
});

export const selectSort = (state: RootState) => state.filter.sort;
export const selectFilter = (state: RootState) => state.filter;
export const selectSearchValue = (state: RootState) => state.filter.searchValue;

export const { setCategoryId, setSort, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;