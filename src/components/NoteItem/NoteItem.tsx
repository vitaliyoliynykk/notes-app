import React, { useState } from 'react';
import './NoteItem.scss';
import RemoveImg from '../../assets/remove.svg';
import { Note } from '../../models/models';
import RemoveModal from '../RemoveModal/RemoveModal';
import { REMOVE_NOTE_TITLE } from './NoteItem.constants';
import classNames from 'classnames';

const NoteItem = ({
    note,
    deleteNoteItem,
    isActive,
    isDarkMode,
}: {
    note: Note;
    deleteNoteItem: (id: string) => void;
    isActive: boolean;
    isDarkMode: boolean;
}): React.ReactElement => {
    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = (): void => {
        setIsOpen(true);
    };

    const closeModal = (): void => {
        setIsOpen(false);
    };

    const handleRemoveNoteItem = (id: string, event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.stopPropagation();
        closeModal();
        deleteNoteItem(id);
    };

    const noteClass = classNames('container-note', {
        'container-note--dark': isDarkMode,
        'container-note--dark--active': isDarkMode && isActive,
        'container-note--active': !isDarkMode && isActive,
    });

    const formatDate = (note: Note): string => {
        return new Date(note.date).toLocaleString();
    };

    return (
        <div className={noteClass}>
            <div className="container-note__header">
                <div className="container-note__header_date">{formatDate(note)}</div>
                <img src={RemoveImg} alt="remove icon" className="container-note__header_img" onClick={openModal} />
            </div>
            <div className="container-note__bottom">
                <div className="container-note__bottom_title">{note.title}</div>
                <div className="container-note__bottom_description">{note.description}</div>
            </div>
            {modalIsOpen ? (
                <RemoveModal
                    closeModal={closeModal}
                    handleRemove={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void =>
                        handleRemoveNoteItem(note.id, event)
                    }
                    modalTitle={REMOVE_NOTE_TITLE}
                    isDarkMode={isDarkMode}
                />
            ) : null}
        </div>
    );
};

export default NoteItem;
