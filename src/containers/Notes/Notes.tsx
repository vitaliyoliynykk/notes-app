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
import Loader from '../../components/Loader/Loader';
import SearchInput from '../../components/SearchInput/SearchInput';
import classNames from 'classnames';

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
            isDarkMode: false,
            loading: true,
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
                    const sortedArrayByDate = notes.sort((a, b) => +new Date(b.date) - +new Date(a.date));
                    this.setState({
                        ...this.state,
                        notes: sortedArrayByDate,
                        activeNote: sortedArrayByDate[FIRST_ELEMENT],
                        loading: false,
                    });
                } else {
                    const note = getDefaultNote();
                    this.setState({ ...this.state, notes: [note], activeNote: note, loading: true });
                }
            })
            .catch(() => {
                this.setState({ ...this.state, loading: false });
            });
    }

    private updateNoteInLocalState(note: Note): Note[] {
        note.date = Date.now();
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
        const arraySortedByDate = updatedNotes.sort((a, b) => +b.date - +a.date);
        this.setState({
            ...this.state,
            notes: arraySortedByDate,
        });
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
        this.setState({ ...this.state, isDarkMode: true });
    }

    private getSearchInputValue(input: string): void {
        const sortedArray = this.sortArrayBySearchInputValue(input);
        this.setState({ ...this.state, notes: sortedArray });
    }

    public sortArrayBySearchInputValue = (input: string): Note[] => {
        return this.state.notes.sort((a, b) => {
            const aIsBefore = -1;
            const bIsBefore = 1;
            if (a.title.startsWith(input) && b.title.startsWith(input)) return a.title.localeCompare(b.title);
            else if (a.title.startsWith(input)) return aIsBefore;
            else if (b.title.startsWith(input)) return bIsBefore;
            return a.title.localeCompare(b.title);
        });
    };

    public render(): React.ReactElement {
        return (
            <>
                {this.state.loading ? (
                    <div className="loader-component">
                        <Loader />
                    </div>
                ) : (
                    <div className="container-notes">
                        <div
                            className={classNames('notes__menu', {
                                'notes__menu--dark': this.state.isDarkMode,
                            })}
                        >
                            {this.state.user && (
                                <img src={this.state.user.photoURL as string} alt="user" className="user-photo" />
                            )}
                            <img
                                src={AddNote}
                                alt="add note"
                                className={classNames('notes__img', {
                                    'notes__img--dark': this.state.isDarkMode,
                                })}
                                onClick={this.addNewNote.bind(this)}
                            />
                            {this.state.isDarkMode ? (
                                <img
                                    src={LightMode}
                                    alt="light mode"
                                    className={classNames('notes__img', {
                                        'notes__img--dark': this.state.isDarkMode,
                                    })}
                                    onClick={(): void => this.setState({ ...this.state, isDarkMode: false })}
                                />
                            ) : (
                                <img
                                    src={DarkMode}
                                    alt="dark mode"
                                    className={classNames('notes__img', {
                                        'notes__img--dark': this.state.isDarkMode,
                                    })}
                                    onClick={this.switchDarkMode.bind(this)}
                                />
                            )}
                            <img
                                src={LogOut}
                                alt="log out"
                                className={classNames('notes__img', {
                                    'notes__img--dark': this.state.isDarkMode,
                                })}
                                onClick={this.logOutFromNoteApp}
                            />
                        </div>
                        <div
                            className={classNames('notes__list', {
                                'notes__list--dark': this.state.isDarkMode,
                            })}
                        >
                            <SearchInput
                                getSearchInputValue={this.getSearchInputValue.bind(this)}
                                isDarkMode={this.state.isDarkMode}
                            />
                            <NoteItemsList
                                arrayOfNotes={this.state.notes}
                                removeNoteItem={this.removeNoteItem.bind(this)}
                                selectNoteItem={this.setActiveNote.bind(this)}
                                activeNoteIdProp={this.state.activeNote?.id}
                                isDarkMode={this.state.isDarkMode}
                            ></NoteItemsList>
                        </div>
                        <div
                            className={classNames('notes__editor', {
                                'notes__editor--dark': this.state.isDarkMode,
                            })}
                        >
                            {this.state.activeNote ? (
                                <TextEditor
                                    noteItem={this.state.activeNote}
                                    onChange={(note): void => this.onNoteChange(note)}
                                    isDarkMode={this.state.isDarkMode}
                                ></TextEditor>
                            ) : null}
                        </div>
                    </div>
                )}
            </>
        );
    }
}

export default Notes;
