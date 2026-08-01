import express, { Router } from 'express';
import { createNotice, deleteNotice, getAllNotice, getNoticeById, updateNotice } from '../controllers/notice.controller';

const router: Router = express.Router();

router.get('/', getAllNotice);
router.get('/:id', getNoticeById);
router.post('/', createNotice);
router.put('/:id', updateNotice);
router.delete('/:id', deleteNotice);

export default router;