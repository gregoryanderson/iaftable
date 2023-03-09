import React, { useEffect, useState, useMemo } from 'react';
import { ErrorBoundary } from '../../components';
import { fetchHouses } from '../../store/Table/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { selectCharacters, selectHouses, selectBooks, selectCurrentSelection, selectCurrentProfile } from '../../store/Table/selectors';
import {
    useTable,
    useFilters,
    useSortBy,
    usePagination,
    Row,
    Cell,
    useGlobalFilter
} from 'react-table';
import { setCurrentProfile } from '../../store/Table/reducer';
import Profile from '../../components/Profile';



function HomePage() {

    const [currentPage, setCurrentPage] = useState(0);
    const [fetchOption, setFetchOption] = useState('houses');

    const dispatch = useDispatch();

    const houses = useSelector(selectHouses);
    const characters = useSelector(selectCharacters);
    const books = useSelector(selectBooks);
    const currentProfile = useSelector(selectCurrentProfile);;
    const currentSelection = useSelector(selectCurrentSelection);

    const handlePreviousClick = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleNextClick = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handleFetchClick = (option: string) => {
        setFetchOption(option);
    };


    const handleClick = (row: Row) => {
        dispatch(setCurrentProfile(row.values.currentLord))
    }


    const columns = [
        {
            Header: 'Current Lord',
            accessor: 'currentLordName',
        },
        {
            Header: 'Name',
            accessor: 'name',
        },
        {
            Header: 'Region',
            accessor: 'region',
        },
        {
            Header: 'Words',
            accessor: 'words',
        },
        {
            Header: 'Current Lord URL',
            accessor: 'currentLord',
            show: false,
        },
    ];

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

    const tableInstance = useTable(
        { columns, data: tableData, autoResetHiddenColumns: false, initialState: { pageIndex: 0, pageSize: 5 } },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        globalFilter,
        setGlobalFilter,
    } = tableInstance

    const { pageIndex, pageSize } = state;

    useEffect(() => {
        dispatch(fetchHouses());
    }, []);



    return (
        <>
            {currentProfile && <Profile />}
            <div>
                <button onClick={() => handleFetchClick('books')} className="bg-purple-500 text-white px-2 py-1 rounded-md mr-2 mb-2">Books</button>
                <button onClick={() => handleFetchClick('characters')} className="bg-purple-500 text-white px-2 py-1 rounded-md mr-2 mb-2">Characters</button>
                <button onClick={() => handleFetchClick('houses')} className="bg-purple-500 text-white px-2 py-1 rounded-md mr-2 mb-2">Houses</button>
            </div>
            <>
                <input
                    value={globalFilter || ''}
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
                    <button onClick={() => previousPage()} disabled={!canPreviousPage} className="bg-purple-500 text-white px-2 py-1 rounded-md mr-2 mb-2">
                        Previous
                    </button>
                    {pageOptions.map((pageIndex) => (
                        <button key={pageIndex} onClick={() => gotoPage(pageIndex)} className="bg-purple-500 text-white px-2 py-1 rounded-md mr-2 mb-2">
                            {pageIndex + 1}
                        </button>
                    ))}
                    <button onClick={() => nextPage()} disabled={!canNextPage} className="bg-purple-500 text-white px-2 py-1 rounded-md mr-2 mb-2">
                        Next
                    </button>
                </div>
            </>
        </>
    );
};


export default HomePage;
