import React from 'react';
import TextEditor from '../../components/TextEditor/TextEditor';

class Notes extends React.Component {
    render(): React.ReactElement {
        return (
            <>
                <h1>Notes component</h1>
                <TextEditor />
            </>
        );
    }
}

export default Notes;
