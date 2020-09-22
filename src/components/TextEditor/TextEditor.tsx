import React, { useState, useEffect } from 'react';
import './TextEditor.scss';
import TextLeft from '../../assets/textleft.svg';
import TextCenter from '../../assets/textcenter.svg';
import TextRight from '../../assets/textright.svg';
// import AddImg from '../../assets/img.svg';
import { Note } from '../../models/models';
import classNames from 'classnames';

const TextEditor = ({
    noteItem,
    onChange,
    isDarkMode,
}: {
    noteItem: Note;
    onChange: (note: Note) => void;
    isDarkMode: boolean;
}): React.ReactElement => {
//     const [onClickIcon, setOnClickIcon] = useState(false);
    // const [uploadedImg, setUploadedImg] = useState('');
    const [objNote, setObjNote] = useState<Note>(noteItem);

    useEffect(() => {
        if (noteItem) {
            setObjNote(noteItem);
        }
    }, [noteItem]);

    // const uploadedImage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    //     const files: FileList | null = event.currentTarget.files;
    //     if (files) Array.from(files).map((file: { name: string }) => setUploadedImg(URL.createObjectURL(file)));
    // };

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
        <div
            className={classNames('container-editor', {
                'container-editor--dark': isDarkMode,
            })}
        >
            <div className="container-editor__header">
                <select
                    className={classNames('container-editor__select', {
                        'container-editor__select--dark': isDarkMode,
                    })}
                    onChange={handleFontSize}
                    defaultValue="22"
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
                        alt="text left icon"
                        className={classNames('container-editor__img', {
                            'container-editor__img--dark': isDarkMode,
                        })}
                        onClick={(): void => handleAlignText('left')}
                    />
                    <img
                        src={TextCenter}
                        alt="text center icon"
                        className={classNames('container-editor__img', {
                            'container-editor__img--dark': isDarkMode,
                        })}
                        onClick={(): void => handleAlignText('center')}
                    />
                    <img
                        src={TextRight}
                        alt="text right icon"
                        className={classNames('container-editor__img', {
                            'container-editor__img--dark': isDarkMode,
                        })}
                        onClick={(): void => handleAlignText('right')}
                    />
                </div>
<!--                 <div className="container-editor__img_block">
                    <img
                        src={AddImg}
                        alt="add img icon"
                        className={classNames('container-editor__img', {
                            'container-editor__img--dark': isDarkMode,
                        })}
                        onClick={(): void => setOnClickIcon(!onClickIcon)}
                    /> -->
            {/* {onClickIcon ? (
                <input
                    type="file"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>): void => uploadedImage(event)}
                />
            ) : null} */}
            <div className="container-editor__notes">
                <textarea
                    className={classNames('container-editor__notes_title', {
                        'container-editor__notes_title--dark': isDarkMode,
                    })}
                    placeholder="Write the title..."
                    value={objNote.title}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => handleTextArea(event, 'title')}
                />
                <textarea
                    className={classNames('container-editor__notes_description', {
                        'container-editor__notes_description--dark': isDarkMode,
                    })}
                    placeholder="Write the desciption..."
                    value={objNote.description}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void =>
                        handleTextArea(event, 'description')
                    }
                    style={{ fontSize: objNote.fontSize, textAlign: objNote.textAlign } as React.CSSProperties}
                />
                {/* {uploadedImg ? (
                    <img src={uploadedImg} alt="uploaded img" className="container-editor__img_uploaded" />
                ) : null} */}
            </div>
        </div>
    );
};

export default TextEditor;
