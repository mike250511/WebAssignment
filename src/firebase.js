// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDt3yMm5fJIK6iYLvkEjr5LuQOpaGaGLw8",
    authDomain: "booklog-2f147.firebaseapp.com",
    projectId: "booklog-2f147",
    storageBucket: "booklog-2f147.firebasestorage.app",
    messagingSenderId: "146206631513",
    appId: "1:146206631513:web:10769ec8bebdc1ca2f7348",
    measurementId: "G-BDYR402VXB"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore instance
export const db = getFirestore(app);

export const booksCollectionRef = collection(db, 'books');

export const addBookToFirebase = async (book) => {
    try {
        await addDoc(booksCollectionRef, book);
    } catch (e) {
        console.error('Error adding book: ', e);
    }
};

export const getBooksFromFirebase = async () => {
    try {
        const booksSnapshot = await getDocs(booksCollectionRef);
        const booksList = booksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return booksList;
    } catch (e) {
        console.error('Error getting books: ', e);
        return [];
    }
};

export const deleteBookFromFirebase = async (bookId) => {
    try {
        const bookDoc = doc(db, 'books', bookId);
        await deleteDoc(bookDoc);
    } catch (e) {
        console.error('Error deleting book: ', e);
    }
};

export const editBookInFirebase = async (bookId, updatedBook) => {
    try {
        const bookDoc = doc(db, 'books', bookId);
        await updateDoc(bookDoc, updatedBook);
    } catch (e) {
        console.error('Error updating book: ', e);
    }
};
