import React from 'react';
import './NoteItem.scss';
import RemoveImg from '../../assets/remove.png';
import { Note } from '../../models/models';

const NoteItem = ({ note }: { note: Note }): React.ReactElement => {
    const renderNote = (): JSX.Element => {
        return (
            <>
                <div className="container-note__header">
                    <div className="container-note__header_date">21 August 2020, 6:20 PM</div>
                    <img src={RemoveImg} alt="#" className="container-note__header_img" />
                </div>
                <div className="container-note__bottom">
                    <div className="container-note__bottom_title">{note.title}</div>
                    <div className="container--note__bottom_description">{note.description}</div>
                </div>
            </>
        );
    };

    return <div className="container-note">{renderNote()}</div>;
};

export default NoteItem;
