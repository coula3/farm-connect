import { combineReducers } from 'redux';
import userReducer from './userReducer';
import listingsReducer from './listingsReducer';
import commoditiesReducer from './commoditiesReducer';
import farmersReducer from './farmersReducer';
import prospectsReducer from './prospectsReducer';

const rootReducer = combineReducers({
    currentUser: userReducer,
    listings: listingsReducer,
    commodities: commoditiesReducer,
    farmers: farmersReducer,
    prospects: prospectsReducer
})

export default rootReducer;