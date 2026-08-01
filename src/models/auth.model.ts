import mongoose, { Document, Schema } from 'mongoose';
import { Gender, Role, UserStatus } from '../@types/enum.types';
import { ImageSchema } from './image.model';


interface IAuth extends Document {
    name: string;
    email: string;
    password: string;
    role: Role;
    gender: Gender;
    status: UserStatus;
    profile?: {
        path: string;
        public_id: string;
    };
}

const authSchema: Schema = new Schema<IAuth>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'User already exists'],
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false,
    },

    gender: {
        type: String,
        enum: Object.values(Gender),
        required: [true, 'Gender is required'],
    },

    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.STUDENT,
    },

    status: {
        type: String,
        enum: Object.values(UserStatus),
        default: UserStatus.PENDING,
    },

    profile: {
        type: ImageSchema,
        default: null,
    },

}, {
    timestamps: true
},
);

const AuthUser = mongoose.model<IAuth>('auth_user', authSchema);
export default AuthUser;