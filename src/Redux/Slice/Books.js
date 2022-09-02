import { createSlice } from "@reduxjs/toolkit";

export const BooksSlice = createSlice({
    name: "Books",
    initialState: {
        books: [
            {
                id: 1,
                name: "The Alchemist",
                startedDate: "2021-08-01",
                finishedDate: "2022-08-05",
                category: "Tarih",
                categoryId: 3,
                desc: "The Alchemist is a novel by Paulo Coelho that was first published in 1988.",
            },
        ],
    },
    reducers: {
        addBook: (state, action) => {
            state.books = state.books.concat(action.payload);
        },
        deleteBook: (state, action) => {
            state.books = state.books.filter((book) => book.id !== action.payload)
        },
        updateBook: (state, action) => {
            const index = state.books.findIndex((book) => book.id === action.payload.id)
            state.books[index] = action.payload
        }
    },
});

export const { addBook, deleteBook, updateBook } = BooksSlice.actions;
export default BooksSlice.reducer;
