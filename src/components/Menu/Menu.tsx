import classNames from 'classnames';
import React from 'react';
import './Menu.scss';
import { MenuProps } from '../../models/models';
import { ReactComponent as AddNote } from '../../assets/addnote.svg';
import { ReactComponent as LogOut } from '../../assets/logout.svg';
import { ReactComponent as DarkMode } from '../../assets/moon.svg';
import { ReactComponent as LightMode } from '../../assets/sunlight.svg';

export const Menu = ({ onMenuItemClick, isDarkMode, user }: MenuProps): React.ReactElement => {
    return (
        <div
            className={classNames('notes__menu', {
                'notes__menu--dark': isDarkMode,
            })}
        >
            {user && <img src={user.photoURL as string} alt="user" className="user-photo" />}
            <AddNote
                style={isDarkMode ? { fill: 'black' } : { fill: 'white' }}
                className="notes__img"
                onClick={(): void => onMenuItemClick('addNote')}
            />
            {isDarkMode ? (
                <LightMode
                    style={isDarkMode ? { fill: 'black' } : { fill: 'white' }}
                    className="notes__img"
                    onClick={(): void => onMenuItemClick('switchMode')}
                />
            ) : (
                <DarkMode
                    style={isDarkMode ? { fill: 'black' } : { fill: 'white' }}
                    className="notes__img"
                    onClick={(): void => onMenuItemClick('switchMode')}
                />
            )}
            <LogOut
                style={isDarkMode ? { fill: 'black' } : { fill: 'white' }}
                className="notes__img"
                onClick={(): void => onMenuItemClick('logOut')}
            />
        </div>
    );
};

export default Menu;
