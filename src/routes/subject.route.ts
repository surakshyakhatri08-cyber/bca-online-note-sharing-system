import express, { Router } from 'express';
import { createSubject, deleteSubject, getAllSubject, getSubjectById, updateSubject } from '../controllers/subject.controller';

const router: Router = express.Router();

router.get('/', getAllSubject);
router.get('/:id', getSubjectById);
router.post('/', createSubject);
router.put('/:id', updateSubject);
router.delete('/:id', deleteSubject);

export default router;