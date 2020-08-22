import React from 'react';

import './App.scss';
import Auth from './containers/Auth/Auth';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Notes from './containers/Notes/Notes';

function App(): React.ReactElement {
    return (
        <Router>
            <Switch>
                <Route path="/auth" component={Auth} />
                <Route path="/notes" component={Notes} />
                <Route exact path="/">
                    <Redirect to="/notes" />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
