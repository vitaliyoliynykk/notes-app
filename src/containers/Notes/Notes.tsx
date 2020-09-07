/* eslint-disable @typescript-eslint/no-magic-numbers */
import React from 'react';
import './Notes.scss';
import TextEditor from '../../components/TextEditor/TextEditor';
import NoteItemsList from '../../components/NoteItemsList/NoteItemsList';
import { Note } from '../../models/models';
import { v4 as uuidv4 } from 'uuid';

class Notes extends React.Component {
    arrayOfNotes: Note[] = [
        {
            title: 'test1',
            description: 'test1',
            date: 'test1',
            id: uuidv4(),
            fontSize: '10px',
            textAlign: 'left',
        },
        {
            title: 'test2',
            description: 'test2',
            date: 'test2',
            id: uuidv4(),
            fontSize: '10px',
            textAlign: 'left',
        },
    ];
    render(): React.ReactElement {
        return (
            <>
                <NoteItemsList arrayOfNotes={this.arrayOfNotes} />
                <TextEditor noteItem={this.arrayOfNotes[0]} />
            </>
        );
    }
}

export default Notes;
