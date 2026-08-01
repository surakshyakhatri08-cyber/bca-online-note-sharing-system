import mongoose, { Document, Schema } from "mongoose";
import { Semester } from "../@types/enum.types";

interface ISubject extends Document {
    subjectName: String,
    subjectCode?: String,
    semester: String,
}

const subjectSchema: Schema = new mongoose.Schema<ISubject> ({
    subjectName: {
        type: String,
        required: [true, 'Subject Name is required'],
        unique: [true, 'Subject Name is already exists'],
        trim: true,
    },

    subjectCode: {
        type: String,
        trim: true,
        default: null,
    },

    semester: {
        type: String,
        enum: Object.values(Semester),
        required: [true, 'Semester is required']
    },
}, { timestamps: true });

const Subject = mongoose.model<ISubject>('subjects', subjectSchema);

export default Subject;