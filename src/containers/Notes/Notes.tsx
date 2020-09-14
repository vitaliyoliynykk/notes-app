import React from 'react';
import app from '../../base';
import { AuthContext } from '../Auth/AuthProvider';
import { Note, NotesState } from '../../models/models';
import './Notes.scss';
import NoteItemsList from '../../components/NoteItemsList/NoteItemsList';
import TextEditor from '../../components/TextEditor/TextEditor';
import AddNote from '../../assets/addnote.svg';
import { FIRST_ELEMENT, getDefaultNote } from './Notes.constants';
import LogOut from '../../assets/logout.svg';
import DarkMode from '../../assets/moon.svg';
import LightMode from '../../assets/sunlight.svg';

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
            darkMode: false,
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
                    const note = getDefaultNote();
                    this.setState({ ...this.state, notes: [note], activeNote: note });
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

    private addNewNote(): void {
        const note = getDefaultNote();
        this.setState({ ...this.state, notes: [note, ...this.state.notes], activeNote: note });
        this.saveNoteToFirebase(note);
    }

    private logOutFromNoteApp(): void {
        app.auth().signOut();
    }

    private removeNoteItem(id: string): void {
        this.setState({ ...this.state, notes: this.state.notes.filter((note) => note.id !== id) });
    }

    private switchDarkMode(): void {
        this.setState({ ...this.state, darkMode: true });
    }

    public render(): React.ReactElement {
        return (
            <div className="container-notes">
                <div className={this.state.darkMode ? 'notes__menu--dark' : 'notes__menu'}>
                    {this.state.user && (
                        <img src={this.state.user.photoURL as string} alt="user" className="user-photo" />
                    )}
                    <img
                        src={AddNote}
                        alt="icon"
                        className={this.state.darkMode ? 'notes__img--dark' : 'notes__img'}
                        onClick={this.addNewNote.bind(this)}
                    />
                    <img
                        src={DarkMode}
                        alt="darkmode"
                        className={this.state.darkMode ? 'notes__img--dark' : 'notes__img'}
                        onClick={this.switchDarkMode.bind(this)}
                    />
                    <img
                        src={LightMode}
                        alt="lightmode"
                        className={this.state.darkMode ? 'notes__img--dark' : 'notes__img'}
                        onClick={(): void => this.setState({ ...this.state, darkMode: false })}
                    />
                    <img
                        src={LogOut}
                        alt="icon"
                        className={this.state.darkMode ? 'notes__img--dark' : 'notes__img'}
                        onClick={this.logOutFromNoteApp}
                    />
                </div>
                <div className={this.state.darkMode ? 'notes__list--dark' : 'notes__list'}>
                    <NoteItemsList
                        arrayOfNotes={this.state.notes}
                        removeNoteItem={this.removeNoteItem.bind(this)}
                        selectNoteItem={this.setActiveNote.bind(this)}
                        activeNoteIdProp={this.state.activeNote?.id}
                        darkMode={this.state.darkMode}
                    ></NoteItemsList>
                </div>
                <div className={this.state.darkMode ? 'notes__editor--dark' : 'notes__editor'}>
                    {this.state.activeNote ? (
                        <TextEditor
                            noteItem={this.state.activeNote}
                            onChange={(note): void => this.onNoteChange(note)}
                            darkMode={this.state.darkMode}
                        ></TextEditor>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default Notes;
