import React, { useEffect, useState, useMemo } from 'react';
import { fetchHouses, fetchBooks, fetchCharacters } from '../../store/Table/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { selectCharacters, selectHouses, selectBooks, selectCurrentSelection, selectCurrentProfile } from '../../store/Table/selectors';
import {
    useTable,
    useFilters,
    useSortBy,
    Row,
    useGlobalFilter
} from 'react-table';
import { setCurrentSelection } from '../../store/Table/reducer';


function HomePage() {

    const [currentPage, setCurrentPage] = useState(1);
    const [showProfile, setShowProfile] = useState(false);
    const [currentProfile, setCurrentProfile] = useState<HouseProfile | null>(null)

    const dispatch = useDispatch();

    const houses = useSelector(selectHouses);
    const characters = useSelector(selectCharacters);
    const books = useSelector(selectBooks);
    const currentSelection = useSelector(selectCurrentSelection);

    const handlePreviousClick = () => {
        setCurrentPage((currentPage) => currentPage - 1);
    };

    const handleNextClick = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    };

    const handleFetchClick = (option: string) => {
        dispatch(setCurrentSelection(option))
    };

    const handleClick = (row: Row) => {
        setShowProfile(true)
        setCurrentProfile({
            name: row.values.name,
            words: row.values.words,
            currentLordName: row.values.currentLordName,
            url: row.values.url,
            region: row.values.region,
            coatOfArms: row.values.coatOfArms,
            titles: row.values.titles,
            seats: row.values.seats,
            currentLord: row.values.currentLordName,
            heir: row.values.heir,
            overlord: row.values.overlord,
            founded: row.values.founded,
            founder: row.values.founder,
            diedOut: row.values.diedOut,
            ancestralWeapons: row.values.ancestralWeapons,
            cadetBranches: row.values.cadetBranches,
            swornMembers: row.values.swornMembers,
        })
    }

    const columns = useMemo(() => {

        const houseColumns = [
            {
                Header: "Name",
                accessor: "name"
            },
            {
                Header: "Words",
                accessor: "words"
            },
            {
                Header: 'Current Lord',
                accessor: 'currentLordName',
            },
            {
                Header: "URL",
                accessor: "url"
            },
            {
                Header: 'Region',
                accessor: 'region',
            },
            {
                Header: "Coat of Arms",
                accessor: "coatOfArms"
            },
            {
                Header: 'Titles',
                accessor: 'titles',
            },
            {
                Header: "Seats",
                accessor: "seats"
            },
            {
                Header: 'Heir',
                accessor: 'heir',
            },
            {
                Header: "Overlord",
                accessor: "overlord"
            },
            {
                Header: 'Founded',
                accessor: 'founded',
            },
            {
                Header: "Founder",
                accessor: "founder"
            },
            {
                Header: 'Died Out',
                accessor: 'diedOut',
            },
            {
                Header: "Weapons",
                accessor: "ancestralWeapons"
            },
            {
                Header: 'Cadet Branches',
                accessor: 'cadetBranches',
            },
            {
                Header: 'Sworn Members',
                accessor: 'swornMembers',
            }
        ];

        const bookColumns = [
            {
                Header: "Name",
                accessor: "name"
            },
            {
                Header: "Author",
                accessor: "authors",
            },
            {
                Header: "Pages",
                accessor: "numberOfPages"
            }
        ];

        const characterColumns = [
            {
                Header: "Name",
                accessor: "name"
            },
            {
                Header: "Gender",
                accessor: "gender"
            },
            {
                Header: "Aliases",
                accessor: "aliases",
            }
        ];

        switch (currentSelection) {
            case "houses":
                return [...houseColumns];
            case "books":
                return [...bookColumns];
            case "characters":
                return [...characterColumns];
            default:
                return [];
        }
    }, [currentSelection]);

    const tableData = useMemo(() => {
        switch (currentSelection) {
            case "houses":
                return houses;
            case "books":
                return books;
            case "characters":
                return characters;
            default:
                return houses
        }
    }, [currentSelection, characters, houses, books])

    const tableInstance = useTable({ columns, data: tableData, autoResetHiddenColumns: false, initialState: { pageIndex: 0, pageSize: 5, hiddenColumns: ['url', 'swornMembers', 'cadetBranches', 'coatOfArms', 'heir', 'overlord', 'founder', 'ancestralWeapons', 'diedOut'] } }, useFilters, useGlobalFilter, useSortBy)

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = tableInstance


    useEffect(() => {
        if (currentSelection === 'houses') {
            dispatch(fetchHouses(currentPage));
        }

        if (currentSelection === 'characters') {
            dispatch(fetchCharacters(currentPage));
        }

        if (currentSelection === 'books') {
            dispatch(fetchBooks(currentPage));
        }
    }, [currentPage, dispatch, currentSelection]);

    return (
        <>
            {showProfile && <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                <button
                    onClick={() => setShowProfile(false)}
                    className="inline-flex items-center justify-center rounded-full w-8 h-8 text-gray-700 hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                >
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <div className="md:flex">
                    <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{currentProfile.name}</div>
                        <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{currentProfile.currentLordName}</a>
                        <p className="mt-2 text-gray-500">{currentProfile.coatOfArms}</p>
                        <p className="mt-2 text-gray-500">{currentProfile.region}</p>
                    </div>
                </div>
            </div>}
            {!showProfile && <div className="ml-4 overflow-x-scroll">
                <div className="flex justify-center items-center">
                    <div className="p-4">
                        <button onClick={() => handleFetchClick('books')} className="bg-purple-500 text-white px-2 py-1 rounded-md mr-2 mb-2">Books</button>
                        <button onClick={() => handleFetchClick('characters')} className="bg-purple-500 text-white px-2 py-1 rounded-md mr-2 mb-2">Characters</button>
                        <button onClick={() => handleFetchClick('houses')} className="bg-purple-500 text-white px-2 py-1 rounded-md mr-2 mb-2">Houses</button>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <div className="p-12">
                        <div className="mb-4">
                            <input
                                value={state.globalFilter || ''}
                                onChange={(e) => setGlobalFilter(e.target.value)}
                                placeholder={`Search all fields...`}
                            />
                        </div>
                        <table {...getTableProps()} className="table-fixed w-full">
                            <thead>
                                {
                                    headerGroups.map(headerGroup => (
                                        <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-50 border-b-2">
                                            {
                                                headerGroup.headers.map(column => (
                                                    <th {...column.getHeaderProps()} className="text-left px-4 py-2 w-1/3">
                                                        {
                                                            column.render('Header')
                                                        }
                                                    </th>
                                                ))
                                            }
                                        </tr>
                                    ))
                                }
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                { // loop over the rows
                                    rows.map((row, index) => {
                                        prepareRow(row)
                                        return (
                                            <tr {...row.getRowProps()} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                                                { // loop over the rows cells 
                                                    row.cells.map(cell => (
                                                        <td {...cell.getCellProps()} onClick={() => handleClick(row)} className="px-4 py-2">
                                                            {cell.render('Cell')}
                                                        </td>
                                                    ))
                                                }
                                            </tr>
                                        )
                                    })
                                }
                                <tr>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <div className="p-4">
                        <button onClick={handlePreviousClick} className="bg-purple-500 text-white px-2 py-1 rounded-md mr-2 mb-2">
                            Previous
                        </button>
                        <button onClick={handleNextClick} className="bg-purple-500 text-white px-2 py-1 rounded-md mr-2 mb-2">
                            Next
                        </button>
                    </div>
                </div>
            </div>}
        </>
    );
};


export default HomePage;
