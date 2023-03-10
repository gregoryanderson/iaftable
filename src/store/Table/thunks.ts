import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import { setCharacters, setHouses, setBooks } from './reducer';

export const fetchHouses =
    (pageIndex:number) =>
        async (dispatch: StoreDispatch, getState: StoreGetState) => {

                interface House {
                    name: string;
                    region: string;
                    currentLord: string | null;
                    founded: string;
                }

            try {
                const response = await fetch(`https://www.anapioficeandfire.com/api/houses?page=${pageIndex + 1}&pageSize=5`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const houseDetails: House[] = await Promise.all(
                    data.map(async (house: House) => {

                        if (house.currentLord !== "") {
                            const currentLordResponse = await fetch(house.currentLord);
                            const currentLordData = await currentLordResponse.json();
                            return { ...house, currentLordName: currentLordData.name };
                        } else {
                            return { ...house, currentLordName: "N/A" };
                        }
                    })
                );
                dispatch(setHouses(houseDetails));
            } catch (error) {
                console.error('Error fetching houses data:', error);
            }
        };

export const fetchCharacters =
    (pageIndex:number) =>
        async (dispatch: StoreDispatch, getState: StoreGetState) => {
            try {
                const response = await fetch(`https://www.anapioficeandfire.com/api/characters?page=${pageIndex + 1}&pageSize=5`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                dispatch(setCharacters(data));
            } catch (error) {
                console.error('Error fetching char data:', error);
            }
        };

export const fetchBooks =
    (pageIndex:number) =>
        async (dispatch: StoreDispatch, getState: StoreGetState) => {
            try {
                const response = await fetch(`https://www.anapioficeandfire.com/api/books?page=${pageIndex + 1}&pageSize=5`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                dispatch(setBooks(data));
            } catch (error) {
                console.error('Error fetching book data:', error);
            }
        };