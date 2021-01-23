import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignUp from '../../containers/SignUp/SignUp';
import SignIn from '../../containers/SignIn/SignIn';
import SignOut from '../SignOut/SignOut';
import CreateListing from '../../containers/CreateListing/CreateListing';
import Listings from '../../containers/Listings/Listings';
import Listing from '../Listing/Listing';
import CurrentUser from '../CurrentUser/CurrentUser';
import FarmerProfile from '../FarmerProfile/FarmerProfile';
import EditListing from '../../containers/EditListing/EditListing';
import ProspectProfile from '../ProspectProfile/ProspectProfile';
import EditUser from '../../containers/EditUser/EditUser';
import SearchUsers from '../../containers/SearchUsers/SearchUsers';
import TermsOfService from '../TermsOfService/TermsOfService';
import NoMatch from '../NoMatch/NoMatch';
import Connects from '../Connects/Connects';
import ProtectedRoute from './ProtectedRoute';

const Routes = (props) => {
    return (
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signout" component={SignOut} />
            <ProtectedRoute exact path="/listings" component={Listings} />
            <ProtectedRoute exact path="/listings/other-farmers" component={Listings} />
            <ProtectedRoute exact path="/listings/my-interests" component={Listings} />
            <ProtectedRoute exact path="/listings/new" component={CreateListing} />
            <ProtectedRoute exact path="/listings/:id/edit" component={EditListing} />
            <ProtectedRoute exact path="/listings/:id" component={Listing} />
            <ProtectedRoute exact path="/users/search-farmers" component={SearchUsers} />
            <ProtectedRoute exact path="/users/search-prospects" component={SearchUsers} />
            <ProtectedRoute exact path="/users/:id" component={CurrentUser} />
            <ProtectedRoute exact path="/users/:id/edit" component={EditUser} />
            <ProtectedRoute exact path="/users/:id/listings" component={Listings}/>
            <ProtectedRoute exact path="/users/:id/closed-listings" component={Listings}/>
            <ProtectedRoute exact path="/farmers/:id" component={FarmerProfile} />
            <ProtectedRoute exact path="/farmers/:id/listings" component={Listings} />
            <ProtectedRoute exact path="/prospects/:id" component={ProspectProfile} />
            <ProtectedRoute exact path="/connect-requests" component={Connects} />
            <ProtectedRoute exact path="/my-connects" component={Connects} />
            <Route exact path="/terms-of-service" component={TermsOfService} />
            <Route render={() => <NoMatch isAuthenticated={props.isAuthenticated} />} />
        </Switch>
    )
}

export default Routes;