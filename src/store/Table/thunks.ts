import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import { setCharacters, setHouses } from './reducer';

export const fetchHouses =
    () =>
        async (dispatch: StoreDispatch, getState: StoreGetState) => {
            try {
                const response = await fetch('https://www.anapioficeandfire.com/api/houses');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log({ data })
                dispatch(setHouses(data));
                // return data;
            } catch (error) {
                console.error('Error fetching houses data:', error);
            }
        };

