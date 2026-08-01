import express, { Router } from 'express';
import { createReview, deleteReview, getAllReview, getReviewById, updateReview } from '../controllers/review.controller';

const router: Router = express.Router();

router.get('/', getAllReview);
router.get('/:id', getReviewById);
router.post('/', createReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

export default router;