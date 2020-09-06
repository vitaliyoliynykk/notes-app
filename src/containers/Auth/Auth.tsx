import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { AuthContext } from './AuthProvider';
import { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/notes',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

class Auth extends React.Component<RouteComponentProps> {
    static contextType = AuthContext;

    componentDidUpdate(): void {
        const currentUser = this.context;
        if (currentUser) {
            this.props.history.push('/notes');
        }
    }

    render(): React.ReactElement {
        return (
            <div>
                <h1>Auth component</h1>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </div>
        );
    }
}

export default withRouter(Auth);
