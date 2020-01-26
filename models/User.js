import mongoose from 'mongoose';

const { ObjectId, String, Date} = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    likes: [
        {
            entity: {
                type: ObjectId,
                ref: "Entity"
            },
            timestamp: {
                type: Date
            }
        }
    ]
}, {
    timestamps: true
});

export default mongoose.models.User || mongoose.model("User", UserSchema);