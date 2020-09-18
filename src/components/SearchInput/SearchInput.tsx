import React from 'react';
import './SearchInput.scss';
import SearchIcon from '../../assets/search.svg';
import { SearchInputValue } from '../../models/models';
import classNames from 'classnames';

const SearchInput = ({ getSearchInputValue, isDarkMode }: SearchInputValue): React.ReactElement => {
    const handleGetSearchInputValue = (event: React.FormEvent<HTMLInputElement>): void => {
        getSearchInputValue(event.currentTarget.value);
    };

    return (
        <div className={classNames('container-search', { 'container-search--dark': isDarkMode })}>
            <img
                src={SearchIcon}
                alt="search icon"
                className={classNames('container-search__img', { 'container-search__img--dark': isDarkMode })}
            />
            <input
                type="search"
                placeholder="Search Notes"
                className={classNames('container-search__input', { 'container-search__input--dark': isDarkMode })}
                onChange={handleGetSearchInputValue}
            />
        </div>
    );
};

export default SearchInput;
