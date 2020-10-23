import { combineReducers } from 'redux';
import userReducer from './userReducer';
import listingsReducer from './listingsReducer';
import commoditiesReducer from './commoditiesReducer';

const rootReducer = combineReducers({
    currentUser: userReducer,
    listings: listingsReducer,
    commodities: commoditiesReducer
})

export default rootReducer;