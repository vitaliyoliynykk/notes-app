import React, { useState } from 'react';
import './NoteItem.scss';
import RemoveImg from '../../assets/remove.svg';
import { Note } from '../../models/models';
import RemoveModal from '../RemoveModal/RemoveModal';

const NoteItem = ({
    note,
    deleteNoteItem,
    isActive,
    darkMode,
}: {
    note: Note;
    deleteNoteItem: (id: string) => void;
    isActive: boolean;
    darkMode: boolean;
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

    let noteClass = 'container-note';
    if (darkMode) noteClass += '--dark';
    if (darkMode && isActive) noteClass += ' container-note--dark--active';
    else if (!darkMode && isActive) noteClass += ' container-note--active';

    return (
        <div className={noteClass}>
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
                    darkMode={darkMode}
                />
            ) : null}
        </div>
    );
};

export default NoteItem;
