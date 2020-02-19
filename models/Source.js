import mongoose from 'mongoose';

const { String } = mongoose.Schema.Types;

const SourceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: false
    }
});

export default mongoose.models.Source || mongoose.model("Source", SourceSchema);