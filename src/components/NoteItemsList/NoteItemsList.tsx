import React from 'react';
import './NoteItemsList.scss';
import NoteItem from '../NoteItem/NoteItem';
import { Note } from '../../models/models';

const NoteItemsList = ({ arrayOfNotes }: { arrayOfNotes: Note[] }): React.ReactElement => {
    const removeNoteItem = (id: string): void => {
        console.log(id);
    };

    const renderNotes = (): JSX.Element[] => {
        return arrayOfNotes.map((note) => {
            return <NoteItem note={note} key={note.id} removeNoteItem={removeNoteItem} />;
        });
    };

    return <>{renderNotes()}</>;
};

export default NoteItemsList;
