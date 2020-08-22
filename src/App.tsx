import React from 'react';

import './App.scss';
import Auth from './containers/Auth/Auth';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Notes from './containers/Notes/Notes';

function App(): React.ReactElement {
    return (
        <Router>
            <Switch>
                <Route path="/auth" component={Auth} />
                <Route path="/notes" component={Notes} />
            </Switch>
        </Router>
    );
}

export default App;
