import { combineReducers } from 'redux';
import userReducer from './userReducer';
import listingsReducer from './listingsReducer';
import commoditiesReducer from './commoditiesReducer';
import farmersReducer from './farmersReducer';
import prospectsReducer from './prospectsReducer';
import { errorsReducer } from './errorsReducer';

const rootReducer = combineReducers({
    currentUser: userReducer,
    listings: listingsReducer,
    commodities: commoditiesReducer,
    farmers: farmersReducer,
    prospects: prospectsReducer,
    errorMessages: errorsReducer
})

export default rootReducer;