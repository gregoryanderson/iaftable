import { PartialRootState } from './configureStore';

// import { initialMapState, MapState } from '../store/Map/reducer';
import { initialTableState, TableState } from '../store/Table/reducer';


const getPreloadedTableState = (): TableState => {
    return {
        ...initialTableState,
    };
};

const getPreloadedState = (): PartialRootState => {
    return {
        Table: getPreloadedTableState()
    };
};

export default getPreloadedState;
