import { Request, Response, NextFunction } from 'express';
import Note from '../models/note.model';
import AppError from '../utils/customError.utils';
import { catchAsync } from '../utils/catchAsync.utils';
import { sendResponse } from '../utils/sendResponse.utils';


export const createNote = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, semester, subject, fileName, status } = req.body;

    if (!title) {
        throw new AppError('Title is required', 400);
    }

    if (!semester) {
        throw new AppError('Semester is required', 400);
    }

    if (!subject) {
        throw new AppError('Subject is required', 400);
    }

    if (!fileName) {
        throw new AppError('File is required', 400);
    }

    const note = new Note({
        title,
        description,
        semester,
        subject,
        fileName,
        status,
    });

    //save user
    await note.save();

    //success response
    sendResponse(res, {
        message: 'Note Created successfully',
        data: {
            _id: note._id,
            title: note.title,
            description: note.description,
            semester: note.semester,
            subject: note.subject,
            fileName: note.fileName,
            status: note.status,
        },
        statusCode: 201,
    });
});

export const getAllNote = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const notes = await Note.find({});

    sendResponse(res, {
        message: 'Notes Fetched Successfully',
        data: notes,
        statusCode: 200,
    });
});

export const getNoteById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const note = await Note.findById({ _id: id });

    if (!note) {
        throw new AppError(`Note with id: ${id} not found`, 404);
    }

    sendResponse(res, {
        message: 'Note Fetched Successfully',
        data: {
            _id: note._id,
            title: note.title,
            description: note.description,
            semester: note.semester,
            subject: note.subject,
            fileName: note.fileName,
            status: note.status,
        },
        statusCode: 200,
    });
});

export const updateNote = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;
    const { title, description, semester, subject, fileName, status } = req.body;

    const note = await Note.findByIdAndUpdate(
        { _id: id },
        { title, description, semester, subject, fileName, status },
        { new: true, runValidators: true }
    );

    if (!note) {
        throw new AppError(`Note with id: ${id} not found`, 404);
    }

    sendResponse(res, {
        message: 'Note Updated Successfully',
        data: {
            _id: note._id,
            title: note.title,
            description: note.description,
            semester: note.semester,
            subject: note.subject,
            fileName: note.fileName,
            status: note.status,
        },
        statusCode: 200,
    });
});

export const deleteNote = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const note = await Note.findByIdAndDelete({ _id: id });

    if (!note) {
        throw new AppError(`Note with id: ${id} not found`, 404);
    }

    sendResponse(res, {
        message: 'Note Deleted Successfully',
        data: null,
        statusCode: 200,
    });
});