import React, { useState } from 'react';
import './NoteItem.scss';
import RemoveImg from '../../assets/remove.svg';
import { Note } from '../../models/models';
import RemoveModal from '../RemoveModal/RemoveModal';

const NoteItem = ({
    note,
    deleteNoteItem,
    isActive,
}: {
    note: Note;
    deleteNoteItem: (id: string) => void;
    isActive: boolean;
}): React.ReactElement => {
    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = (): void => {
        setIsOpen(true);
    };

    const closeModal = (): void => {
        setIsOpen(false);
    };

    const handleRemoveNoteItem = (id: string): void => {
        closeModal();
        deleteNoteItem(id);
    };

    const removeModalTitle = 'Do you really want to remove a Note?';

    return (
        <div className={isActive ? 'container-note container-note--active' : 'container-note'}>
            <div className="container-note__header">
                <div className="container-note__header_date">{note.date}</div>
                <img src={RemoveImg} alt="#" className="container-note__header_img" onClick={openModal} />
            </div>
            <div className="container-note__bottom">
                <div className="container-note__bottom_title">{note.title}</div>
                <div className="container-note__bottom_description">{note.description}</div>
            </div>
            {modalIsOpen ? (
                <RemoveModal
                    closeModal={closeModal}
                    handleRemove={(): void => handleRemoveNoteItem(note.id)}
                    modalTitle={removeModalTitle}
                />
            ) : null}
        </div>
    );
};

export default NoteItem;
