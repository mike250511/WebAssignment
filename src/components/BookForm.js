// src/components/BookForm.js
import React, { useState } from 'react';

function BookForm({ addBook }) {
    const [newBook, setNewBook] = useState({ title: '', author: '', genre: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBook((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newBook.title && newBook.author && newBook.genre) {
            addBook(newBook);
            setNewBook({ title: '', author: '', genre: '' }); // Reset form
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                placeholder="Book Title"
                value={newBook.title}
                onChange={handleChange}
            />
            <input
                type="text"
                name="author"
                placeholder="Author"
                value={newBook.author}
                onChange={handleChange}
            />
            <input
                type="text"
                name="genre"
                placeholder="Genre"
                value={newBook.genre}
                onChange={handleChange}
            />
            <button type="submit">Add Book</button>
        </form>
    );
}

export default BookForm;
