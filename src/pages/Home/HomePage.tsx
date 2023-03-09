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
    Cell
} from 'react-table';
import { setCurrentProfile } from '../../store/Table/reducer';
import Profile from '../../components/Profile';



function Table() {

    const houses = useSelector(selectHouses);
    const characters = useSelector(selectCharacters);
    const books = useSelector(selectBooks);
    const currentSelection = useSelector(selectCurrentSelection);

    const dispatch = useDispatch();


    const handleClick = (row: Row) => {
        dispatch(setCurrentProfile(row.values.currentLord))
    }


    const columns = [
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
            Header: 'Current Lord',
            accessor: 'currentLordName',
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

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: tableData, autoResetHiddenColumns: false })

    return (
        <table {...getTableProps()}>
            <thead>
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>
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
                    rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                { // loop over the rows cells 
                                    row.cells.map(cell => (
                                        <td {...cell.getCellProps()} onClick={() => handleClick(row)}>
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
    );
}


function HomePage() {
    const [showProfile, setShowProfile] = useState(false);
    const [showProfileURL, setShowProfileURL] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [fetchOption, setFetchOption] = useState('houses');

    const dispatch = useDispatch();

    const houses = useSelector(selectHouses);
    const characters = useSelector(selectCharacters);
    const books = useSelector(selectBooks);
    const currentProfile = useSelector(selectCurrentProfile);


    const handlePreviousClick = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleNextClick = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handleFetchClick = (option: string) => {
        setFetchOption(option);
    };


    useEffect(() => {
        dispatch(fetchHouses());
    }, []);

    // return (
    //     <ErrorBoundary>
    //         <h1>React Redux Boilerplate</h1>
    //         <p>You can put the components of your app here</p>
    //     </ErrorBoundary>
    // );


    return (
        <>
            {currentProfile && <Profile />}
            <div>
                <button onClick={() => handleFetchClick('books')} className="bg-purple-500 text-white px-2 py-1 rounded-md mr-2 mb-2">Books</button>
                <button onClick={() => handleFetchClick('characters')} className="bg-purple-500 text-white px-2 py-1 rounded-md mr-2 mb-2">Characters</button>
                <button onClick={() => handleFetchClick('houses')} className="bg-purple-500 text-white px-2 py-1 rounded-md mr-2 mb-2">Houses</button>
            </div>
            <Table />
        </>
    );
};


export default HomePage;
