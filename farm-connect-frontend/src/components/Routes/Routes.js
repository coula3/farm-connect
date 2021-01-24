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
import PublicRoute from './PublicRoute';

const Routes = (props) => {
    return (
        <Switch>
            <PublicRoute exact path="/" component={SignIn} />
            <PublicRoute path="/signup" component={SignUp} />
            <PublicRoute path="/signout" component={SignOut} />
            <ProtectedRoute path="/listings/new" component={CreateListing} />
            <ProtectedRoute path="/listings/other-farmers" component={Listings} />
            <ProtectedRoute path="/listings/my-interests" component={Listings} />
            <ProtectedRoute path="/listings/:id/edit" component={EditListing} />
            <ProtectedRoute path="/listings/:id" component={Listing} />
            <ProtectedRoute path="/listings" component={Listings} />
            <ProtectedRoute path="/users/search-farmers" component={SearchUsers} />
            <ProtectedRoute path="/users/search-prospects" component={SearchUsers} />
            <ProtectedRoute path="/users/:id/edit" component={EditUser} />
            <ProtectedRoute path="/users/:id/listings" component={Listings}/>
            <ProtectedRoute path="/users/:id/closed-listings" component={Listings}/>
            <ProtectedRoute path="/users/:id" component={CurrentUser} />
            <ProtectedRoute path="/farmers/:id/listings" component={Listings} />
            <ProtectedRoute path="/farmers/:id" component={FarmerProfile} />
            <ProtectedRoute path="/prospects/:id" component={ProspectProfile} />
            <ProtectedRoute path="/connect-requests" component={Connects} />
            <ProtectedRoute path="/my-connects" component={Connects} />
            <PublicRoute exact path="/terms-of-service" component={TermsOfService} />
            <Route render={() => <NoMatch isAuthenticated={props.isAuthenticated} />} />
        </Switch>
    )
}

export default Routes;