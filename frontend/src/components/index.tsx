import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import BookForm from "./BookForm.tsx";
import BookList from "./BookList.tsx";
import SearchBar from "./SearchBar.tsx"; // Import the SearchBar
import { addBook, deleteBook, updateBook, getBooks } from "../api/bookAPI.ts";
import PaginationControls from "./PaginationControls.tsx";

const Books: React.FC = () => {
  const [filter, setFilter] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [editingBook, setEditingBook] = useState<any | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [books, setBooks] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalBooks: 0,
    perPage: 10,
  });

  // Fetch books from the API
  const fetchBooks = async (filter: string, page: number) => {
    const data = await getBooks(filter, page);
    setBooks(data.books);
    setPagination({
      currentPage: data.pagination.currentPage,
      totalPages: data.pagination.totalPages,
      totalBooks: data.pagination.totalBooks,
      perPage: data.pagination.perPage,
    });
  };

  useEffect(() => {
    fetchBooks(filter, page);
  }, [filter, page]);

  const handleSubmit = async (book: any) => {
    if (editingBook) {
      await updateBook(editingBook.id, book);
    } else {
      await addBook(book);
    }
    setShowForm(false);
    fetchBooks(filter, page);
  };

  const handleDelete = async (id: number) => {
    await deleteBook(id);
    fetchBooks(filter, page);
  };

  const handleEdit = (book: any) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setEditingBook(null);
    setShowForm(false);
  };


  return (
    <Box component="section" sx={{ padding: 5,}}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" gutterBottom>
            Book application
            </Typography>
            <Box  display="flex" justifyContent="end">
                <Button
                variant="contained"
                color="primary"
                onClick={() => setShowForm(true)}
                >
                Add New Book
                </Button>
            </Box>
        </Box>
        
        <Box mt={3}>
        {/* Search Bar */}
        <SearchBar setFilter={setFilter} />
        

        {/* Book List */}
        <BookList
            filter={filter}
            page={page}
            books={books}
            pagination={pagination}
            onEdit={handleEdit}
            onDelete={handleDelete}
            fetchBooks={fetchBooks}
        />

        {/* Book Form Modal */}
        {showForm && (
            <BookForm
            book={editingBook || undefined}
            open={showForm}
            onClose={handleCloseForm}
            onSubmit={handleSubmit}
            />
        )}

        {/* Button to show the form for adding a new book */}
        
        </Box>
    </Box>
  );
};

export default Books;
