import {
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';


export type TableState = {
    error?: string,
    isLoading?: boolean,
    houses?: Array<object>,
    characters?: Array<object>,
    books?: Array<object>,
};

export const initialTableState: TableState = {
    error: '',
    isLoading: false,
    houses: [],
    characters: [],
    books: []
};

const slice = createSlice({
    name: 'Table',
    initialState: initialTableState,
    reducers: {
        setHouses: (state, action: PayloadAction<object[]>) => {
            state.houses = action.payload;
        },
        setCharacters: (state, action: PayloadAction<object[]>) => {
            state.characters = action.payload;
        },
    },
});

const { reducer } = slice;

export const { setHouses, setCharacters } = slice.actions;

export default reducer;
