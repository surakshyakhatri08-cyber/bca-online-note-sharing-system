import mongoose, { Document, Schema } from "mongoose";
import { Role } from '../@types/enum.types';

interface IUser extends Document {
    name: String,
    email: String,
    password: String,
    role: Role,
    profileImage?: String,
    //UserStatus
}


const userSchema: Schema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: [true, 'User name is reuired'],
        minLength: 4,
        trim: true,
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email is already exists'],
        lowercase: true,
        trim: true,
    },

    password: {
        type: String,
        required: [true, 'Passward is required'],
        minLength: [5, 'Password must be at least 5 character'],
        select: false
    },

    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.STUDENT,
    },

    profileImage: {
        type: String,
        default: null
    },

    // isVerified: {

    // }
}, { 
    timestamps: true 
}) ;

const User = mongoose.model<IUser>('user', userSchema);

export default User;