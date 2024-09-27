import { useState } from 'react';
import './SearchByUser.css';

function SearchByUser({ onSearch }) {
    const [username, setUsername] = useState('');


    const handleInputChange = (e) => {
        setUsername(e.target.value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(username);
    };


    return (
        <div className='Searchbar-section'>
            <form className="search-bar" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Sök efter användarnamn..."
                    className="search-input"
                    value={username}
                    onChange={handleInputChange}
                />
                <button type="submit" className="search-button">Sök</button>
            </form>
        </div>
    );
}

export default SearchByUser;