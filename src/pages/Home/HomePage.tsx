import React, { useEffect } from 'react';
import { ErrorBoundary } from '../../components';
import { fetchHouses } from '../../store/Table/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { selectHouses } from '../../store/Table/selectors';

const HomePage = () => {
    const dispatch = useDispatch();

    const houses = useSelector(selectHouses);


    useEffect(() => {
        dispatch(fetchHouses());
      }, []);

    return (
        <ErrorBoundary>
            <h1>React Redux Boilerplate</h1>
            <p>You can put the components of your app here</p>
        </ErrorBoundary>
    );
};

export default HomePage;
