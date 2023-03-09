import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectHouses = createSelector(
    (state: RootState) => state.Table.houses,
    (houses) => houses
);

export const selectCharacters = createSelector(
    (state: RootState) => state.Table.characters,
    (characters) => characters
);

export const selectBooks = createSelector(
    (state: RootState) => state.Table.books,
    (books) => books
);

export const selectCurrentSelection = createSelector(
    (state: RootState) => state.Table.currentSelection,
    (currentSelection) => currentSelection
);

export const selectCurrentProfile = createSelector(
    (state: RootState) => state.Table.currentProfile,
    (currentProfile) => currentProfile
);

