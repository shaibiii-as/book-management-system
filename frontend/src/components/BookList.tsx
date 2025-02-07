import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Pagination,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { BorderBottom } from "@mui/icons-material";

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
}

interface BookListProps {
  filter: string;
  page: number;
  books: Book[];
  pagination: any;
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
  fetchBooks: (filter: string, page: number) => void;
}

const BookList: React.FC<BookListProps> = ({
  filter,
  page,
  books,
  pagination,
  onEdit,
  onDelete,
  fetchBooks,
}) => {
  return (
    <Box mt={3}>
      <Typography variant="h5" gutterBottom>
        Book List
      </Typography>

      <List>
        {books?.length > 0 ? (
          books.map((book) => (
            <ListItem
              sx={{ borderBottom: 1, padding: "10px 0px" }}
              key={book.id}
            >
              <ListItemText
                primary={book.title}
                secondary={`${book.author} - ${book.isbn}`}
              />
              <IconButton onClick={() => onEdit(book)} color="primary">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(book.id)} color="error">
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))
        ) : (
          <Box display="flex" justifyContent="center">
            No Record Found
          </Box>
        )}
      </List>

      {pagination.totalBooks > 10 && (
        <Box display="flex" justifyContent="end" mt={3}>
          <Pagination
            count={pagination.totalPages}
            page={pagination.currentPage}
            onChange={(event, value) => fetchBooks(filter, value)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default BookList;
