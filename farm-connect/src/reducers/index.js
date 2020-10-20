import { combineReducers } from 'redux';
import userReducer from './userReducer';
import listingsReducer from './listingsReducer';

const rootReducer = combineReducers({
    user: userReducer,
    listings: listingsReducer
})

export default rootReducer;