import { Request, Response, NextFunction } from 'express';
import Notice from '../models/notice.model';
import AppError from '../utils/customError.utils';
import { catchAsync } from '../utils/catchAsync.utils';
import { sendResponse } from '../utils/sendResponse.utils';


export const createNotice = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { title, content } = req.body;

    if (!title) {
        throw new AppError('Title is required', 400);
    }

    if (!content) {
        throw new AppError('Content is required', 400);
    }

    const notice = new Notice({
        title,
        content,
    });

    //save user
    await notice.save();

    //success response
    sendResponse(res, {
        message: 'Notice Created successfully',
        data: {
            _id: notice._id,
            title: notice.title,
            content: notice.content,
        },
        statusCode: 201,
    });
});

export const getAllNotice = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const notices = await Notice.find({});

    sendResponse(res, {
        message: 'Notices Fetched Successfully',
        data: notices,
        statusCode: 200,
    });
});

export const getNoticeById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const notice = await Notice.findById({ _id: id});

    if (!notice) {
        throw new AppError(`Notice with id: ${id} not found`, 404);
    }

    sendResponse(res, {
        message: 'Notice Fetched Successfully',
        data: {
            _id: notice._id,
            title: notice.title,
            content: notice.content,
        },
        statusCode: 200,
    });
});

export const updateNotice = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;
    const { title, content } = req.body; 

    const notice = await Notice.findByIdAndUpdate(
        { _id: id},
        { title, content },
        { new: true, runValidators: true }
    );

    if (!notice) {
        throw new AppError(`Notice with id: ${id} not found`, 404);
    }

    sendResponse(res, {
        message: 'Notice Updated Successfully',
        data: {
            _id: notice._id,
            title: notice.title,
            content: notice.content,
        },
        statusCode: 200,
    });
});

export const deleteNotice = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const notice = await Notice.findByIdAndDelete({ _id: id });

    if (!notice) {
        throw new AppError(`Notice with id: ${id} not found`, 404);
    }

    sendResponse(res, {
        message: 'Notice Deleted Successfully',
        data: null,
        statusCode: 200,
    });
});