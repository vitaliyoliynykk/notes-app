import React from 'react';
import './App.scss';
import Auth from './containers/Auth/Auth';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Notes from './containers/Notes/Notes';
import { AuthProvider } from './containers/Auth/AuthProvider';
import PrivateRoute from './PrivateRoute';
import Page404 from './components/Page404/Page404';

function App(): React.ReactElement {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route path="/auth" component={Auth} />
                    <PrivateRoute path="/notes" component={Notes} />
                    <Route exact path="/">
                        <Redirect to="/notes" />
                    </Route>
                    <Route path="" component={Page404} />
                    <Route path="*" component={Page404} />
                    <Route component={Page404} />
                </Switch>
            </Router>
        </AuthProvider>
    );
}

export default App;
