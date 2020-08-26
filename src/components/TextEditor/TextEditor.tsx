import React, { useState, CSSProperties } from 'react';
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
    const [selectedValue, setSelectedValue] = useState('');
    const [onClickIcon, setOnClickIcon] = useState(false);
    const [uploadedImg, setUploadedImg] = useState('');
    const [styles, setStyles] = useState<CSSProperties>({});

    console.log(styles);

    const uploadedImage = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const files: FileList | null = event.currentTarget.files;
        if (files) Array.from(files).map((file: { name: string }) => setUploadedImg(URL.createObjectURL(file)));
    };

    // const uploadedFile = (event: React.ChangeEvent<HTMLInputElement>): void => {
    //     const files: FileList | null = event.currentTarget.files;
    //     if (files) Array.from(files).map((file: { name: string }) => setUploadedImg(URL.createObjectURL(file)));
    // };

    const test = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setSelectedValue(event.target.value);
        setStyles({ ...styles, fontSize: `${selectedValue}px` });
        console.log(selectedValue);
    };

    const handleAlignTextLeft = (): void => {
        setStyles({ ...styles, textAlign: 'left' });
    };

    const handleAlignTextCenter = (): void => {
        setStyles({ ...styles, textAlign: 'center' });
    };

    const handleAlignTextRight = (): void => {
        setStyles({ ...styles, textAlign: 'right' });
    };

    return (
        <div className="container">
            <div className="header">
                <select className="select-option" value={selectedValue} onChange={test}>
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
                <div className="icons-block">
                    <img src={TextLeft} alt="icon" className="icon" onClick={handleAlignTextLeft} />
                    <img src={TextCenter} alt="icon" className="icon" onClick={handleAlignTextCenter} />
                    <img src={TextRight} alt="icon" className="icon" onClick={handleAlignTextRight} />
                </div>
                <div className="icons-block">
                    <img src={AddFile} alt="icon" className="icon" />
                    <img src={AddImg} alt="icon" className="icon" onClick={(): void => setOnClickIcon(!onClickIcon)} />
                    <img src={AddList} alt="icon" className="icon" />
                </div>
            </div>
            {onClickIcon ? (
                <input
                    type="file"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>): void => uploadedImage(event)}
                />
            ) : null}
            {/* {onClickIcon ? (
                <input
                    type="file"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>): void => uploadedFile(event)}
                />
            ) : null} */}
            <div className="notes-info">
                <textarea
                    className="title"
                    cols={20}
                    placeholder="Write the title..."
                    value={titleValue}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void =>
                        setTitleValue(event.target.value)
                    }
                />
                <textarea
                    className="description"
                    cols={20}
                    placeholder="Write the desciption..."
                    value={descriptionValue}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void =>
                        setDescriptionValue(event.target.value)
                    }
                    style={styles}
                />
                {uploadedImg ? <img src={uploadedImg} alt="#" className="uploaded-img" /> : null}
                {/* {uploadedFile ? <div src={uploadedImg} alt="#" className="uploaded-img" /> : null} */}
            </div>
        </div>
    );
};

export default TextEditor;
