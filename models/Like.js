import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const LikeSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "User"
    },
    entity: {
        type: Number
    },
    entitySectionId: {
        type: Number
    },
    entityCategories: {
        type: Array
    }
}, {
    timestamps: true
});

export default mongoose.models.Like || mongoose.model("Like", LikeSchema);