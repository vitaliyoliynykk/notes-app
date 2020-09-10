import React from 'react';
import './NoteItem.scss';
import RemoveImg from '../../assets/remove.png';
import { Note } from '../../models/models';

const NoteItem = ({
    note,
    deleteNoteItem,
    isActive,
}: {
    note: Note;
    deleteNoteItem: (id: string) => void;
    isActive: boolean;
}): React.ReactElement => {
    const handleRemoveNoteItem = (id: string): void => {
        deleteNoteItem(id);
    };

    return (
        <div className={isActive ? 'container-note container-note--active' : 'container-note'}>
            <div className="container-note__header">
                <div className="container-note__header_date">{note.date}</div>
                <img
                    src={RemoveImg}
                    alt="#"
                    className="container-note__header_img"
                    onClick={(): void => handleRemoveNoteItem(note.id)}
                />
            </div>
            <div className="container-note__bottom">
                <div className="container-note__bottom_title">{note.title}</div>
                <div className="container-note__bottom_description">{note.description}</div>
            </div>
        </div>
    );
};

export default NoteItem;
