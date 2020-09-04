import React, { useState, CSSProperties, useEffect } from 'react';
import './TextEditor.scss';
import TextLeft from '../../assets/textleft.png';
import TextCenter from '../../assets/textcenter.png';
import TextRight from '../../assets/textright.png';
import AddFile from '../../assets/addfile.png';
import AddImg from '../../assets/img.png';
import AddList from '../../assets/list.png';

const TextEditor = (): React.ReactElement => {
    const [descriptionValue, setDescriptionValue] = useState('');
    const [titleValue, setTitleValue] = useState('');
    const [fontSize, setFontSize] = useState('');
    const [onClickIcon, setOnClickIcon] = useState(false);
    const [uploadedImg, setUploadedImg] = useState('');
    const [styles, setStyles] = useState<CSSProperties>({
        fontSize: '20px',
        textAlign: 'left',
    });
    const [objNote, setObjNote] = useState({});

    const uploadedImage = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const files: FileList | null = event.currentTarget.files;
        if (files) Array.from(files).map((file: { name: string }) => setUploadedImg(URL.createObjectURL(file)));
    };

    const getFontSizeValue = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setFontSize(event.target.value);
        setStyles({ ...styles, fontSize: `${event.target.value}px` });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleAlignText = (textAlign: any): void => {
        setStyles({ ...styles, textAlign: textAlign });
    };

    useEffect(() => {
        setObjNote({
            title: titleValue,
            description: descriptionValue,
            fontSize: `${fontSize}px`,
            textAlign: '?',
        });
        console.log(objNote);
    }, [titleValue, descriptionValue, fontSize]);

    return (
        <div className="container-editor">
            <div className="container-editor__header">
                <select className="container-editor__select" value={fontSize} onChange={getFontSizeValue}>
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
                    value={titleValue}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void =>
                        setTitleValue(event.target.value)
                    }
                />
                <textarea
                    className="container-editor__notes_description"
                    placeholder="Write the desciption..."
                    value={descriptionValue}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void =>
                        setDescriptionValue(event.target.value)
                    }
                    style={styles}
                />
                {uploadedImg ? <img src={uploadedImg} alt="#" className="container-editor__img_uploaded" /> : null}
            </div>
        </div>
    );
};

export default TextEditor;
