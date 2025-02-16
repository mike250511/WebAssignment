// src/components/Filter.js
import React from 'react';

function Filter({ books, setFilter, filter, applyFilter }) {
    // Handle changes in the filter inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilter((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Apply the filter based on author and genre
    const handleApplyFilter = () => {
        const filteredBooks = books.filter((book) => {
            const authorMatch = book.author.toLowerCase().includes(filter.author.toLowerCase());
            const genreMatch = book.genre.toLowerCase().includes(filter.genre.toLowerCase());
            return authorMatch && genreMatch;
        });
        applyFilter(filteredBooks);
    };

    return (
        <div className="filter-container">
            <div>
                <label htmlFor="author">Author: </label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    placeholder="Filter by author"
                    value={filter.author}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="genre">Genre: </label>
                <input
                    type="text"
                    id="genre"
                    name="genre"
                    placeholder="Filter by genre"
                    value={filter.genre}
                    onChange={handleChange}
                />
            </div>
            <button onClick={handleApplyFilter}>Apply Filter</button>
        </div>
    );
}

export default Filter;
