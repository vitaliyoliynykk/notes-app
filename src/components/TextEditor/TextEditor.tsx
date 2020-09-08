import React, { useState, useEffect } from 'react';
import './TextEditor.scss';
import TextLeft from '../../assets/textleft.png';
import TextCenter from '../../assets/textcenter.png';
import TextRight from '../../assets/textright.png';
import AddFile from '../../assets/addfile.png';
import AddImg from '../../assets/img.png';
import AddList from '../../assets/list.png';
import { v4 as uuidv4 } from 'uuid';
import { Note } from '../../models/models';

const defaultNote: Note = {
    title: 'This is your note',
    description: 'Write something',
    date: new Date().toDateString(),
    id: uuidv4(),
    fontSize: '10px',
    textAlign: 'left',
};

const TextEditor = ({
    noteItem,
    onChange,
}: {
    noteItem?: Note;
    onChange: (note: Note) => void;
}): React.ReactElement => {
    const [onClickIcon, setOnClickIcon] = useState(false);
    const [uploadedImg, setUploadedImg] = useState('');
    const [objNote, setObjNote] = useState<Note>(noteItem ? noteItem : defaultNote);

    const uploadedImage = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const files: FileList | null = event.currentTarget.files;
        if (files) Array.from(files).map((file: { name: string }) => setUploadedImg(URL.createObjectURL(file)));
    };

    const getFontSizeValue = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setObjNote({ ...objNote, fontSize: `${event.target.value}px` });
    };

    const handleAlignText = (textAlign: 'left' | 'center' | 'right'): void => {
        setObjNote({ ...objNote, textAlign });
    };

    useEffect(() => {
        onChange(objNote);
    }, [objNote, onChange]);

    return (
        <div className="container-editor">
            <div className="container-editor__header">
                <select className="container-editor__select" onChange={getFontSizeValue}>
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
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void =>
                        setObjNote({ ...objNote, title: event.target.value })
                    }
                />
                <textarea
                    className="container-editor__notes_description"
                    placeholder="Write the desciption..."
                    value={objNote.description}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void =>
                        setObjNote({ ...objNote, description: event.target.value })
                    }
                    style={{ fontSize: objNote.fontSize, textAlign: objNote.textAlign } as React.CSSProperties}
                />
                {uploadedImg ? <img src={uploadedImg} alt="#" className="container-editor__img_uploaded" /> : null}
            </div>
        </div>
    );
};

export default TextEditor;
