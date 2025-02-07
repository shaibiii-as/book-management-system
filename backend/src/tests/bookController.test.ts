import { Request, Response } from "express";
import { addBook, getBooks, editBook, deleteBook } from "../controller/bookController";
import { AppDataSource } from "../data-source";
import { Book } from "../entities/Book";

// Mock the AppDataSource.getRepository method
jest.mock("../data-source", () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

describe("Book Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let bookRepositoryMock: any;

  beforeEach(() => {
    // Create mock objects
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    bookRepositoryMock = {
      save: jest.fn(),
      findOneBy: jest.fn(),
      remove: jest.fn(),
      createQueryBuilder: jest.fn(),
    };

    jest.spyOn(AppDataSource, 'getRepository').mockReturnValue(bookRepositoryMock);
  });

  describe("addBook", () => {
    it("should return 400 if required fields are missing", async () => {
      req.body = {}; // No title, author, or isbn

      await addBook(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "All fields are required" });
    });

    it("should successfully add a book", async () => {
      req.body = { title: "Book Title", author: "Book Author", isbn: "1234567890" };
      bookRepositoryMock.save.mockResolvedValue(req.body);

      await addBook(req as Request, res as Response);

      expect(bookRepositoryMock.save).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(req.body);
    });

    it("should handle error while adding a book", async () => {
      req.body = { title: "Book Title", author: "Book Author", isbn: "1234567890" };
      bookRepositoryMock.save.mockRejectedValue(new Error("Database error"));

      await addBook(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Error adding book" });
    });
  });

  describe("getBooks", () => {
    it("should return paginated books with filter", async () => {
      req.query = { page: "1", limit: "10", filter: "Book" };
      bookRepositoryMock.createQueryBuilder.mockReturnValue({
        where: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
      });

      await getBooks(req as Request, res as Response);

      expect(bookRepositoryMock.createQueryBuilder).toHaveBeenCalledWith("book");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        books: [],
        pagination: {
          currentPage: 1,
          totalPages: 0,
          totalBooks: 0,
          perPage: 10,
        },
      });
    });

    it("should return books without filter", async () => {
      req.query = { page: "1", limit: "10" };
      bookRepositoryMock.createQueryBuilder.mockReturnValue({
        take: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
      });

      await getBooks(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        books: [],
        pagination: {
          currentPage: 1,
          totalPages: 0,
          totalBooks: 0,
          perPage: 10,
        },
      });
    });

    it("should handle error while fetching books", async () => {
      req.query = { page: "1", limit: "10" };
      bookRepositoryMock.createQueryBuilder.mockReturnValue({
        take: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockRejectedValue(new Error("Database error")),
      });

      await getBooks(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Error fetching books" });
    });
  });

  describe("editBook", () => {
    it("should return 400 if required fields are missing", async () => {
      req.params = { id: "1" };
      req.body = {}; // No title, author, or isbn

      await editBook(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "All fields are required" });
    });

    it("should successfully update a book", async () => {
      req.params = { id: "1" };
      req.body = { title: "Updated Title", author: "Updated Author", isbn: "0987654321" };
      const existingBook = new Book();
      existingBook.id = 1;
      existingBook.title = "Old Title";
      bookRepositoryMock.findOneBy.mockResolvedValue(existingBook);
      bookRepositoryMock.save.mockResolvedValue({ ...existingBook, ...req.body });

      await editBook(req as Request, res as Response);

      expect(bookRepositoryMock.save).toHaveBeenCalledWith({ ...existingBook, ...req.body });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ ...existingBook, ...req.body });
    });

    it("should return 404 if book is not found", async () => {
      req.params = { id: "1" };
      req.body = { title: "Updated Title", author: "Updated Author", isbn: "0987654321" };
      bookRepositoryMock.findOneBy.mockResolvedValue(null);

      await editBook(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Book not found" });
    });

    it("should handle error while updating a book", async () => {
      req.params = { id: "1" };
      req.body = { title: "Updated Title", author: "Updated Author", isbn: "0987654321" };
      bookRepositoryMock.findOneBy.mockResolvedValue(new Book());
      bookRepositoryMock.save.mockRejectedValue(new Error("Database error"));

      await editBook(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Error updating book" });
    });
  });

  describe("deleteBook", () => {
    it("should return 404 if book is not found", async () => {
      req.params = { id: "1" };
      bookRepositoryMock.findOneBy.mockResolvedValue(null);

      await deleteBook(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Book not found" });
    });

    it("should successfully delete a book", async () => {
      req.params = { id: "1" };
      const existingBook = new Book();
      existingBook.id = 1;
      bookRepositoryMock.findOneBy.mockResolvedValue(existingBook);
      bookRepositoryMock.remove.mockResolvedValue(undefined);

      await deleteBook(req as Request, res as Response);

      expect(bookRepositoryMock.remove).toHaveBeenCalledWith(existingBook);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Book deleted successfully" });
    });

    it("should handle error while deleting a book", async () => {
      req.params = { id: "1" };
      const existingBook = new Book();
      existingBook.id = 1;
      bookRepositoryMock.findOneBy.mockResolvedValue(existingBook);
      bookRepositoryMock.remove.mockRejectedValue(new Error("Database error"));

      await deleteBook(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Error deleting book" });
    });
  });
});
