import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface Book {
  id?: number;
  title: string;
  author: string;
  isbn: string;
}

interface BookFormProps {
  book?: Book;
  open: boolean;
  onClose: () => void;
  onSubmit: (book: Book) => void;
}

const BookForm: React.FC<BookFormProps> = ({
  book,
  open,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Book>({
    title: "",
    author: "",
    isbn: "",
  });

  useEffect(() => {
    if (book) {
      setFormData(book);
    } else {
      setFormData({ title: "", author: "", isbn: "" });
    }
  }, [book]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{book ? "Edit Book" : "Add New Book"}</DialogTitle>
      <DialogContent>
        <Box>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Author"
              variant="outlined"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="ISBN"
              variant="outlined"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              required
              margin="normal"
            />
            <DialogActions>
              <Button onClick={onClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {book ? "Update Book" : "Add Book"}
              </Button>
            </DialogActions>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BookForm;
