import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Book } from "../entities/Book";

export const addBook = async (req: Request, res: Response): Promise<void> => {
  const { title, author, isbn } = req.body;

  if (!title || !author || !isbn) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    const bookRepository = AppDataSource.getRepository(Book);
    const newBook = new Book();
    newBook.title = title;
    newBook.author = author;
    newBook.isbn = isbn;

    await bookRepository.save(newBook);
    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ error: "Error adding book" });
  }
};

export const getBooks = async (req: Request, res: Response): Promise<void> => {
  const { page = 1, limit = 10, filter } = req.query;

  try {
    const bookRepository = AppDataSource.getRepository(Book);
    const query = bookRepository.createQueryBuilder("book");

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    if (filter) {
      query.where("book.title LIKE :filter", {
        filter: `%${filter}%`,
      }).orWhere("book.author LIKE :filter", {
        filter: `%${filter}%`,
      }).orWhere("book.isbn LIKE :filter", {
        filter: `%${filter}%`,
      });
    }

    query.take(limitNumber).skip((pageNumber - 1) * limitNumber);

    const [books, totalBooks] = await query.getManyAndCount();

    const totalPages = Math.ceil(totalBooks / limitNumber);

    res.status(200).json({
      books,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        totalBooks,
        perPage: limitNumber,
      },
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Error fetching books" });
  }
};

export const editBook = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, author, isbn } = req.body;

  if (!title || !author || !isbn) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    const bookRepository = AppDataSource.getRepository(Book);
    const book = await bookRepository.findOneBy({ id: Number(id) });

    if (!book) {
      res.status(404).json({ error: "Book not found" });
      return;
    }

    book.title = title;
    book.author = author;
    book.isbn = isbn;

    await bookRepository.save(book);
    res.status(200).json(book);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ error: "Error updating book" });
  }
};

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const bookRepository = AppDataSource.getRepository(Book);
    const book = await bookRepository.findOneBy({ id: Number(id) });

    if (!book) {
      res.status(404).json({ error: "Book not found" });
      return;
    }

    await bookRepository.remove(book);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Error deleting book" });
  }
};
