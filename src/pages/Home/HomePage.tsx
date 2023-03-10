import React, { useEffect, useState, useMemo } from 'react';
import { ErrorBoundary } from '../../components';
import { fetchHouses, fetchBooks, fetchCharacters } from '../../store/Table/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { selectCharacters, selectHouses, selectBooks, selectCurrentSelection, selectCurrentProfile } from '../../store/Table/selectors';
import {
    useTable,
    useFilters,
    useSortBy,
    // usePagination,
    Row,
    Cell,
    useGlobalFilter
} from 'react-table';
import { setCurrentProfile, setCurrentSelection } from '../../store/Table/reducer';
import Profile from '../../components/Profile';



function HomePage() {

    const [currentPage, setCurrentPage] = useState(1);

    const dispatch = useDispatch();

    const houses = useSelector(selectHouses);
    const characters = useSelector(selectCharacters);
    const books = useSelector(selectBooks);
    const currentProfile = useSelector(selectCurrentProfile);;
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
        dispatch(setCurrentProfile(row.values.currentLord))
    }

    const columns = useMemo(() => {
        const commonColumns = [
            {
                Header: "Name",
                accessor: "name"
            }
        ];

        const houseColumns = [
            {
                Header: "Words",
                accessor: "words"
            },
            {
                Header: 'Current Lord',
                accessor: 'currentLordName',
            },
        ];

        const bookColumns = [
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
                return [...commonColumns, ...houseColumns];
            case "books":
                return [...commonColumns, ...bookColumns];
            case "characters":
                return [...commonColumns, ...characterColumns];
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

    const tableInstance = useTable({ columns, data: tableData, autoResetHiddenColumns: false, initialState: { pageIndex: 0, pageSize: 5 } }, useFilters, useGlobalFilter, useSortBy)

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
            {currentProfile && <Profile />}
            <div className="ml-4 overflow-x-scroll">
                <div>
                    <button onClick={() => handleFetchClick('books')} className="bg-purple-500 text-white px-2 py-1 rounded-md mr-2 mb-2">Books</button>
                    <button onClick={() => handleFetchClick('characters')} className="bg-purple-500 text-white px-2 py-1 rounded-md mr-2 mb-2">Characters</button>
                    <button onClick={() => handleFetchClick('houses')} className="bg-purple-500 text-white px-2 py-1 rounded-md mr-2 mb-2">Houses</button>
                </div>
                <input
                    value={state.globalFilter || ''}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder={`Search all fields...`}
                />

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
                <div>
                    <button onClick={handlePreviousClick} className="bg-purple-500 text-white px-2 py-1 rounded-md mr-2 mb-2">
                        Previous
                    </button>
                    <button onClick={handleNextClick} className="bg-purple-500 text-white px-2 py-1 rounded-md mr-2 mb-2">
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};


export default HomePage;
