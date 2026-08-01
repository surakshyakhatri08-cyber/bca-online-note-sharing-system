import mongoose, { Document, Schema } from "mongoose";

interface IReview extends Document {
    // NoteId: ,
    // UserId: ,
    commentText: String,
}

const reviewSchema: Schema = new mongoose.Schema<IReview> ({
    // NoteId: {

    // },

    // UserId: {

    // },

    commentText: {
        type: String,
        required: [true, 'Comment is required'],
        minLength: [10, 'Comment must be at least 10 character'],
        trim: true,
    },
}, {
    timestamps: true
});

const review = mongoose.model<IReview> ('review', reviewSchema);

export default review;