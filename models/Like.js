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

}, {
    timestamps: true
});

export default mongoose.models.Like || mongoose.model("Like", LikeSchema);