import { combineReducers } from 'redux';
import Map from './Map/reducer';
import Table from './Table/reducer';


export default combineReducers({
    Map,
    Table
});
