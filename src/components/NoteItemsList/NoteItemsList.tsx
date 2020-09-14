import React, { useState, useEffect } from 'react';
import NoteItem from '../NoteItem/NoteItem';
import { Note } from '../../models/models';

const firstElement = 0;

const NoteItemsList = ({
    arrayOfNotes,
    removeNoteItem,
    selectNoteItem,
    activeNoteIdProp,
    darkMode,
}: {
    arrayOfNotes: Note[];
    activeNoteIdProp?: string;
    removeNoteItem: (id: string) => void;
    selectNoteItem: (note: Note) => void;
    darkMode: boolean;
}): React.ReactElement => {
    const [activeNoteId, setActiveNoteId] = useState<string>(
        arrayOfNotes.length > firstElement ? arrayOfNotes[firstElement].id : '',
    );

    useEffect(() => {
        if (activeNoteIdProp) {
            setActiveNoteId(activeNoteIdProp);
        }
    }, [activeNoteIdProp]);

    const deleteNoteItem = (id: string): void => {
        removeNoteItem(id);
    };

    const setActiveNote = (note: Note): void => {
        selectNoteItem(note);
        setActiveNoteId(note.id);
    };

    const renderNotes = (): JSX.Element[] => {
        return arrayOfNotes.map((note) => {
            return (
                <div onClick={(): void => setActiveNote(note)} key={note.id}>
                    <NoteItem
                        note={note}
                        deleteNoteItem={deleteNoteItem}
                        isActive={note.id === activeNoteId}
                        darkMode={darkMode}
                    />
                </div>
            );
        });
    };

    return <>{renderNotes()}</>;
};

export default NoteItemsList;
