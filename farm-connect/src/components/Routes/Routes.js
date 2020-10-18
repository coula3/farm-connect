import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignUp from '../../containers/SignUp/SignUp';
import SignIn from '../../containers/SignIn/SignIn';
import MainPage from '../MainPage/MainPage';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/main" render={(props) => <MainPage props={props} />} /> }
        </Switch>
    )
}

export default Routes;