import React from 'react';
import './Notes.scss';
import TextEditor from '../../components/TextEditor/TextEditor';
import NoteItemsList from '../../components/NoteItemsList/NoteItemsList';

class Notes extends React.Component {
    render(): React.ReactElement {
        return (
            <>
                <NoteItemsList />
                <TextEditor />
            </>
        );
    }
}

export default Notes;
