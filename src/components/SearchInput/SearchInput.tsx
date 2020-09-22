import React from 'react';
import './SearchInput.scss';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import { SearchInputValue } from '../../models/models';
import classNames from 'classnames';

const SearchInput = ({ getSearchInputValue, isDarkMode }: SearchInputValue): React.ReactElement => {
    const handleGetSearchInputValue = (event: React.FormEvent<HTMLInputElement>): void => {
        getSearchInputValue(event.currentTarget.value);
    };

    return (
        <div className="container-search">
            <SearchIcon className="container-search__img" style={isDarkMode ? { fill: 'white' } : { fill: 'black' }} />
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
