import React from 'react';
import app from '../../base';

class Notes extends React.Component {
    logOut(): void {
        app.auth().signOut();
    }

    render(): React.ReactElement {
        return (
            <>
                <h1>Notes component</h1>
                <button onClick={(): void => this.logOut()}>log out</button>
            </>
        );
    }
}

export default Notes;
