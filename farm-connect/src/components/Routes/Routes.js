import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignUp from '../../containers/SignUp/SignUp';
import SignIn from '../../containers/SignIn/SignIn';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route path="/signup" component={SignUp} />
        </Switch>
    )

}

export default Routes;