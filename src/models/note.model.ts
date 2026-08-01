import mongoose, { Document, Schema } from "mongoose";
import { Semester, NoteStatus } from '../@types/enum.types';

interface INote extends Document {
    title: String,
    description: String,
    semester: String,
    subject: String,
    fileName: String,
    // uploaded_by: String,
    status: String,
    // downloadCount: Number,
}

const noteSchema: Schema = new mongoose.Schema<INote>({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minLength: [3, 'Title must be at least 3 character'],
        trim: true,
    },

    description: {
        type: String,
        default: null,
    },

    subject: {
        type: String,
        required: [true, 'Subject is required'],
        minLength: [4, 'Duject must be at least 4 character'],
        trim: true,
    },

    semester: {
        type: String,
        enum: Object.values(Semester),
        required: [true, 'Semester is required'],
    },

    fileName: {
        type: String,
        required: [true, 'File is required'],
    },

    // uploaded_by: {

    // }

    status: {
        type: String,
        enum: Object.values(NoteStatus),
        default: NoteStatus.PENDING, 
    },

    // downloadCount: { 
    //     type: Number, 
    //     default: 0,
    //     min: [0, 'Downloads count cannot be negative']
    // }


}, { timestamps: true });

const Note = mongoose.model<INote>('note', noteSchema);

export default Note;