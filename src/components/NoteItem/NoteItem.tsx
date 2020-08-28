import React from 'react';
import './NoteItem.scss';
import { uuid } from 'uuidv4';

interface Props {
    arrayOfNotes: Note[];
}

interface Note {
    title: string;
    description: string;
}

const NoteItem = ({ arrayOfNotes }: Props): React.ReactElement => {
    const renderNotes = (): JSX.Element[] => {
        return arrayOfNotes.map((item: Note) => {
            return (
                <div className="note-item" key={uuid()}>
                    <div className="title-note-item">{item.title}</div>
                    <div className="description-note-item">{item.description}</div>
                </div>
            );
        });
    };
    return <div className="container-note-item">{renderNotes()}</div>;
};

export default NoteItem;
