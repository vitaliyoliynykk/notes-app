import React from 'react';
import './Notes.scss';
import TextEditor from '../../components/TextEditor/TextEditor';
import NoteItem from '../../components/NoteItem/NoteItem';
import SearchInput from '../../components/SearchInput/SearchInput';

class Notes extends React.Component {
    render(): React.ReactElement {
        return (
            <>
                <SearchInput />
                <NoteItem />
                <TextEditor />
            </>
        );
    }
}

export default Notes;
