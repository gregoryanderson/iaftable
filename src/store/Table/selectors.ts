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