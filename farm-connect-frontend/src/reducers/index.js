import { combineReducers } from 'redux';
import userReducer from './userReducer';
import listingsReducer from './listingsReducer';
import commoditiesReducer from './commoditiesReducer';
import farmersReducer from './farmersReducer';
import prospectsReducer from './prospectsReducer';
import { errorsReducer } from './errorsReducer';
import { interestsReducer } from './interestsReducer';
import searchUsersReducer from './searchUsersReducer';
import connectionsReducer from './connectionsReducer';
import miscellaneousReducer from './miscellaneousReducer';

const rootReducer = combineReducers({
    currentUser: userReducer,
    listings: listingsReducer,
    commodities: commoditiesReducer,
    farmers: farmersReducer,
    prospects: prospectsReducer,
    interests: interestsReducer,
    errorMessages: errorsReducer,
    searchUsers: searchUsersReducer,
    connects: connectionsReducer,
    miscellaneous: miscellaneousReducer
})

export default rootReducer;