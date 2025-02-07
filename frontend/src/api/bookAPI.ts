import axios from "axios";
import { toast } from "react-toastify";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api/books";

export const getBooks = async (
  filter: string = "",
  page: number = 1
): Promise<any> => {
  try {
    const response = await axios.get(API_URL, {
      params: { filter, page },
    });
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch books!");
    throw error;
  }
};

// Add a new book
export const addBook = async (book: {
  title: string;
  author: string;
  isbn: string;
}): Promise<any> => {
  try {
    const response = await axios.post(API_URL, book);
    toast.success("Book added successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to add book!");
    throw error;
  }
};

// Update an existing book
export const updateBook = async (
  id: number,
  book: { title: string; author: string; isbn: string }
): Promise<any> => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, book);
    toast.success("Book updated successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to update book!");
    throw error;
  }
};

export const deleteBook = async (id: number): Promise<any> => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    toast.success("Book deleted successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to delete book!");
    throw error;
  }
};
