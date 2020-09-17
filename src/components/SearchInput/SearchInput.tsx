import React from 'react';
import './SearchInput.scss';
import SearchIcon from '../../assets/search.png';
import { SearchInputValue } from '../../models/models';

const SearchInput = ({ getSearchInputValue }: SearchInputValue): React.ReactElement => {
    const handleGetSearchInputValue = (event: React.FormEvent<HTMLInputElement>): void => {
        getSearchInputValue(event.currentTarget.value);
    };

    return (
        <div className="container-search">
            <img src={SearchIcon} alt="search icon" className="container-search__img" />
            <input
                type="search"
                placeholder="Search Notes"
                className="container-search__input"
                onChange={handleGetSearchInputValue}
            />
        </div>
    );
};

export default SearchInput;
