import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import { setCharacters, setHouses, setBooks } from './reducer';

export const fetchHouses =
    () =>
        async (dispatch: StoreDispatch, getState: StoreGetState) => {

                interface House {
                    name: string;
                    region: string;
                    currentLord: string | null;
                    founded: string;
                }

            //     try {
            //         const response = await fetch("https://anapioficeandfire.com/api/houses");
            //         const data: House[] = await response.json();
            //         // const houseDetails = await Promise.all(
            //         //     data.map(async (house: House) => {

            //         //         if (house.currentLord !== "") {
            //         //             const currentLordResponse = await fetch(house.currentLord);
            //         //             const currentLordData = await currentLordResponse.json();
            //         //             return { ...house, currentLord: currentLordData.name };
            //         //         } else {
            //         //             return { ...house, currentLord: "N/A" };
            //         //         }
            //         //     })
            //         // );
            //         setHouses(data);
            //     } catch (error) {
            //         console.log(error);
            //     }

            try {
                const response = await fetch('https://www.anapioficeandfire.com/api/houses');
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
                console.error('Error fetching char data:', error);
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
                dispatch(setBooks(data));
            } catch (error) {
                console.error('Error fetching book data:', error);
            }
        };