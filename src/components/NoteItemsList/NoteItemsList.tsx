import React, { useState, useEffect } from 'react';
import NoteItem from '../NoteItem/NoteItem';
import { Note } from '../../models/models';
import { FIRST_ELEMENT, ONE_NOTE_IN_ARRAY } from '../../containers/Notes/Notes.constants';

const NoteItemsList = ({
    arrayOfNotes,
    removeNoteItem,
    selectNoteItem,
    activeNoteIdProp,
    isDarkMode,
}: {
    arrayOfNotes: Note[];
    activeNoteIdProp?: string;
    removeNoteItem: (id: string) => void;
    selectNoteItem: (note: Note) => void;
    isDarkMode: boolean;
}): React.ReactElement => {
    const [activeNoteId, setActiveNoteId] = useState<string>(
        arrayOfNotes.length > FIRST_ELEMENT ? arrayOfNotes[FIRST_ELEMENT].id : '',
    );
    const [isOneNoteInArray, setIsOneNoteInArray] = useState(false);

    useEffect(() => {
        if (activeNoteIdProp) {
            setActiveNoteId(activeNoteIdProp);
        }
    }, [activeNoteIdProp]);

    useEffect(() => {
        arrayOfNotes.length === ONE_NOTE_IN_ARRAY ? setIsOneNoteInArray(true) : setIsOneNoteInArray(false);
    }, [arrayOfNotes]);

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
                        isDarkMode={isDarkMode}
                        isOneNoteInArray={isOneNoteInArray}
                    />
                </div>
            );
        });
    };

    return <>{renderNotes()}</>;
};

export default NoteItemsList;
