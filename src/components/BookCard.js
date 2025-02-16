import React from 'react';

function BookCard({ book, index, deleteBook, editBook }) {
    return (
        <div className="book-card">
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Rating:</strong> {book.rating}</p>
            <p><strong>Review:</strong> {book.review}</p>
            <button onClick={() => deleteBook(index)}>Delete</button>
            <button onClick={() => editBook(index, book)}>Edit</button>
        </div>
    );
}

export default BookCard;
