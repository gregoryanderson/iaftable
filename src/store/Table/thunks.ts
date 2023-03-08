import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import { setCharacters, setHouses, setBooks } from './reducer';

export const fetchHouses =
    () =>
        async (dispatch: StoreDispatch, getState: StoreGetState) => {
            try {
                const response = await fetch('https://www.anapioficeandfire.com/api/houses');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                dispatch(setHouses(data));
            } catch (error) {
                console.error('Error fetching houses data:', error);
            }
        };

export const fetchCharacters =
    () =>
        async (dispatch: StoreDispatch, getState: StoreGetState) => {
            try {
                const response = await fetch('https://www.anapioficeandfire.com/api/characters');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                dispatch(setCharacters(data));
            } catch (error) {
                console.error('Error fetching houses data:', error);
            }
        };

export const fetchBooks =
    () =>
        async (dispatch: StoreDispatch, getState: StoreGetState) => {
            try {
                const response = await fetch('https://www.anapioficeandfire.com/api/books');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log({ data })
                dispatch(setBooks(data));
            } catch (error) {
                console.error('Error fetching houses data:', error);
            }
        };