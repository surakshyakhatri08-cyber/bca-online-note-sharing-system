import mongoose, { Document, Schema } from "mongoose";

interface INotice extends Document {
    title: String,
    content: String,
    // postedBy: ,
}

const noticeSchema: Schema = new mongoose.Schema<INotice> ({
    title: {
        type: String,
        required: [true, 'Notice title is required'],
        trim: true,
    },

    content: {
        type: String,
        required: [true, 'Notice content is required'],
        trim: true,
    },

    // postedBy: {

    // }

},
{ timestamps: true });

const Notice = mongoose.model<INotice> ('notices', noticeSchema);

export default Notice;