import React, { useState } from 'react';
import './Notes.scss';
import TextEditor from '../../components/TextEditor/TextEditor';
import NoteItem from '../../components/NoteItem/NoteItem';

interface Note {
    title: string;
    description: string;
}

const Notes = (): React.ReactElement => {
    const [arrayOfNotes, setArrayOfNotes] = useState<Note[]>([]);

    const getObjectNote = (obj: Note): void => {
        setArrayOfNotes([...arrayOfNotes, obj]);
        console.log(arrayOfNotes);
    };

    return (
        <>
            <div className="header-notes-title">Notes App</div>
            <div className="container">
                <NoteItem arrayOfNotes={arrayOfNotes} />
                <TextEditor getObjectNote={getObjectNote} />
            </div>
        </>
    );
};

export default Notes;
