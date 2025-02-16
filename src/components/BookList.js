// src/components/BookList.js
import React from 'react';

function BookList({ books, deleteBook, editBook, filter }) {
    const filteredBooks = books.filter((book) => {
        return (
            (filter.author ? book.author.toLowerCase().includes(filter.author.toLowerCase()) : true) &&
            (filter.genre ? book.genre.toLowerCase().includes(filter.genre.toLowerCase()) : true)
        );
    });

    return (
        <div>
            <ul>
                {filteredBooks.map((book) => (
                    <li key={book.id}>
                        <div>
                            <strong>{book.title}</strong> by {book.author} ({book.genre})
                            <button onClick={() => deleteBook(book.id)}>Delete</button>
                            <button
                                onClick={() =>
                                    editBook(book.id, {
                                        ...book,
                                        title: prompt('Edit title', book.title) || book.title,
                                        author: prompt('Edit author', book.author) || book.author,
                                        genre: prompt('Edit genre', book.genre) || book.genre,
                                    })
                                }
                            >
                                Edit
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookList;
