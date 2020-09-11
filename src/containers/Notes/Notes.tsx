import React from 'react';
import app from '../../base';
import { AuthContext } from '../Auth/AuthProvider';
import { Note, NotesState } from '../../models/models';
import './Notes.scss';
import NoteItemsList from '../../components/NoteItemsList/NoteItemsList';
import TextEditor from '../../components/TextEditor/TextEditor';
import { FIRST_ELEMENT, DEFAULT_NOTE } from './Notes.constants';

class Notes extends React.Component<{}, NotesState> {
    public static contextType = AuthContext;
    private database: firebase.database.Database;

    constructor(props: Readonly<{ user: firebase.User }>) {
        super(props);
        this.database = app.database(process.env.REACT_APP_DATABASE_URL);
        this.state = {
            user: null,
            activeNote: null,
            notes: [],
        };
    }

    public componentDidMount(): void {
        this.setState({ user: this.context });
        this.getNotesFromFirestore();
    }

    private getNotesFromFirestore(): void {
        this.database
            .ref(`/users/${this.context?.uid}/notes`)
            .once('value')
            .then((snapshot) => {
                if (snapshot.val()) {
                    const notes: Note[] = Object.values(snapshot.val());
                    this.setState({ ...this.state, notes, activeNote: notes[FIRST_ELEMENT] });
                } else {
                    this.setState({ ...this.state, notes: [DEFAULT_NOTE], activeNote: DEFAULT_NOTE });
                }
            });
    }

    private updateNoteInLocalState(note: Note): Note[] {
        const stateNotes = this.state.notes;
        const indexToEdit = stateNotes.findIndex((stateNote) => stateNote.id === note.id);
        stateNotes[indexToEdit] = note;

        return stateNotes;
    }

    private saveNoteToFirebase(note: Note): void {
        this.database.ref(`/users/${this.state.user?.uid}/notes/${note.id}`).set({
            ...note,
        });
    }

    private onNoteChange(note: Note): void {
        const updatedNotes = this.updateNoteInLocalState(note);
        this.setState({ ...this.state, notes: updatedNotes });
        this.saveNoteToFirebase(note);
    }

    private setActiveNote(note: Note): void {
        this.setState({
            ...this.state,
            activeNote: note,
        });
    }

    public render(): React.ReactElement {
        return (
            <div className="container-notes">
                <div className="notes__menu">
                    {this.state.user && (
                        <img src={this.state.user.photoURL as string} alt="user" className="user-photo" />
                    )}
                </div>
                <div className="notes__list">
                    <NoteItemsList
                        arrayOfNotes={this.state.notes}
                        removeNoteItem={(): null => null}
                        selectNoteItem={this.setActiveNote.bind(this)}
                        activeNoteIdProp={this.state.activeNote?.id}
                    ></NoteItemsList>
                </div>
                <div className="notes__editor">
                    {this.state.activeNote ? (
                        <TextEditor
                            noteItem={this.state.activeNote}
                            onChange={(note): void => this.onNoteChange(note)}
                        ></TextEditor>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default Notes;
