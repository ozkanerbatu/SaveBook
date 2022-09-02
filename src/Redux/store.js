import { configureStore } from "@reduxjs/toolkit";
import BooksSlice from "./Slice/Books";

export default configureStore({
  reducer: {
    books: BooksSlice,
  },
});
