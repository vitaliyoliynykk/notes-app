import React from 'react';
import app from '../../base';
import { AuthContext } from '../Auth/AuthProvider';
import { Note, NotesState } from '../../models/models';
import './Notes.scss';
import NoteItemsList from '../../components/NoteItemsList/NoteItemsList';
import TextEditor from '../../components/TextEditor/TextEditor';
import { ReactComponent as AddNote } from '../../assets/addnote.svg';
import { ReactComponent as LogOut } from '../../assets/logout.svg';
import { ReactComponent as DarkMode } from '../../assets/moon.svg';
import { ReactComponent as LightMode } from '../../assets/sunlight.svg';
import { emptyValue, FIRST_ELEMENT, getDefaultNote } from './Notes.constants';
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
            isOpenNotesList: false,
            searchValue: null,
            searchNotes: [],
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
            isOpenNotesList: true,
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

    private openMobileLayout(): void {
        this.setState({ ...this.state, isOpenNotesList: true });
    }

    private getSearchInputValue(input: string): void {
        const filteredArray = this.filterArrayBySearchValue(input);
        this.setState({ ...this.state, searchNotes: filteredArray, searchValue: input });
    }

    public filterArrayBySearchValue = (input: string): Note[] => {
        const arrayFilteredBySearchValue = this.state.notes.filter((note) =>
            note.title.toLowerCase().includes(input.toLowerCase()),
        );
        return arrayFilteredBySearchValue;
    };

    public render(): React.ReactElement {
        const noteListClass = classNames('notes__list', {
            'notes__list--dark': this.state.isDarkMode,
            'notes__list--hide': this.state.isOpenNotesList,
        });

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
                            <AddNote
                                style={this.state.isDarkMode ? { fill: 'black' } : { fill: 'white' }}
                                className="notes__img"
                                onClick={this.addNewNote.bind(this)}
                            />
                            {this.state.isDarkMode ? (
                                <LightMode
                                    style={this.state.isDarkMode ? { fill: 'black' } : { fill: 'white' }}
                                    className="notes__img"
                                    onClick={(): void => this.setState({ ...this.state, isDarkMode: false })}
                                />
                            ) : (
                                <DarkMode
                                    style={this.state.isDarkMode ? { fill: 'black' } : { fill: 'white' }}
                                    className="notes__img"
                                    onClick={this.switchDarkMode.bind(this)}
                                />
                            )}
                            <LogOut
                                style={this.state.isDarkMode ? { fill: 'black' } : { fill: 'white' }}
                                className="notes__img"
                                onClick={this.logOutFromNoteApp}
                            />
                        </div>
                        {this.state.isOpenNotesList ? (
                            <button
                                className={classNames('notes__btn', { 'notes__btn--dark': this.state.isDarkMode })}
                                onClick={(): void => this.setState({ ...this.state, isOpenNotesList: false })}
                            >
                                Show
                            </button>
                        ) : (
                            <button
                                className={classNames('notes__btn', { 'notes__btn--dark': this.state.isDarkMode })}
                                onClick={this.openMobileLayout.bind(this)}
                            >
                                Hide
                            </button>
                        )}
                        <div className={noteListClass}>
                            <SearchInput
                                getSearchInputValue={this.getSearchInputValue.bind(this)}
                                isDarkMode={this.state.isDarkMode}
                            />
                            <NoteItemsList
                                arrayOfNotes={
                                    this.state.searchValue && this.state.searchValue.trim().length > FIRST_ELEMENT
                                        ? this.state.searchNotes
                                        : this.state.notes
                                }
                                removeNoteItem={this.removeNoteItem.bind(this)}
                                selectNoteItem={this.setActiveNote.bind(this)}
                                activeNoteIdProp={this.state.activeNote?.id}
                                isDarkMode={this.state.isDarkMode}
                            />
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
