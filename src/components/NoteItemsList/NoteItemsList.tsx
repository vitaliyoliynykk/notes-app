import React from 'react';
import './NoteItemsList.scss';
import NoteItem from '../NoteItem/NoteItem';
import { Note } from '../../models/models';

const NoteItemsList = ({
    arrayOfNotes,
    removeNoteItem,
}: {
    arrayOfNotes: Note[];
    removeNoteItem: (id: string) => void;
}): React.ReactElement => {
    const deleteNoteItem = (id: string): void => {
        removeNoteItem(id);
    };

    const renderNotes = (): JSX.Element[] => {
        return arrayOfNotes.map((note) => {
            return <NoteItem note={note} key={note.id} deleteNoteItem={deleteNoteItem} />;
        });
    };

    return <>{renderNotes()}</>;
};

export default NoteItemsList;
