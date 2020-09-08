import React from 'react';
import app from '../../base';
import { AuthContext } from '../Auth/AuthProvider';
import TextEditor from '../../components/TextEditor/TextEditor';
import { Note } from '../../models/models';

class Notes extends React.Component<{}, { user: firebase.User | null }> {
    public static contextType = AuthContext;
    private database: firebase.database.Database;

    constructor(props: Readonly<{ user: firebase.User }>) {
        super(props);
        this.database = app.database(process.env.REACT_APP_DATABASE_URL);
        this.state = {
            user: null,
        };
    }

    componentDidMount(): void {
        this.setState({ user: this.context });
        this.database.ref(`/users/${this.state.user?.uid}/note`).on('value', (snapshot) => {
            console.log(snapshot.val(), 'value changed');
        });
    }

    logOut(): void {
        app.auth().signOut();
    }

    onNoteChange(note: Note): void {
        if (this.database) {
            this.database.ref(`/users/${this.state.user?.uid}/note`).set({
                ...note,
            });
        }
    }

    render(): React.ReactElement {
        return (
            <>
                <h1>Notes component</h1>
                <button onClick={(): void => this.logOut()}>log out</button>
                <TextEditor onChange={this.onNoteChange.bind(this)}></TextEditor>
            </>
        );
    }
}

export default Notes;
