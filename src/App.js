// src/App.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import React, { useState, useEffect } from 'react';
import './App.css';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import Filter from './components/Filter';
import { addBookToFirebase, getBooksFromFirebase, deleteBookFromFirebase, editBookInFirebase } from './firebase';
import AiChatBot from './components/aiChatBot';

function App() {
    const [books, setBooks] = useState([]);
    const [filter, setFilter] = useState({ author: '', genre: '' });

    // Load books from Firebase when the app starts
    useEffect(() => {
        const fetchBooks = async () => {
            const fetchedBooks = await getBooksFromFirebase();
            setBooks(fetchedBooks);
        };
        fetchBooks();
    }, []);

    // Add a book
    const addBook = async (book) => {
        await addBookToFirebase(book);
        const updatedBooks = await getBooksFromFirebase();  // Fetch the updated list after adding the book
        setBooks(updatedBooks);
    };

    // Delete a book
    const deleteBook = async (bookId) => {
        await deleteBookFromFirebase(bookId);
        const updatedBooks = await getBooksFromFirebase();  // Fetch the updated list after deleting the book
        setBooks(updatedBooks);
    };

    // Edit a book
    const editBook = async (bookId, updatedBook) => {
        await editBookInFirebase(bookId, updatedBook);
        const updatedBooks = await getBooksFromFirebase();  // Fetch the updated list after editing the book
        setBooks(updatedBooks);
    };

    // Apply filter
    const applyFilter = (filteredBooks) => {
        setBooks(filteredBooks);
    };

    return (
        <div className="container">
            <header>
                <h1>Book Log</h1>
            </header>
            <main>
                <Filter books={books} setFilter={setFilter} filter={filter} applyFilter={applyFilter} />
                <BookForm addBook={addBook} />
                <BookList books={books} deleteBook={deleteBook} editBook={editBook} filter={filter} />
                <AiChatBot addBook={addBook} />
            </main>
        </div>
    );
}

export default App;


