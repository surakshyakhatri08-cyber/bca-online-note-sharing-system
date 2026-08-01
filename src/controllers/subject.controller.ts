import { Request, Response, NextFunction } from 'express';
import Subject from '../models/subject.model';
import AppError from '../utils/customError.utils';
import { catchAsync } from '../utils/catchAsync.utils';
import { sendResponse } from '../utils/sendResponse.utils';


export const createSubject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { subjectName, subjectCode, semester } = req.body;

    if (!subjectName) {
        throw new AppError('Subject name is required', 400);
    }

    if (!semester) {
        throw new AppError('Semester is required', 400);
    }

    const subject = new Subject({
        subjectName,
        subjectCode,
        semester,
    });

    //save user
    await subject.save();

    //success response
    sendResponse(res, {
        message: 'SUbject Created successfully',
        data: {
            _id: subject._id,
            subjectName: subject.subjectName,
            subjectCode: subject.subjectCode,
            semester: subject.semester,
        },
        statusCode: 201,
    });
});

export const getAllSubject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const subjects = await Subject.find({});

    sendResponse(res, {
        message: 'Subjects Fetched Successfully',
        data: subjects,
        statusCode: 200,
    });
});

export const getSubjectById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const subject = await Subject.findById({ _id: id });

    if (!subject) {
        throw new AppError(`Subject with id: ${id} not found`, 404);
    }

    sendResponse(res, {
        message: 'Subject Fetched Successfully',
        data: {
            _id: subject._id,
            subjectName: subject.subjectName,
            subjectCode: subject.subjectCode,
            semester: subject.semester,
        },
        statusCode: 200,
    });
});

export const updateSubject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;
    const { subjectName, subjectCode, semester } = req.body;

    const subject = await Subject.findByIdAndUpdate(
        { _id: id },
        { subjectName, subjectCode, semester },
        { new: true, runValidators: true }
    );

    if (!subject) {
        throw new AppError(`Subject with id: ${id} not found`, 404);
    }

    sendResponse(res, {
        message: 'Subject Updated Successfully',
        data: {
            _id: subject._id,
            subjectName: subject.subjectName,
            subjectCode: subject.subjectCode,
            semester: subject.semester,
        },
        statusCode: 200,
    });
});

export const deleteSubject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const subject = await Subject.findByIdAndDelete({ _id: id });

    if (!subject) {
        throw new AppError(`Subject with id: ${id} not found`, 404);
    }

    sendResponse(res, {
        message: 'Subject Deleted Successfully',
        data: null,
        statusCode: 200,
    });
});