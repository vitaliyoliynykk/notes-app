import React, { useState, useEffect } from 'react';
import './TextEditor.scss';
import TextLeft from '../../assets/textleft.png';
import TextCenter from '../../assets/textcenter.png';
import TextRight from '../../assets/textright.png';
import AddFile from '../../assets/addfile.svg';
import AddImg from '../../assets/img.png';
import AddList from '../../assets/list.png';
import { Note } from '../../models/models';

const TextEditor = ({ noteItem, onChange }: { noteItem: Note; onChange: (note: Note) => void }): React.ReactElement => {
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
        <div className="container-editor">
            <div className="container-editor__header">
                <select className="container-editor__select" onChange={handleFontSize}>
                    <option value="10">10px</option>
                    <option value="12">12px</option>
                    <option value="14">14px</option>
                    <option value="16">16px</option>
                    <option value="18">18px</option>
                    <option value="20">20px</option>
                    <option value="22">22px</option>
                    <option value="24">24px</option>
                    <option value="26">26px</option>
                    <option value="28">28px</option>
                    <option value="30">30px</option>
                </select>
                <div className="container-editor__img_block">
                    <img
                        src={TextLeft}
                        alt="icon"
                        className="container-editor__img"
                        onClick={(): void => handleAlignText('left')}
                    />
                    <img
                        src={TextCenter}
                        alt="icon"
                        className="container-editor__img"
                        onClick={(): void => handleAlignText('center')}
                    />
                    <img
                        src={TextRight}
                        alt="icon"
                        className="container-editor__img"
                        onClick={(): void => handleAlignText('right')}
                    />
                </div>
                <div className="container-editor__img_block">
                    <img src={AddFile} alt="icon" className="container-editor__img" />
                    <img
                        src={AddImg}
                        alt="icon"
                        className="container-editor__img"
                        onClick={(): void => setOnClickIcon(!onClickIcon)}
                    />
                    <img src={AddList} alt="icon" className="container-editor__img" />
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
                    className="container-editor__notes_title"
                    placeholder="Write the title..."
                    value={objNote.title}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => handleTextArea(event, 'title')}
                />
                <textarea
                    className="container-editor__notes_description"
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
