import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignUp from '../../containers/SignUp/SignUp';
import SignIn from '../../containers/SignIn/SignIn';
import SignOut from '../../components/SignOut/SignOut';
import MainPage from '../../containers/MainPage/MainPage';
import CreateListing from '../../containers/CreateListing/CreateListing';

const Routes = (props) => {
    return (
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signout" component={SignOut} />
            <Route path="/main" render={routerProps => <MainPage {...routerProps} />} /> }
            <Route path="/listings/new" render={routerProps => <CreateListing {...routerProps} commodities={props.commodities}/> }  />
        </Switch>
    )
}

export default Routes;