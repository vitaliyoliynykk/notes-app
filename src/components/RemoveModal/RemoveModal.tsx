import React from 'react';
import './RemoveModal.scss';
import ReactModal from 'react-modal';
import RemoveImg from '../../assets/remove.svg';

export const RemoveModal = ({
    closeModal,
    handleRemove,
    modalTitle,
    darkMode,
}: {
    closeModal: () => void;
    handleRemove: () => void;
    modalTitle: string;
    darkMode: boolean;
}): React.ReactElement => {
    return (
        <div className="container-modal">
            <ReactModal
                isOpen={true}
                onRequestClose={closeModal}
                ariaHideApp={false}
                className={darkMode ? 'container-modal__block--dark' : 'container-modal__block'}
            >
                <div className="container-modal__block--close">
                    <img
                        src={RemoveImg}
                        alt="close"
                        onClick={closeModal}
                        className="container-modal__block--close-img"
                    />
                </div>
                <div className="container-modal__block--title">{modalTitle}</div>
                <div className="container-modal__block--btns">
                    <button
                        className="container-modal__block--btn container-modal__block--btn-dark"
                        onClick={handleRemove}
                    >
                        Yes
                    </button>
                    <button
                        onClick={closeModal}
                        className="container-modal__block--btn container-modal__block--btn-light"
                    >
                        No
                    </button>
                </div>
            </ReactModal>
        </div>
    );
};

export default RemoveModal;
