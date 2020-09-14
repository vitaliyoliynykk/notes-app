import React, { useState, useEffect } from 'react';
import './TextEditor.scss';
import TextLeft from '../../assets/textleft.svg';
import TextCenter from '../../assets/textcenter.svg';
import TextRight from '../../assets/textright.svg';
import AddImg from '../../assets/img.svg';
import AddList from '../../assets/list.svg';
import { Note } from '../../models/models';

const TextEditor = ({
    noteItem,
    onChange,
    darkMode,
}: {
    noteItem: Note;
    onChange: (note: Note) => void;
    darkMode: boolean;
}): React.ReactElement => {
    const [onClickIcon, setOnClickIcon] = useState(false);
    const [uploadedImg, setUploadedImg] = useState('');
    const [objNote, setObjNote] = useState<Note>(noteItem);

    useEffect(() => {
        if (noteItem) {
            setObjNote(noteItem);
        }
    }, [noteItem]);

    const uploadedImage = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const files: FileList | null = event.currentTarget.files;
        if (files) Array.from(files).map((file: { name: string }) => setUploadedImg(URL.createObjectURL(file)));
    };

    const handleFontSize = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const note = { ...objNote, fontSize: `${event.target.value}px` };
        onChange(note);
        setObjNote(note);
    };

    const handleAlignText = (textAlign: 'left' | 'center' | 'right'): void => {
        const note = { ...objNote, textAlign };
        onChange(note);
        setObjNote(note);
    };

    const handleTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>, field: string): void => {
        const note = { ...objNote, [field]: event.target.value };
        onChange(note);
        setObjNote(note);
    };

    return (
        <div className={darkMode ? 'container-editor--dark' : 'container-editor'}>
            <div className="container-editor__header">
                <select
                    className={darkMode ? 'container-editor--dark__select' : 'container-editor__select'}
                    onChange={handleFontSize}
                >
                    <option value="10">10px</option>
                    <option value="14">14px</option>
                    <option value="18">18px</option>
                    <option value="22">22px</option>
                    <option value="26">26px</option>
                    <option value="30">30px</option>
                    <option value="34">34px</option>
                    <option value="38">38px</option>
                    <option value="42">42px</option>
                </select>
                <div className="container-editor__img_block">
                    <img
                        src={TextLeft}
                        alt="icon"
                        className={darkMode ? 'container-editor--dark__img' : 'container-editor__img'}
                        onClick={(): void => handleAlignText('left')}
                    />
                    <img
                        src={TextCenter}
                        alt="icon"
                        className={darkMode ? 'container-editor--dark__img' : 'container-editor__img'}
                        onClick={(): void => handleAlignText('center')}
                    />
                    <img
                        src={TextRight}
                        alt="icon"
                        className={darkMode ? 'container-editor--dark__img' : 'container-editor__img'}
                        onClick={(): void => handleAlignText('right')}
                    />
                </div>
                <div className="container-editor__img_block">
                    <img
                        src={AddImg}
                        alt="icon"
                        className={darkMode ? 'container-editor--dark__img' : 'container-editor__img'}
                        onClick={(): void => setOnClickIcon(!onClickIcon)}
                    />
                    <img
                        src={AddList}
                        alt="icon"
                        className={darkMode ? 'container-editor--dark__img' : 'container-editor__img'}
                    />
                </div>
            </div>
            {onClickIcon ? (
                <input
                    type="file"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>): void => uploadedImage(event)}
                />
            ) : null}
            <div className="container-editor__notes">
                <textarea
                    className={darkMode ? 'container-editor--dark__notes_title' : 'container-editor__notes_title'}
                    placeholder="Write the title..."
                    value={objNote.title}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => handleTextArea(event, 'title')}
                />
                <textarea
                    className={
                        darkMode ? 'container-editor--dark__notes_description' : 'container-editor__notes_description'
                    }
                    placeholder="Write the desciption..."
                    value={objNote.description}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void =>
                        handleTextArea(event, 'description')
                    }
                    style={{ fontSize: objNote.fontSize, textAlign: objNote.textAlign } as React.CSSProperties}
                />
                {uploadedImg ? <img src={uploadedImg} alt="#" className="container-editor__img_uploaded" /> : null}
            </div>
        </div>
    );
};

export default TextEditor;
