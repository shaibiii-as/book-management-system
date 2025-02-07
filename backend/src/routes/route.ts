import express from 'express';
import bookRoutes from './bookRoutes';

const router = express.Router();
router.use('/books', bookRoutes); 

export default router;
