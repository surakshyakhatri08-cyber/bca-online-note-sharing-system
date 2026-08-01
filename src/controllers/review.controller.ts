import { Request, Response, NextFunction } from 'express';
import Review from '../models/review.model';
import AppError from '../utils/customError.utils';
import { catchAsync } from '../utils/catchAsync.utils';
import { sendResponse } from '../utils/sendResponse.utils';


export const createReview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { commentText } = req.body;

    if (!commentText) {
        throw new AppError('Comment is required', 400);
    }

    const review = new Review({
        commentText,
    });

    //save user
    await review.save();

    //success response
    sendResponse(res, {
        message: 'Review Created successfully',
        data: {
            _id: review.id,
            commentText: review.commentText,
        },
        statusCode: 201,
    });
});

export const getAllReview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const reviews = await Review.find({});

    sendResponse(res, {
        message: 'Reviews Fetched Successfully',
        data: reviews,
        statusCode: 200,
    });
});

export const getReviewById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const review = await Review.findById({ _id: id});

    if (!review) {
        throw new AppError(`Review with id: ${id} not found`, 404);
    }

    sendResponse(res, {
        message: 'Review Fetched Successfully',
        data: {
            _id: review.id,
            commentText: review.commentText,
        },
        statusCode: 200,
    });
});

export const updateReview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;
    const { commentText } = req.body; 

    const review = await Review.findByIdAndUpdate(
        { _id: id},
        { commentText },
        { new: true, runValidators: true }
    );

    if (!review) {
        throw new AppError(`Review with id: ${id} not found`, 404);
    }

    sendResponse(res, {
        message: 'Review Updated Successfully',
        data: {
            _id: review.id,
            commentText: review.commentText,
        },
        statusCode: 200,
    });
});

export const deleteReview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const review = await Review.findByIdAndDelete({ _id: id });

    if (!review) {
        throw new AppError(`Review with id: ${id} not found`, 404);
    }

    sendResponse(res, {
        message: 'Review Deleted Successfully',
        data: null,
        statusCode: 200,
    });
});