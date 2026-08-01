import express, { Router } from 'express';
import { 
    createNote, 
    deleteNote, 
    getAllNote, 
    getNoteById, 
    updateNote 
} from '../controllers/note.controller';

const router: Router = express.Router();

router.get('/', getAllNote);
router.get('/:id', getNoteById);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;