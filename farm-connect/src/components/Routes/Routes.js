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

const Routes = (props) => {
    return (
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signout" component={SignOut} />
            <Route exact path="/listings" component={Listings} />
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
            <Route path="/farmers/:id" render={ routerProps => <FarmerProfile
                { ...routerProps}
                farmer={props.farmer}
                isLoadingFarmer={props.isLoadingFarmer} /> }
            />
            <Route path="/users/:id" render={ routerProps => <CurrentUser
                {...routerProps}
                userId={props.userId}
                userAttributes={props.userAttributes} /> }
            />
            <Route exact path="/listings/:id/edit" component={EditListing} />
            <Route path="/prospects/:id" render={(routerProps) => <ProspectProfile
                {...routerProps}
                isLoadingProspect={props.isLoadingProspect}
                prospect={props.prospect} />}
            />
        </Switch>
    )
}

export default Routes;