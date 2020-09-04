import React from 'react';
import './NoteItem.scss';
import RemoveImg from '../../assets/remove.png';
// import { uuid } from 'uuidv4';

const NoteItem = (): React.ReactElement => {
    const renderNotes = (): JSX.Element => {
        return (
            <div className="container-note__block">
                <div className="container-note__header">
                    <div className="container-note__header_date">21 August 2020, 6:20 PM</div>
                    <img src={RemoveImg} alt="#" className="container-note__header_img" />
                </div>
                <div className="container-note__bottom">
                    <div className="container-note__bottom_title">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat aut inventore voluptates
                        placeat, modi autem quia beatae laborum enim temporibus porro vel maiores sapiente facere rem,
                        et repudiandae hic aliquam.
                    </div>
                    <div className="container--note__bottom_description">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis numquam dolorem quos
                        aliquam aut totam, explicabo incidunt minus asperiores assumenda quisquam magnam nemo nam
                        commodi rem officiis cum at voluptatem.
                    </div>
                </div>
            </div>
        );
    };
    return <div className="container-note">{renderNotes()}</div>;
};

export default NoteItem;
