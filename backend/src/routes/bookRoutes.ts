import express from 'express';
import { addBook, getBooks, editBook, deleteBook } from '../controller/bookController';

const router = express.Router();

router.post('/', addBook);
router.get('/', getBooks);
router.put('/:id', editBook);
router.delete('/:id', deleteBook);

export default router;
