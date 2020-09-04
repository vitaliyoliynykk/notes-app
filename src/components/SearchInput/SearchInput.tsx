import React, { useState } from 'react';
import './SearchInput.scss';
import SearchIcon from '../../assets/search.png';

const SearchInput = (): React.ReactElement => {
    const [searchInputValue, setSearchInputValue] = useState('');
    const getSearchInputValue = (event: React.FormEvent<HTMLInputElement>): void => {
        setSearchInputValue(event.currentTarget.value);
        console.log(searchInputValue);
    };

    return (
        <div className="container-search">
            <img src={SearchIcon} alt="#" className="container-search__img" />
            <input
                type="search"
                placeholder="Search Notes"
                className="container-search__input"
                onChange={getSearchInputValue}
            />
        </div>
    );
};

export default SearchInput;
