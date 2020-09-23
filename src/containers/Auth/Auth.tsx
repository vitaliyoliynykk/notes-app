import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { AuthContext } from './AuthProvider';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './Auth.scss';
import GitHub from '../../assets/github-logo.svg';

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
            <div className="container-auth">
                <div className="container-auth__title">Notes App</div>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                <footer>
                    <div className="container-auth__footer">Created by:</div>
                    <a href="https://github.com/vitaliyoliynykk" target="blank" className="container-auth__owner">
                        /vitaliyoliynykk
                    </a>
                    <a href="https://github.com/leshihak" target="blank" className="container-auth__owner">
                        /leshihak
                    </a>
                    <img src={GitHub} alt="logo GitHub" className="container-auth__img" />
                </footer>
            </div>
        );
    }
}

export default withRouter(Auth);
