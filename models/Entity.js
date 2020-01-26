import mongoose from 'mongoose';

const { ObjectId, String, Date } =  mongoose.Schema.Types;

const EntitySchema = new.mongoose.Schema({
    craftId: {
        type: Number,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        enum: ['newsletter', 'blog', 'podcast']
    },
    likes: [
        {
            user: {
                type: ObjectId,
                ref: "User"
            },
            timestamp: {
                type: Date
            }
        }
    ]
});

export default mongoose.models.Entity || mongoose.model("Entity", EntitySchema);