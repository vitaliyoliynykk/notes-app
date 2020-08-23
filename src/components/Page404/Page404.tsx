import React from 'react';
import SadSmile from '../../assets/sad.png';
import './Page404.scss';

export default function Page404(): React.ReactElement {
    return (
        <div className="container">
            <img src={SadSmile} alt="smile" className="sad-smile" />
            <h1>404</h1>
            <h2>page not found</h2>
        </div>
    );
}
