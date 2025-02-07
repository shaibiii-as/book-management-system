# Book Management Application (Backend)

This project is the backend for the Book Management Application. It is built using **Node.js**, **Express**, and **TypeScript**. The backend exposes a REST API for managing books and interacts with a **SQLite** database.

## General Guidelines

The backend allows the following operations:

- **Add a book**: Users can add a new book with details like title, author, and ISBN.
- **List all books**: Users can fetch all books stored in the database.
- **Filter books**: Users can filter books by title, author, or ISBN.
- **Edit a book**: Users can update an existing book’s details.
- **Delete a book**: Users can delete a book from the database.

### Technologies Used:
- **Node.js** (Server-side JavaScript runtime)
- **Express** (Web framework)
- **TypeScript** (For static typing and development)
- **SQLite** (Database to store books)

## Endpoints

### 1. **Add a Book**
- **URL**: `/api/books`
- **Method**: `POST`
- **Request Body**: 
  The request body should contain the following fields:
  - `title` (string): The title of the book.
  - `author` (string): The author of the book.
  - `isbn` (string): The ISBN of the book.

- **Response**:
  - **Status Code**: 201 Created
  - **Response Body**: The response will return the details of the newly created book, including the `id`, `title`, `author`, and `isbn`.

- **Description**: 
  This endpoint is used to add a new book to the database. Upon successful creation, the server will return the full details of the newly created book, including a unique `id` assigned to it.

- **Error Responses**:
  - **400 Bad Request**: This error occurs if any of the required fields (`title`, `author`, `isbn`) are missing from the request body. The response will contain an error message indicating which fields are required.
  - **500 Internal Server Error**: If there's an issue with the server (e.g., database connectivity or saving the book), a generic error message will be returned.

---

### 2. **Fetch All Books**
- **URL**: `/api/books`
- **Method**: `GET`
- **Query Parameters** (optional):
  - `page` (integer): The page number for pagination. Default is `1`.
  - `limit` (integer): The number of books per page. Default is `10`.
  - `filter` (string): A string used to filter books by title, author, or ISBN.

- **Response**:
  - **Status Code**: 200 OK
  - **Response Body**: The response will return a list of books that match the filter criteria and pagination details. The response also includes metadata about pagination (current page, total pages, total books).

- **Description**:
  This endpoint retrieves a list of all books stored in the database. The results can be filtered by title, author, or ISBN, and pagination is supported to limit the number of books returned per page.

- **Error Responses**:
  - **500 Internal Server Error**: If there's an issue with the server (e.g., database connectivity or query failure), a generic error message will be returned.

---

### 3. **Edit a Book**
- **URL**: `/api/books/:id`
- **Method**: `PUT`
- **Request Body**: 
  The request body should contain the following fields:
  - `title` (string): The new title of the book.
  - `author` (string): The new author of the book.
  - `isbn` (string): The new ISBN of the book.

- **Response**:
  - **Status Code**: 200 OK
  - **Response Body**: The response will return the updated details of the book, including the `id`, `title`, `author`, and `isbn`.

- **Description**:
  This endpoint allows the user to update the details of an existing book by providing the `id` of the book. All fields (`title`, `author`, and `isbn`) must be provided in the request body for the update to be successful.

- **Error Responses**:
  - **400 Bad Request**: This error occurs if any of the required fields (`title`, `author`, `isbn`) are missing from the request body.
  - **404 Not Found**: If the book with the specified `id` does not exist, an error message will be returned indicating that the book was not found.
  - **500 Internal Server Error**: If there's an issue with the server (e.g., database connectivity or saving the updated book), a generic error message will be returned.

---

### 4. **Delete a Book**
- **URL**: `/api/books/:id`
- **Method**: `DELETE`
- **Response**:
  - **Status Code**: 200 OK
  - **Response Body**: 
    A success message indicating that the book has been deleted.

- **Description**:
  This endpoint deletes a book from the database. The `id` of the book to be deleted must be provided in the URL. Upon successful deletion, a confirmation message will be returned.

- **Error Responses**:
  - **404 Not Found**: If the book with the specified `id` does not exist, an error message will be returned indicating that the book was not found.
  - **500 Internal Server Error**: If there's an issue with the server (e.g., database connectivity or deleting the book), a generic error message will be returned.
