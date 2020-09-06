import React from 'react';
import './NoteItemsList.scss';
import NoteItem from '../NoteItem/NoteItem';
import { v4 as uuidv4 } from 'uuid';
import { Note } from '../../models/models';

const NoteItemsList = (): React.ReactElement => {
    const arrayOfNotes: Note[] = [
        {
            title: 'test1',
            description: 'test1',
        },
        {
            title: 'test2',
            description: 'test2',
        },
    ];

    const renderNotes = (): JSX.Element[] => {
        return arrayOfNotes.map((note) => {
            return <NoteItem note={note} key={uuidv4()} />;
        });
    };

    return <>{renderNotes()}</>;
};

export default NoteItemsList;
