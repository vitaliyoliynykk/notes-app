import React from 'react';
import './SearchInput.scss';
import SearchIcon from '../../assets/search.svg';
import { SearchInputValue } from '../../models/models';

const SearchInput = ({ getSearchInputValue, isDarkMode }: SearchInputValue): React.ReactElement => {
    const handleGetSearchInputValue = (event: React.FormEvent<HTMLInputElement>): void => {
        getSearchInputValue(event.currentTarget.value);
    };

    return (
        <div className={isDarkMode ? 'container-search container-search--dark' : 'container-search'}>
            <img
                src={SearchIcon}
                alt="search icon"
                className={isDarkMode ? 'container-search__img container-search__img--dark' : 'container-search__img'}
            />
            <input
                type="search"
                placeholder="Search Notes"
                className={
                    isDarkMode ? 'container-search__input container-search__input--dark' : 'container-search__input'
                }
                onChange={handleGetSearchInputValue}
            />
        </div>
    );
};

export default SearchInput;
