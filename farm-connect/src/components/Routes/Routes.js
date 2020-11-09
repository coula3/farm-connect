import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignUp from '../../containers/SignUp/SignUp';
import SignIn from '../../containers/SignIn/SignIn';
import SignOut from '../../components/SignOut/SignOut';
import CreateListing from '../../containers/CreateListing/CreateListing';
import Listings from '../../containers/Listings/Listings';
import Listing from '../../components/Listing/Listing';
import CurrentUser from '../CurrentUser/CurrentUser';
import FarmerProfile from '../../components/FarmerProfile/FarmerProfile';
import EditListing from '../../containers/EditListing/EditListing';
import ProspectProfile from '../ProspectProfile/ProspectProfile';
import EditUser from '../../containers/EditUser/EditUser';

const Routes = (props) => {
    return (
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signout" component={SignOut} />
            <Route exact path="/listings" component={Listings} />
            <Route exact path="/listings/other-farmers" component={Listings} />
            <Route exact path="/listings/new" render={routerProps => <CreateListing
                {...routerProps}
                commodities={props.commodities} /> }
            />
            <Route exact path="/listings/:id" render={ routerProps => <Listing
                {...routerProps}
                listing={props.listing}
                isLoading={props.isLoading}
                userId={props.userId}
                removeUserListingInterest={(listingId, interestId) => props.removeUserListingInterest(listingId, interestId)}
                addUserListingInterest={(currentUserId, listingId) => props.addUserListingInterest(currentUserId, listingId)} /> }
            />
            <Route exact path="/farmers/:id" render={ routerProps => <FarmerProfile
                { ...routerProps}
                farmer={props.farmer}
                isLoadingFarmer={props.isLoadingFarmer}
                userAttributes={props.userAttributes}
                userId={props.userId}
                farmerPhoto={props.farmerPhoto}
                connectUsers={(currentUserId, connectId) => props.connectUsers(currentUserId, connectId)}
                unConnectUsers={(currentUserId, connectId) => props.unConnectUsers(currentUserId, connectId)} /> }
            />
            <Route exact path="/users/:id" render={ routerProps => <CurrentUser
                {...routerProps}
                userId={props.userId}
                userAttributes={props.userAttributes}
                userPhoto={props.userPhoto} /> }
            />
            <Route exact path="/listings/:id/edit" component={EditListing} />
            <Route path="/prospects/:id" render={(routerProps) => <ProspectProfile
                {...routerProps}
                isLoadingProspect={props.isLoadingProspect}
                prospect={props.prospect}
                userId={props.userId}
                userAttributes={props.userAttributes}
                connectUsers={(currentUserId, connectId) => props.connectUsers(currentUserId, connectId)}
                unConnectUsers={(currentUserId, connectId) => props.unConnectUsers(currentUserId, connectId)} />}
            />
            <Route path="/users/:id/listings" component={Listings}/>
            <Route path="/farmers/:id/listings" component={Listings} />
            <Route path="/users/:id/edit" component={EditUser} />
            <Route path="/users/:id/closed-listings" component={Listings}/>
        </Switch>
    )
}

export default Routes;