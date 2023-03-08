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
    currentSelection?: string
};

export const initialTableState: TableState = {
    error: '',
    isLoading: false,
    houses: [],
    characters: [],
    books: [], 
    currentSelection: "houses"
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
        setBooks: (state, action: PayloadAction<object[]>) => {
            state.books = action.payload;
        },
    },
});

const { reducer } = slice;

export const { setHouses, setCharacters, setBooks } = slice.actions;

export default reducer;
