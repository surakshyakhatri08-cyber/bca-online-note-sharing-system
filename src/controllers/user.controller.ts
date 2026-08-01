import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import { hashPassword } from '../utils/bcrypt.utils';
import AppError from '../utils/customError.utils';
import { catchAsync } from '../utils/catchAsync.utils';
import { sendResponse } from '../utils/sendResponse.utils';


export const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, role, profileImage } = req.body;

    if (!name) {
        throw new AppError('Name is required', 400);
    }

    if (!email) {
        throw new AppError('Email is required', 400);
    }

    if (!password) {
        throw new AppError('Password is required', 400);
    }

    const user = new User({
        name,
        email,
        password,
        role,
        profileImage,
    });

    //hash password
    const hash = await hashPassword(password);
    user.password = hash;

    //save user
    await user.save();

    //success response
    sendResponse(res, {
        message: 'User Created successfully',
        data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage,
        },
        statusCode: 201,
    });
});

export const getAllUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const users = await User.find({});

    sendResponse(res, {
        message: 'Users Fetched Successfully',
        data: users,
        statusCode: 200,
    });
});

export const getUserById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const user = await User.findById({ _id: id});

    if (!user) {
        throw new AppError(`User with id: ${id} not found`, 404);
    }

    sendResponse(res, {
        message: 'User Fetched Successfully',
        data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage,
        },
        statusCode: 200,
    });
});

export const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;
    const { name, email, role, profileImage } = req.body; 

    const user = await User.findByIdAndUpdate(
        { _id: id},
        { name, email, role, profileImage },
        { new: true, runValidators: true }
    );

    if (!user) {
        throw new AppError(`User with id: ${id} not found`, 404);
    }

    sendResponse(res, {
        message: 'User Updated Successfully',
        data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage,
        },
        statusCode: 200,
    });
});

export const deleteUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const user = await User.findByIdAndDelete({ _id: id });

    if (!user) {
        throw new AppError(`User with id: ${id} not found`, 404);
    }

    sendResponse(res, {
        message: 'User Deleted Successfully',
        data: null,
        statusCode: 200,
    });
});