import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignUp from '../../containers/SignUp/SignUp';
import SignIn from '../../containers/SignIn/SignIn';
import SignOut from '../../components/SignOut/SignOut';
import CreateListing from '../../containers/CreateListing/CreateListing';
import Listings from '../../containers/Listings/Listings';
import Listing from '../../components/Listing/Listing';
import FarmerProfile from '../../components/FarmerProfile/FarmerProfile';

const Routes = (props) => {
    return (
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signout" component={SignOut} />
            <Route exact path="/listings" component={Listings} />
            <Route exact path="/listings/new" render={routerProps => <CreateListing {...routerProps} commodities={props.commodities} /> } />
            <Route path="/listings/:id" render={ routerProps => <Listing {...routerProps} listing={props.listing} isLoading={props.isLoading} /> } />
            <Route path="/farmers/:id" render={ routerProps => <FarmerProfile { ...routerProps} test={props.test} farmer={props.farmer} isLoadingFarmer={props.isLoadingFarmer} /> } />
        </Switch>
    )
}

export default Routes;