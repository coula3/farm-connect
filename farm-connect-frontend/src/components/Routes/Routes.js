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

const Routes = (props) => {
    return (
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signout" component={SignOut} />
            <Route exact path="/listings" component={Listings} />
            <Route exact path="/users/search-farmers" component={SearchUsers} />
            <Route exact path="/users/search-prospects" component={SearchUsers} />
            <Route exact path="/listings/other-farmers" component={Listings} />
            <Route exact path="/listings/my-interests" component={Listings} />
            <Route exact path="/listings/new" render={routerProps => <CreateListing
                {...routerProps}
                commodities={props.commodities} /> }
            />
            <Route exact path="/listings/:id" render={ routerProps => <Listing
                {...routerProps}
                listing={props.listing}
                isLoading={props.isLoading}
                userId={props.userId}
                userAttributes={props.userAttributes}
                hasListingChanged={props.hasListingChanged}
                openListingsRendered={props.openListingsRendered}
                removeUserListingInterest={(listingId, interestId, currentUserId) => props.removeUserListingInterest(listingId, interestId, currentUserId)}
                addUserListingInterest={(currentUserId, listingId) => props.addUserListingInterest(currentUserId, listingId)}
                fetchFarmer={(farmerId) => props.fetchFarmer(farmerId)}
                fetchListings={() => props.fetchListings()}/> }
            />
            <Route exact path="/farmers/:id" render={ routerProps => <FarmerProfile
                { ...routerProps}
                farmer={props.farmer}
                isLoadingFarmer={props.isLoadingFarmer}
                userAttributes={props.userAttributes}
                userId={props.userId}
                userConnects={props.userConnects}
                farmerPhoto={props.farmerPhoto}
                fetchListings={(farmerId, routerProps) => props.fetchListings(farmerId, routerProps)}
                requestConnect={(currentUserId, connectId) => props.requestConnect(currentUserId, connectId)}
                acceptConnect={(currentUserId, connectId) => props.acceptConnect(currentUserId, connectId)}
                unConnectUsers={(currentUserId, connectId) => props.unConnectUsers(currentUserId, connectId)} /> }
            />
            <Route exact path="/users/:id" render={ routerProps => <CurrentUser
                {...routerProps}
                userId={props.userId}
                userAttributes={props.userAttributes}
                userPhoto={props.userPhoto} /> }
            />
            <Route exact path="/listings/:id/edit" component={EditListing} />
            <Route exact path="/prospects/:id" render={(routerProps) => <ProspectProfile
                {...routerProps}
                isLoadingProspect={props.isLoadingProspect}
                prospect={props.prospect}
                userId={props.userId}
                userAttributes={props.userAttributes}
                userConnects={props.userConnects}
                requestConnect={(currentUserId, connectId) => props.requestConnect(currentUserId, connectId)}
                acceptConnect={(currentUserId, connectId) => props.acceptConnect(currentUserId, connectId)}
                unConnectUsers={(currentUserId, connectId) => props.unConnectUsers(currentUserId, connectId)} />}
            />
            <Route exact path="/users/:id/listings" component={Listings}/>
            <Route exact path="/farmers/:id/listings" component={Listings} />
            <Route exact path="/users/:id/edit" component={EditUser} />
            <Route exact path="/users/:id/closed-listings" component={Listings}/>
            <Route exact path="/connect-requests" render={routerProps => <Connects
                {...routerProps}
                userId={props.userId}
                userConnects={props.userConnects}
                fetchFarmer={(farmerId) => props.fetchFarmer(farmerId)}
                fetchProspect={(prospectId) => props.fetchProspect(prospectId)} />}
            />
            <Route exact path="/my-connects" render={routerProps => <Connects
                {...routerProps}
                userId={props.userId}
                userConnects={props.userConnects}
                fetchFarmer={(farmerId) => props.fetchFarmer(farmerId)}
                fetchProspect={(prospectId) => props.fetchProspect(prospectId)} />}
            />
            <Route exact path="/terms-of-service" component={TermsOfService} />
            <Route render={() => <NoMatch isAuthenticated={props.isAuthenticated} />} />
        </Switch>
    )
}

export default Routes;