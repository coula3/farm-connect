import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignUp from '../../containers/SignUp/SignUp';
import SignIn from '../../containers/SignIn/SignIn';
import SignOut from '../../components/SignOut/SignOut';
import MainPage from '../../containers/MainPage/MainPage';
import CreateListing from '../../containers/CreateListing/CreateListing';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signout" component={SignOut} />
            <Route path="/main" render={routerProps => <MainPage {...routerProps} />} /> }
            <Route path="/listings/new" component={CreateListing} />
        </Switch>
    )
}

export default Routes;