import React from 'react';
import './SearchInput.scss';
import SearchIcon from '../../assets/search.png';

const SearchInput = (): React.ReactElement => {
    return (
        <div className="container-search-input">
            <img src={SearchIcon} alt="#" className="search-icon" />
            <input type="search" placeholder="Search Notes" className="search-input" />
        </div>
    );
};

export default SearchInput;
