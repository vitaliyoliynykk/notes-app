import React from 'react';
import './RemoveModal.scss';
import ReactModal from 'react-modal';
import RemoveImg from '../../assets/remove.svg';

export const RemoveModal = ({
    closeModal,
    handleRemove,
    modalTitle,
    isDarkMode,
}: {
    closeModal: () => void;
    handleRemove: () => void;
    modalTitle: string;
    isDarkMode: boolean;
}): React.ReactElement => {
    return (
        <div className="container-modal">
            <ReactModal
                isOpen={true}
                onRequestClose={closeModal}
                ariaHideApp={false}
                className={
                    isDarkMode ? 'container-modal__block container-modal__block--dark' : 'container-modal__block'
                }
            >
                <div className="container-modal__block_img">
                    <img
                        src={RemoveImg}
                        alt="close icon"
                        onClick={closeModal}
                        className="container-modal__block_img--close"
                    />
                </div>
                <div className="container-modal__block_title">{modalTitle}</div>
                <div className="container-modal__block_btns">
                    <button
                        className="container-modal__block_btn container-modal__block_btn--dark"
                        onClick={handleRemove}
                    >
                        Yes
                    </button>
                    <button
                        onClick={closeModal}
                        className="container-modal__block_btn container-modal__block_btn--light"
                    >
                        No
                    </button>
                </div>
            </ReactModal>
        </div>
    );
};

export default RemoveModal;
